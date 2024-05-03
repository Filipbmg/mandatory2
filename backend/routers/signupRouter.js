import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../database/connection.js';

const router = Router();

router.post('/signup', async (req, res) => {
    const { name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ error: 'Missing field(s)' });
    }
    else {
        try {
            const userQuery = await db.get('SELECT * FROM Users WHERE email = ?', [email]);
            if (userQuery) {
                return res.status(409).send({ error: 'Email is already in use' });
            }
            else {
                const hash = await bcrypt.hash(password, 12);
                const sqlQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
                const result = await db.run(sqlQuery, [name, email, hash]);
                res.send({ lastID: result.lastID });
                console.log("User created");
            }
        } catch (error) {
            console.error('Database error: ', error);
            res.status(500).send({ error: 'Database error' });
        }
    }
});

export default router;