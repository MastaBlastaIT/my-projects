module.exports = function (req, res, next) {
    res.sendHttpError = function (error) {
        res.status(error.status);
        if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(error);
        } else {
            res.render('error', {title: "Error", brand: "ExpressJS", status: error.status, message: error.message});
        }
    };

    next();
};


