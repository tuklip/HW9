function errorhandler(err, req, res, next) {

    if(err.name === "Error not found") {
        res.status(404).json({
            message: "Error not found"
        })
    } else {
        res.status(500).json({
            message: "Internal server error"
        })
    }
    
}


module.exports = errorhandler;