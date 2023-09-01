

const router = require("express").Router();
const { getAllUsers, getOneUser, createUser, deleteUser, updateUser } = require("../Controllers/user.controller");


router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
router.post("/", createUser);

module.exports = router;