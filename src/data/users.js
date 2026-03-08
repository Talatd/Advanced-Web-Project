// Mock user data - can be replaced with database + proper auth later
export const users = [
    {
        id: 1,
        email: "admin@smartstore.com",
        password: "admin123",  // In production, use hashed passwords
        name: "Admin User",
        role: "admin",
        avatar: null
    },
    {
        id: 2,
        email: "user@smartstore.com",
        password: "user123",
        name: "John Doe",
        role: "user",
        avatar: null
    },
    {
        id: 3,
        email: "demo@smartstore.com",
        password: "demo123",
        name: "Demo User",
        role: "user",
        avatar: null
    }
];

export function authenticateUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
}

export function getUserById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
}
