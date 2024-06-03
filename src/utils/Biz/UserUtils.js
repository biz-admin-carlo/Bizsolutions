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
        console.error('Error checking email:', error);
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
        console.error('There was an error during registration:', error);
        return { success: false, message: "Registration failed due to an error" };
    }
}

export async function uploadUserAvatar(file) {
    const apiUrl = 'http://localhost:8001/api/v1/users/image-upload';

    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData);
    console.log(file);
    console.log(file.name);

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            body: formData, // FormData implicitly sets 'Content-Type' to 'multipart/form-data'
        });

        const text = await response.text(); // Read response text first
        let data;
        try {
            data = JSON.parse(text); // Try parsing it as JSON
        } catch (error) {
            console.error('Error parsing response as JSON:', error);
            if (!response.ok) {
                throw new Error(`Failed to upload image. Status: ${response.status}, Body: ${text}`);
            }
        }

        if (!response.ok) {
            // Handle any additional errors included in a properly formatted JSON response
            throw new Error(`Failed to upload image. Status: ${response.status}, Error: ${data?.message || text}`);
        }

        console.log('Upload successful:', data);
        const uploadedUrl = data.imageUrl; // Adjust according to what your server responds with
        return { success: true, imageUrl: uploadedUrl };
        
    } catch (error) {
        console.error('Error during file upload:', error);
        throw error; // Rethrow the error for further handling, if necessary
    }
}



