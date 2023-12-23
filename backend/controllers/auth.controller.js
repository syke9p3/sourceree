import bcryptjs from 'bcryptjs'
import User from '../models/User.js'

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcryptjs.hash(password, 10);
        await User.create({
            username: username,
            password: hash,
            email: email
        });
        res.json("Registration successful");
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } })

        if (!user) res.json({ error: "User doesn't exist" })

        const matchPass = await bcryptjs.compare(password, user.password);
        if (!matchPass) res.json({ error: 'Wrong credentials'})

        res.json("Login successful");
    } catch (error) {
        res.status(500).json({ error: error });
    }
};