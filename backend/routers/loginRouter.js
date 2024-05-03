import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../database/connection.js';
const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userQuery = await db.get('SELECT * FROM Users WHERE email = ?', [email]);
        if (!userQuery) {
            return res.status(404).send({ message: "User not found" });
        }

        const passwordCompare = await bcrypt.compare(password, userQuery.password);
        if (passwordCompare) {
            req.session.user = {
                id: userQuery.id,
                email: userQuery.email,
                name: userQuery.name,
            };
            res.send({ message: "Login success" });
            console.log("User " + userQuery.id + ": logged in");
        } else {
            res.status(401).send({ message: "Invalid credentials" });
            console.log("Invalid credentials");
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: "Error logging in" });
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ message: "Error logging out" });
        }
        res.clearCookie();
        res.send({ message: "Logout success" });
        console.log("Session destroyed");
    });
});

export default router;