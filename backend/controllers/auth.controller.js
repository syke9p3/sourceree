import bcryptjs from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

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

        if (!user) return res.status(400).json({ error: "User doesn't exist" })

        const matchPass = await bcryptjs.compare(password, user.password);
        if (!matchPass) return res.status(400).json({ error: 'Wrong credentials' })

        const token = jwt.sign({ id: user.id }, 'secretkunyari')
        const { password: pass, ...userInfo } = user.dataValues


        return res
            .cookie('accessToken', token, { httpOnly: true })
            .status(200)
            .json({ message: 'Login successful', user: userInfo })
    } catch (error) {
        return res.status(500).json({ error: 'May mali sa server' });
    }
};
