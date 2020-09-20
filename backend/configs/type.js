const checkType = {
    studentType: function (req, res, next) {
        try {
            if (req.headers.type === "Students") {
                next();
            }
        } catch (error) {
            res.status(400).send(error);
        }

    },
    staffType: function (req, res, next) {
        try {
            if (req.headers.type.type === "Staff") {
                next();
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = checkType