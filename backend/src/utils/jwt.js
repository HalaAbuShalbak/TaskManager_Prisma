
import jwt from 'jsonwebtoken';
import 'dotenv/config';
export const generateToken = (user) => {
    const payload = {
        id: user.id,    
        email: user.email,
        role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}