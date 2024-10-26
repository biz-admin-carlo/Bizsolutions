import { jwtDecode } from 'jwt-decode'; // Updated to named import
import { APP_CONFIG } from './config.js';
import { StorageUtil, StorageKeys } from './storage.js';

class AuthService {
    static validateVersion() {
        const storedLocalVersion = StorageUtil.getItem(StorageKeys.APP_VERSION);
        const storedSessionVersion = StorageUtil.getSessionItem(StorageKeys.APP_VERSION);
        
        if (storedLocalVersion !== APP_CONFIG.VERSION || 
            storedSessionVersion !== APP_CONFIG.VERSION) {
            StorageUtil.clearAll();
            StorageUtil.setItem(StorageKeys.APP_VERSION, APP_CONFIG.VERSION);
            StorageUtil.setSessionItem(StorageKeys.APP_VERSION, APP_CONFIG.VERSION);
            return false;
        }
        return true;
    }

    static validateSession() {
        const loginTime = StorageUtil.getItem(StorageKeys.LOGIN_TIME);
        
        if (!loginTime) return false;
        
        const timeDifference = (new Date() - new Date(loginTime)) / 1000 / 60;
        if (timeDifference > APP_CONFIG.SESSION_TIMEOUT_MINUTES) {
            StorageUtil.clearAll();
            return false;
        }
        return true;
    }

    static validateToken() {
        const token = StorageUtil.getItem(StorageKeys.TOKEN);
        if (!token) return false;

        try {
            const decodedToken = jwtDecode(token);
            const isExpired = decodedToken.exp * 1000 < Date.now();
            
            if (isExpired) {
                StorageUtil.clearAll();
                return false;
            }
            return true;
        } catch (error) {
            console.error("Invalid token:", error);
            StorageUtil.clearAll();
            return false;
        }
    }

    static checkUserAuthentication() {
        return this.validateVersion() && 
               this.validateSession() && 
               this.validateToken();
    }
}

export default AuthService;
