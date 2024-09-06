// const express = require('express');
// const router = express.Router();
// const { register, login} = require('../controller/usercontroller');

// router.post('/register', register);
// router.post('/login', login);
// router.get('/', ()=>"welcome to home")


// module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
