import {prisma} from '../Database/db.js';
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcrypt';
const authController = {};
authController.register = async (req, res) => {
    try {
        const { name, email, password } = req.body; 
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,  
                password: hashedPassword,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }   
};

authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = generateToken(user);
        user.token = token;
        res.json({ message: 'Login successful', user });
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }   
};



export default authController;