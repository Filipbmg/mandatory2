import { Router } from 'express';

const router = Router();

router.get('/verifySession', (req, res) => {
    if (req.session.user) {
        res.send({ user: req.session.user });
        console.log(`User ${req.session.user.id}: session verified`);
    } else {
        res.status(404).send({ message: "No active user session" });
        console.log("No active user session");
    }
});

export default router;
