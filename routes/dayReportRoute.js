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
  ifOprator,
  changeDayScheduleType
);
router.post("/markLate/:empId", verifyToken, ifOprator, markLate);

export default router;
