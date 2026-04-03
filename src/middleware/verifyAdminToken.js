import jwt from 'jsonwebtoken'

export const verifyAdminToken = (req,res,next)=>{
    jwt.verify(req.headers.token, process.env.JWT_SECRET, (error, decoded)=>{
        if(error) return res.status(401).json({message : "invalid token"})
        req.decoded = decoded
        if(req.decoded.isAdmin == false) return res.json({message: "unauthorized access"})
        next()
    })
}