const express = require("express");
const {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  getEventDetails,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getEvents);
router.post("/", protect, createEvent);
router.delete("/:id", protect, deleteEvent);
router.put("/:id", protect, updateEvent);
router.get("/:id", protect, getEventDetails);

module.exports = router;

const upload = require("../middleware/uploadMiddleware");
router.post("/", protect, upload.single("image"), createEvent);