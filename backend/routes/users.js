const express = require('express');
const router = express.Router();


const {
   
    getById,
    createUser,
    updateUser,
    destroyUser,
    loginUser


} =require('./../controllers/users-controllers')

router.get('/:id',getById)
router.post('/add', createUser);
router.put('/:id', updateUser);
router.delete('/:id', destroyUser);
router.post('/', loginUser);

module.exports = router