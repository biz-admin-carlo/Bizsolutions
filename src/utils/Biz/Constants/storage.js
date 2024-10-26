export const StorageKeys = {
    APP_VERSION: 'appVersion',
    LOGIN_TIME: 'loginTime',
    TOKEN: 'token'
};

export const StorageUtil = {
    clearAll: () => {
        localStorage.clear();
        sessionStorage.clear();
    },
    
    getItem: (key) => localStorage.getItem(key),
    setItem: (key, value) => localStorage.setItem(key, value),
    
    getSessionItem: (key) => sessionStorage.getItem(key),
    setSessionItem: (key, value) => sessionStorage.setItem(key, value)
};
