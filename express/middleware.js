const logger = (req , res, next) => {
    console.log(`request path: ${req.path}`)
    next(); 
};

module.exports = {
    logger
};
