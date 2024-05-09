const express = require("express");
const router = express.Router();

const { createUser, getNumRowUser, paginateUsers, getAllDetailUsers } = require("../controllers/userController");

router.post("/", createUser);
router.get("/total", getNumRowUser);
router.get("/paginate", paginateUsers);
router.get("/details", getAllDetailUsers);


module.exports = router;
