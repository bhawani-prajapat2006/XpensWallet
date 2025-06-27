import ratelimit from "../config/upstash.js";

const rateLimiter = async(req, res, next) => {

    try {
        // in real world application this key should be like ip address or user_id something like that
        const {success} = await ratelimit.limit("my-rate-limit")

        if(!success){
            return res.status(429).json({
                message: "Too many request, Please try again later.",
                success: false
            })
        }

        next()
        
    } catch (err) {
        console.log("Rate limit error", err)
        next(err)
        
    }   
}

export default rateLimiter