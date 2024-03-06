import api from "../services/api";

export default async function refreshTokenHelper(access, refresh, signUp) {
    try {
        const response = await api.verifyToken({ token: access });
        return access;
    } catch (verificationError) {
        try {
            const response = await api.refreshToken({ refresh: refresh });
            const auth = {
                access: response.data.access,
                refresh: refresh
            };
            signUp(auth);
            return auth.access;
        } catch (refreshError) {
            console.log("Refresh error");
            return false;
        }
    }
}

