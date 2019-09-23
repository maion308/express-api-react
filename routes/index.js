const { Router } = require('express');
const controllers = require('../controllers')
const router = Router();

router.get('/', (req, res) => res.send('This is root!'))

router.post('/users', controllers.createUser)
router.get('/users', controllers.getAllUsers)
router.get('/users/:id', controllers.getUserById)
router.put('/users/:id', controllers.updateUser)
router.delete('/users/:id', controllers.deleteUser)

router.post('/items', controllers.createItem)
router.get('/items/:id', controllers.getItemById)
router.put('/items/:id', controllers.updateItem)
router.delete('/items/:id', controllers.deleteItem)

module.exports = router;