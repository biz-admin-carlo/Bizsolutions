import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function toSnakeCase(str) {
    return str
        .replace(/[\s&-]+/g, '_')  
        .replace(/[^a-z0-9_]/gi, '') 
        .toLowerCase();
}

export async function uploadBizImage(image, userID, bizID, bizName) {
    const formData = new FormData();
    const snakeCaseBizName = toSnakeCase(bizName);
    formData.append('image', image);
    formData.append('userID', userID);
    formData.append('bizID', bizID);
    try {
        const response = await axios.post(`${apiUrl}/api/v1/biz/upload/biz-image?bizName=${snakeCaseBizName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
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
        return false;
    }
}

export async function checkUserBiz() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        };
        const url = `${apiUrl}/api/v1/users/retrieve/biz`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200 && response.data.count > 0) {
            return true;
        } else if (response.status === 404) {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function retrieveUserBiz() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
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
            return response.data.businesses;
        } else if (response.status === 404) {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function archiveBiz(bizID) {
    if (!bizID) {
        return {
            success: false,
            error: 'Business ID must be provided'
        };
    };
    const url = `${apiUrl}/api/v1/biz/${bizID}/archive`; 
    const token = localStorage.getItem('token');
    if (!token) {
        return {
            success: false,
            error: 'Authentication required'
        };
    };
    try {
        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return {
                success: true,
                message: response.data.message,
                bizID: bizID
            };
        } else {
            return {
                success: false,
                error: response.data.error || 'Unknown error occurred'
            };
        }
    } catch (error) {
        return {
            success: false,
            error: 'Error archiving business'
        };
    }
}

export const submitBizRegistration = async (formData) => {
    const url = `${apiUrl}/api/v1/biz/create-biz`;
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMyCreatedBiz = async () => {
    const url = `${apiUrl}/api/v1/biz/get/all/my/bizness`;
    const token = localStorage.getItem('token'); 

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; 
    } catch (error) {
        throw error; 
    }
};

export const getMyVendorManagerBizNess = async () => {
    const token = localStorage.getItem('token'); 
    const url = `${apiUrl}/api/v1/biz/retrieve/biz-ness`;
    try {
        const response = await axios.get(url,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; 
    } catch (error) {
        throw error; 
    }
}

export const getBizName = async (bizID) => {
    const url = `${apiUrl}/api/v1/biz/${bizID}`;
    try {
        const response = await axios.get(url, {
        });
        return response.data.alias; 
    } catch (error) {
        throw error; 
    }
}

export const getBizDetails = async (bizID) => {
    const url = `${apiUrl}/api/v1/biz/${bizID}`;
    try {
        const response = await axios.get(url, {
        });
        return response.data.data; 
    } catch (error) {
        throw error; 
    }
}