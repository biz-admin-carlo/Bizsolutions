import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export async function checkEmailAvailability(email) {
    try {
        const url = `${apiUrl}/api/v1/users/check-email/${email}`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.data.exists === true){
            return true
        } else {
            return false
        }
    } catch (error) {
        return false;
    }
}

export async function registerUser(userData) {
    try {
        const { firstName, lastName, email, birthday, password, referredBy } = userData;
        const registerResponse = await axios.post(`${apiUrl}/api/v1/users/register`, {
            firstName,
            lastName,
            email,
            birthday,
            password,
            referredBy
        });
        return { success: true, data: registerResponse.data };
    } catch (error) {
        return { success: false, message: "Registration failed due to an error" };
    }
}

export async function searchFeature(data) {
    try {
        const url = `${apiUrl}/api/v1/users/search-user/`;

        const response = await axios.get(url, {
            inputField: data
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.message === "User details retrieved successfully!") {
            return {
                success: true,
                userDetails: response.data.userDetails
            };
        } else {
            return { success: false };
        }
    } catch (error) {
        return { success: false };
    }
}

export async function returnFullName (userId) {

    try {
        const url = `${apiUrl}/api/v1/users/retrieve/${userId}`;
        const token = localStorage.getItem('token');

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return {
                success: true,
                fullName: response.data.fullName
            };
        } else {
            return { success: false };
        }
    } catch (error) {
        return { success: false };
    }
}

export async function addPaymentLog(bizID, paymentLogs) {
    const formData = new FormData();
    
    formData.append('bizID', bizID);

    paymentLogs.forEach((log, index) => {
        formData.append(`paymentLog[${index}][userID]`, log.userID);
        formData.append(`paymentLog[${index}][status]`, log.status);
        formData.append(`paymentLog[${index}][timestamp]`, log.timestamp);
    });

    try {
        const url = `${apiUrl}/api/v1/users/add-payment-logs`;
        const token = localStorage.getItem('token'); 

        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            }
        });

        // Handle successful response
        return response.data;
    } catch (error) {
        // Handle error
        // console.error('Error adding payment log:', error);
        throw error;
    }
}