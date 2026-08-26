const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");
const {
  validateUpdateProfile,
  validateUpdateAvatar,
  validateUserId,
} = require("../middlewares/validation");

router.use(auth);

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:userId", validateUserId, getUserById);
router.patch("/me", validateUpdateProfile, updateProfile);
router.patch("/me/avatar", validateUpdateAvatar, updateAvatar);

module.exports = router;
