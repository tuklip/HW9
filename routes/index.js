const express = require('express')
const router = express.Router()
const movieRouter = require("./movie.js")
const pool = require("../config.js");
const jwt = require("jsonwebtoken");
const secretKey = "rahasia"
const {authentication} = require("../middle/auth.js");

router.post("/login", (req, res, next) => {
    const {email, password} = req.body;

    const findUser = `
        SELECT
        *
        FROM users
        WHERE email = $1
    `

    pool.query(findUser, [email], (err, result) => {
        if(err) next(err)

        if (result.rows.length === 0) {
            next({name: "not found"})
        } else {
            const data = result.rows[0]
            const accessToken = jwt.sign(
                {
                    email: data.email,
                },secretKey);
                
                res.status(200).json({
                    email: data.email,
                    role: data.role,
                    accessToken: accessToken,
                })
        }
    })
})

router.post("/register", (req, res, next) => {
    const {email, gender, password, role} = req.body;

    const insertUser = `
        INSERT INTO users (email, gender, password, role)
            VALUES
            ($1, $2, $3, $4);
    `

    pool.query(insertUser, [email, gender, password, role], (err, result) => {
        if(err) next(err)

        res.status(200).json({
            message: "Regis berhasil"
        });
    })
})

router.use(authentication)
router.use("/", movieRouter)

module.exports = router;