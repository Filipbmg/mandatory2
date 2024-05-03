import { user } from "../stores/user.js";

export async function verifySession() {
    try {
        const response = await fetch("http://localhost:8080/verifySession", {
            credentials: "include",
        });
        if (response.ok) {
            const userData = await response.json();
            user.set(userData);
            return userData;
        }
        return null;
    } catch (error) {
        console.error('Error verifying session: ', error);
        return null;
    }
}

export default verifySession;