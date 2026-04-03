import jwt from 'jsonwebtoken'

export const verifyUserToken = (req,res,next)=>{
    jwt.verify(req.headers.token, process.env.JWT_SECRET, (error, decoded)=>{
        if(error) return res.json({message : "invalid token"})
            req.decoded = decoded
            next()
    })
}