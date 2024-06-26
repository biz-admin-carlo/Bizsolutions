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