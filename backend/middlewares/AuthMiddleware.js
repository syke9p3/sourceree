import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken

    if (!accessToken) return res.status(401).json({ error: 'Unauthorized access'})
    
    jwt.verify(accessToken, 'secretkunyari', (err, user) => {
        console.log(user)
        if(err) return res.status(403).json({ error: 'Forbidden'})
        req.user = user
        next()
    })
} 
