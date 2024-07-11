export async function getUserByUserAndPassword(username, password) {
    try {
        const response = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                return data[0]; // Gibt das erste gefundene Benutzerobjekt zurück
            } else {
                throw new Error('User not found');
            }
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export async function getUserById(id) {
    try {
        const response = await fetch(`http://localhost:3001/users?userId=${id}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                return data[0]; // Gibt das erste gefundene Benutzerobjekt zurück
            } else {
                throw new Error('User not found');
            }
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}