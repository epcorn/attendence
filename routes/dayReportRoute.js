import { Router } from "express";
import {
  toogleCheckIn,
  changeDayScheduleType,
  markLate,
  todaysStatus,
} from "../controllers/dayReportController.js";
import { ifOprator, verifyToken } from "../middleware/verifyUser.js";
const router = Router();

router.get("/status", verifyToken, ifOprator, todaysStatus);
router.post("/checkIn/:empId", verifyToken, ifOprator, toogleCheckIn);
router.post(
  "/changeDayScheduleType/:empId",
  verifyToken,
  ifOprator,
  changeDayScheduleType
);
router.post("/markLate/:empId", verifyToken, ifOprator, markLate);

export default router;
