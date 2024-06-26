import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

export async function getBizViaCoords(latitude, longtitude, term) {
    try {
        const result = await axios.get(`${apiUrl}/api/v1/location/search/v1?latitude=${latitude}&longitude=${longtitude}&term=${term}`);
        return { success: true, data: result };
    } catch (error) {
        try {
            const result = await axios.get(`${apiUrl}/api/v1/location/search/v2?state=California&category=${term}`);
            return { success: true, data: result };
        } catch (error) {
            return { success: false, message: "Registration failed due to an error" };
        }
    }
}

export async function getBizViaState(state, term) {
    try {
        const result = await axios.get(`${apiUrl}/api/v1/location/search/v2?state=${state}&category=${term}`);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: "Registration failed due to an error" };
    }
}

export async function loggedVisitors(longitude, latitude, state, category) {
    try {
      const requestData = {
        latitude: latitude || null,
        longitude: longitude || null,
        state: state || null,
        category: category || null
      };
  
      const result = await axios.post(`${apiUrl}/api/v1/client/create`, requestData);
  
      return { success: true, data: result.data };
  
    } catch (error) {  
        return { success: false, message: "Logging failed due to an error" };
    }
}

export const getUserCoordinates = (setUserCoordinates) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                setUserCoordinates(coords);
                sessionStorage.setItem('userCoordinates', JSON.stringify(coords));
            }
        );
    }
};

export function haversineDistance(coords1, coords2, isMiles = true) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    var lon1 = coords1[0];
    var lat1 = coords1[1];

    var lon2 = coords2[0];
    var lat2 = coords2[1];

    var R = 6371; // Earth's mean radius in kilometers
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    if(isMiles) d /= 1.60934; // Convert km to miles

    return d;
}
