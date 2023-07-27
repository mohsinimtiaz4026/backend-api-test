const router = require("express").Router();
// controllers
const authController = require("../controllers/authController");
// middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const refreshTokenMiddleware = require("../middlewares/refreshTokenMiddleware");

router.post('/register',authController.userRegister);
router.post('/login',authController.userLogin);
router.get('/getAllUsers',authMiddleware,refreshTokenMiddleware,authController.getAllUser);
router.post('/profile',authController.userProfile);

module.exports = router;