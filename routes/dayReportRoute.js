import { Router } from "express";
import { checkIn, changeDayScheduleType, undoChekIn, markLate } from '../controllers/dayReportController.js';
import { ifOprator, verifyToken } from "../middleware/verifyUser.js";
const router = Router();

router.post("/checkIn/:empId", verifyToken, ifOprator, checkIn);
router.post("/changeDayScheduleType/:empId", verifyToken, ifOprator, changeDayScheduleType);
router.post("/undoChekIn/:empId", verifyToken, ifOprator, undoChekIn);
router.post("/markLate/:empId", verifyToken, ifOprator, markLate);

export default router;