const jwt = require("jsonwebtoken");
const secretKey = "rahasia"
const pool = require("../config.js");
function authentication(req, res, next){
    const {access_token} = req.headers;

    if(access_token){
        const decode = jwt.verify(access_token, secretKey);
        const {id, email, role} = decode
        const findUser = `
            SELECT
                *
            FROM users
            WHERE id = $1
        `

        pool.query(findUser, [id, email, role], (err, result) => {
            if(err) next(err)

            if(result.rows.length === 0){

            }else{
                const user = result.rows[0]
                req.loggedUser = {
                    email: user.email,
                    role: user.role
                }
                next();
            }
        })
    }else{

    }
}

function authorization(req, res, next){
    console.log(req.loggedUser);
    const {role, email} = req.loggedUser;

    if(role){
        next()
    } else {
        
    }
}

module.exports = {
    authentication,
    authorization
}