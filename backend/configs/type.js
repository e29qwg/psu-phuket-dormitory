const checkType = {
    studentType: function(req, res, next) {
        try {
            if (req.body.type === "Students") {
                next();
            }   
        } catch (error) {
            res.status(400).send(error);
        }
        
    },
    staffType: function(req, res, next) {
        try {
            if (req.body.type === "Staff") {
                next();
            }   
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = checkType