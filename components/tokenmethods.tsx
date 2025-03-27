import jwt from "jsonwebtoken";

const tokenVerifier = (token: string) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return null;
    }
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Invalid or expired token:", error);
        return null;
    }
};
const tokenDecoder = (token: string) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export { tokenDecoder, tokenVerifier };
