import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export async function addTransaction(token, bizId, contactEmail, type, packageAcquired, value, agentName) {
    try {
        const url = `${apiUrl}/api/v1/transaction/create`;

        const response = await axios.post(url, {
            bizId: bizId,
            contactEmail: contactEmail,
            status: type,
            packageAcquired: packageAcquired,
            value: value,
            agentName: agentName
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.data.httpCode === "201") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Failed to add transaction:", error);
        return false;
    }
}
