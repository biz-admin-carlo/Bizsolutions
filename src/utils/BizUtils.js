import axios from 'axios';


export async function checkBusinessName(name) {
    try {
        const encodedName = encodeURIComponent(name);
        const url = `https://bizsolutions-api-production.onrender.com/api/v1/biz/check/name/${encodedName}`;

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
        const url = `https://bizsolutions-api-production.onrender.com/api/v1/biz/check/alias/${encodedName}`;

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