import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export async function uploadBizImage(image, userID, bizID) {
    const formData = new FormData();
    formData.append('image', image); // Key matches the one expected by multer in the backend
    formData.append('userID', userID);
    formData.append('bizID', bizID);

    console.log(formData);

    try {
        const response = await axios.post(`${apiUrl}/api/v1/biz/upload/biz-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

export async function checkBusinessName(name) {
    try {
        const encodedName = encodeURIComponent(name);
        const url = `${apiUrl}/api/v1/biz/check/name/${encodedName}`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error checking business name:', error);
        return false;
    }
}

export async function checkBusinessAlias(name) {
    try {
        const encodedName = encodeURIComponent(name);
        const url = `${apiUrl}/api/v1/biz/check/alias/${encodedName}`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error checking business name:', error);
        return false;
    }
}

export async function checkUserBiz() {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log('No token found in session storage.');
            return false;
        }

        const url = `${apiUrl}/api/v1/users/retrieve/biz`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200 && response.data.count > 0) {
            console.log('Businesses found:', response.data.businesses);
            return true;
        } else if (response.status === 404) {
            console.log('No businesses found for this user.');
            return false;
        }
    } catch (error) {
        console.error('Error checking business:', error);
        return false;
    }
}

export async function retrieveUserBiz() {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log('No token found in session storage.');
            return false;
        }

        const url = `${apiUrl}/api/v1/users/retrieve/biz`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200 && response.data.count > 0) {
            console.log('Businesses found:', response.data.businesses);
            return response.data.businesses;
        } else if (response.status === 404) {
            console.log('No businesses found for this user.');
            return false;
        }
    } catch (error) {
        console.error('Error checking business:', error);
        return false;
    }
}

export async function retrieveTeamDetails() {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.log('No token found in session storage.');
            return false;
        }

        const url = `${apiUrl}/api/v1/teams/team-details/`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        if (response.status === 200 && response.data.numberOfTeams > 0) {
            console.log('Team found:', response.data.teams);
            return response.data.teams;
        } else if (response.status === 404) {
            console.log('No Teams found for this user.');
            return false;
        }
    } catch (error) {
        console.error('Error checking business:', error);
        return false;
    }
}

export async function checkTeamName(teamName) {
    try {
        if (!teamName) {
            console.log('Team name must be provided.');
            return false;
        };

        const url = `${apiUrl}/api/v1/teams/team-details/name-check?name=${encodeURIComponent(teamName)}`;
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.log('No token found in session storage.');
            return false;
        };

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        
        if (response.status === 200) {
            return response.data.isAvailable;
        }

        return false;

    } catch (error) {
        console.error('Error checking team name availability:', error);
        return false;
    }
}

export async function createTeam(teamName) {
    try {
        if (!teamName) {
            console.log('Team name must be provided.');
            return false;
        }

        const url = `${apiUrl}/api/v1/teams/create/`;
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.log('No token found in session storage.');
            return false;
        }

        const response = await axios.post(url, {
            name: teamName
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 201) {
            return {
                success: true,
                message: response.data.message,
                teamId: response.data.teamId
            };
        } else {
            return {
                success: false,
                error: response.data.error || 'Unknown error occurred'
            };
        }

    } catch (error) {
        console.error('Error creating team:', error);
        return {
            success: false,
            error: 'Error creating team'
        };
    }
}

export async function archiveTeam(teamId) {
    try {
        if (!teamId) {
            console.log('Team ID must be provided.');
            return false;
        }

        const url = `${apiUrl}/api/v1/teams/team-details/archive`;
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.log('No token found in session storage.');
            return false;
        }

        const response = await axios.put(url, {
            teamId: teamId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return {
                success: true,
                message: response.data.message,
                teamId: response.data.teamId
            };
        } else {
            return {
                success: false,
                error: response.data.error || 'Unknown error occurred'
            };
        }

    } catch (error) {
        console.error('Error creating team:', error);
        return {
            success: false,
            error: 'Error creating team'
        };
    }
}

export const assembleFormData = ({
    businessName,
    aliasName,
    imageUrl,
    websiteUrl,
    selectedCategory,
    transactionModes,
    latitude,
    longitude,
    addressLine1,
    addressLine2,
    addressLine3,
    selectedCity,
    selectedState,
    zipCode,
    selectedCountry,
    phoneNumber,
    displayPhoneNumber,
    emailAddress
}) => {
    return {
        alias: `${aliasName}-${selectedCity ? selectedCity.label : 'city'}-${selectedState ? selectedState.label : 'state'}-1`,
        name: businessName,
        image_url: imageUrl,
        is_closed: false,
        url: websiteUrl,
        review_count: 0,
        categories: selectedCategory ? [{ alias: selectedCategory.toLowerCase(), title: selectedCategory }] : [],
        rating: 4.5,
        email: emailAddress,
        coordinates: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        },
        transactions: Object.keys(transactionModes).filter(key => transactionModes[key]),
        location: {
            address1: addressLine1,
            address2: addressLine2,
            address3: addressLine3,
            city: selectedCity ? selectedCity.label : '',
            zip_code: zipCode,
            country: selectedCountry ? selectedCountry.label : '',
            state: selectedState ? selectedState.label : '',
            display_address: [
                addressLine1,
                addressLine2,
                addressLine3,
                `${selectedCity ? selectedCity.label : ''}, ${selectedState ? selectedState.label : ''} ${zipCode}`
            ]
        },
        phone: phoneNumber,
        display_phone: displayPhoneNumber
    };
};

export const submitBizRegistration = async (formData) => {

    const url = `${apiUrl}/api/v1/biz/create-biz`;
    const token = sessionStorage.getItem('token');
    console.log(token);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        console.log("Submission successful", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting business registration:", error.response ? error.response.data : "No response received");
        throw error;
    }
};

export const getMyCreatedBiz = async () => {
    const url = `${apiUrl}/api/v1/biz/get/all/my/bizness`;
    const token = sessionStorage.getItem('token'); 

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Retrieved businesses successfully:", response.data);
        return response.data; 
    } catch (error) {
        console.error("Error retrieving businesses:", error.response ? error.response.data : "No response received");
        throw error; 
    }
};