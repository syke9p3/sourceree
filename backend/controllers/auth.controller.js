import bcryptjs from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password, userId } = req.body;
        const hash = await bcryptjs.hash(password, 10);
        await User.create({
            username: username,
            password: hash,
            email: email,
            userId: userId,
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

        if (!user) return res.json({ error: "User doesn't exist" })

        const matchPass = await bcryptjs.compare(password, user.password);
        if (!matchPass) return res.json({ error: 'Wrong credentials' })

        const token = jwt.sign({ username: user.username, id: user.id }, 'secretkunyari')
        const { password: pass, ...userInfo } = user.dataValues

        return res
            .cookie('accessToken', token, { httpOnly: true })
            .status(200)
            .json(userInfo)
    } catch (error) {
        return res.status(500).json({ error: 'May mali sa server' });
    }
};

export const signOut = async (req, res, next) => {
    console.log('signing out...')
    try {
      console.log('clearing cookie')
      res.clearCookie('accessToken');
      res.status(200).json('User has been logged out');
    } catch (error) {
        return res.status(500).json({ error: 'May mali sa server' });
    }
  };