// const jwt = require('jsonwebtoken');
// const jwt_secret = "ExpenseTrackerSecretKey";

// const authMiddleware = (req, res, next) => {

//     let token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: 'Token Not Genrate...' });
//     }

//     if (token.startsWith('Bearer')) {
//         token = token.split(' ')[1];

//         try {
//             const varifyToken = jwt.verify(token, jwt_secret)
//             console.log(varifyToken)
//             next()
//         } catch (error) {
//             return res.status(500).json({ message: 'Token is not valid...' });
//         }

//     }
//     else {
//         return res.status(401).json({ message: 'Token Not Valid...' });
//     }

// }

// module.exports = { authMiddleware };

//token --> controller -->
const jwt = require("jsonwebtoken")
const secret = "secret"

const authMiddleware = (req,res,next)=>{

    var token = req.headers.authorization;

    if(token){
        
        if(token.startsWith("Bearer ")){

            token = token.split(" ")[1]
          
            try{

                const userFromToken = jwt.verify(token,secret)
                console.log(userFromToken)
                next()

            }catch(err){

                res.status(500).json({
                    message:"token is not valid...."
                })

            }

        }
        else{
            res.status(400).json({
                message:"token is not Bearer token"
            })
        }
        

        
    }
    else{
        res.status(400).json({
            message:"token is required.."
        })
    }
}

module.exports = {
    authMiddleware
}