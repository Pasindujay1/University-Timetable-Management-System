import express from "express";
import auth from "../middleware/auth.js";
import { register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";

const router = express.Router();

//register route
router.post("/register", register);

// login route
router.post("/login", login);

// router.get("/me", auth, async (req, res) => {
//   return res.status(200).json({ ...req.user._doc });
// });

export default router;
