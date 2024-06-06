import axios from 'axios';

export async function getBizViaCoords(longtitude, latitude, term) {
    try {
        const result = await axios.get(`http://localhost:8001/api/v1/location/search/v1?latitude=${latitude}&longitude=${longtitude}&term=${term}`);
        return { success: true, data: result };
    } catch (error) {
        console.error('There was an error during registration:', error);
        return { success: false, message: "Registration failed due to an error" };
    }
}

export async function getBizViaState(state, term) {
    try {
        const result = await axios.get(`http://localhost:8001/api/v1/location/search/v2?state=${state}&category=${term}`);
        return { success: true, data: result };
    } catch (error) {
        console.error('There was an error during registration:', error);
        return { success: false, message: "Registration failed due to an error" };
    }
}

export async function loggedVisitors(longitude, latitude, state, term) {
    try {
      const requestData = {
        latitude: latitude || null,
        longitude: longitude || null,
        state: state || null,
        category: term || null,
        ipAddress: null
      };
  
      const result = await axios.post(`http://localhost:8001/api/v1/client/create/client`, requestData);
  
      return { success: true, data: result.data };
    } catch (error) {
      console.error('There was an error during logging visitors:', error);
      return { success: false, message: "Logging failed due to an error" };
    }
}