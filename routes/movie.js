const express = require('express')
const router = express.Router()
const pool = require("../config.js")
const {authorization} = require("../middle/auth.js");
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

router.get("/movies", (req, res, next) => {
    console.log(req.loggedUser);
    console.log(req.query);
    const {limit, page} = req.query;

    let resultLimit = limit ? +limit : DEFAULT_LIMIT;
    let resultPage = page ? +page : DEFAULT_PAGE;


    const findQuery = `
    SELECT
        *
    FROM movies
    ORDER BY movies.id
    LIMIT ${resultLimit} OFFSET ${(resultPage - 1) = resultLimit}
    `

    pool.query(findQuery, (err, result) =>{
        if(err) next(err)

        res.status(200).json(result.rows);
    })
})

router.get("/movies/:id", (req, res, next) => {

    const {id} = req.params;

    const findOneQuery = `
        SELECT
            *
        FROM movies
            WHERE movies.id = $1
    `

    pool.query(findOneQuery,[id], (err, result) => {
        if(err) next (err)

        if(result.rows.length === 0){
            next({name: "Error not found"})
        } else {
            res.status(200).json(result.rows[0])
        }
    })
})

router.post("/movies", (req, res, next) => {
    const{title, genres, year} = req.body;
    const createMovie =`
        INSERT INTO movies (id, title, genres, year)
            VALUES
                ($1, $2, $3, $4)
            RETURNING *;
    `

    pool.query(createMovie, [id, title, genres, year], (err, result) => {
        if(err) next(err)

        res.status(201).json({
            message: "Movie created"
        })
    })
})

router.put("/movies/:id", (req, res, next) => {
    
    const {id} = req.params;
    const {title, genres, year} = req.body;

    const updateMovie = `
        UPDATE movies (title, genres, year, id)
        SET title = $1,
            genres = $2,
            year = $3
        WHERE movies.id = $4;
    `

    pool.query(updateMovie, [title, genres, year, id], (err, result) => {
        if(err) next(err)

        res.status(200).json({
            message: "update suskes"
        })
    })
})

router.delete("/movies/:id", (req, res, next) => {
    const {id}= req.params;

    const deleteMovie =`
        DELETE FROM movies
        WHERE movies.id = $1;
    `

    pool.query(deleteMovie, [id], (err, result) => {
        if(err) next(err)

        res.status(200).json({
            message: "Delete Sukses"
        })
    })
})

module.exports = router;