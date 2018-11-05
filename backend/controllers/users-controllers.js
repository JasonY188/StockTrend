const Users = require('../models/users')

const loginUser = (req, res) => {

    let { username, password } = req.body;

    Users.findOne({ username: username })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ success: false, error: err.message });
            } else if (user === null) {
                res.status(200).send({ success: false });
            } else if (users.length === 0){
                res.status(404).send({ success: false }); 
            }else if ((user.username == username) && (user.password == password)) {
                res.status(200).send({ success: true, user });
            } else {
                res.status(404).send({ success: false });   
            } 
        })
}


const getById = (req, res) => {
    Users.findById(req.params.id)
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: `There was an error with our database. `, error: err.message });
            } else if (!user) {
                res.status(404).send({ message: 'Could not find a user with that id' });
            } else {
                res.status(200).send(user);
            }
        });
}

const createUser = (req, res) => {
    let user = req.body;

    Users.create(user)
        .then((user) => {
            res.status(200).send({ user, message: 'User - Created' });
        })
        .catch((err) => {
            res.status(500).send({ Error: err.message })
        })

}

const updateUser = (req, res) => {
    Users.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, user) => {     
        if (err) {                                                                          
            res.status(500).send({ message: `There was an error with our database. `, error: err.message });
        } else if (!user) {
            res.status(404).send({ message: 'Could not find a user with that id' });
        } else {
            res.status(200).send({ user, message: 'User - Updated' });
        }
    })
}

const destroyUser = (req, res) => {
    Users.findByIdAndRemove(req.params.id, (err, user) => {            
        if (err) {
            res.status(500).send({ message: `There was an error with our database. `, error: err.message });
        } else if (!user) {
            res.status(404).send({ message: 'Could not find a user with that id' });
        } else {
            res.status(200).send({ deletedUser: user, message: 'User - Deleted' });
        }
    });
}

module.exports = { getById, createUser, updateUser, destroyUser, loginUser }