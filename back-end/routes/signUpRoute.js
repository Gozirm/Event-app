import express from "express";
import {
  createUser,
  forgotPassword,
  resetPassword,
  signin,
  verify,
} from "../controller/authControllers.js";
import { auth } from "../middleware/auth.js";
import restrict from "../middleware/restrict.js";
import {
  createEvent,
  deleteSavedEvents,
  getAllEvents,
  getSavedEvents,
  getSingleEvent,
  savedEvents,
} from "../controller/eventController.js";

const router = express.Router();

router.post("/sign-up", createUser);
router.post("/sign-in", signin);
router.get("/verify", auth, verify);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.post("/create-event", auth, createEvent);
router.get("/all-events", auth, getAllEvents);
router.get("/event/:_id", getSingleEvent);
router.post("/saved-events", auth, savedEvents);
router.get("/saved-events/:userId", auth, getSavedEvents);
router.delete("/delete-saved-events", deleteSavedEvents);

export default router;
