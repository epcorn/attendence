import { Router } from "express";
import {
  toogleCheckIn,
  changeDayScheduleType,
  markLate,
  todaysStatus,
} from "../controllers/dayReportController.js";
import { ifAdmin, ifOprator, verifyToken } from "../middleware/verifyUser.js";
const router = Router();

router.post("/status", todaysStatus);
router.post("/checkIn/:empId", verifyToken, toogleCheckIn);
router.post(
  "/changeDayScheduleType/:empId",
  verifyToken,
  changeDayScheduleType
);
router.post("/markLate/:empId", verifyToken, markLate);

export default router;
