import { Router } from "express";
import { checkIn, changeDayScheduleType, undoChekIn } from '../controllers/dayReportController.js';
import { ifOprator, verifyToken } from "../middleware/verifyUser.js";
const router = Router();

router.post("/checkIn/:empId", verifyToken, ifOprator, checkIn);
router.post("/changeDayScheduleType/:empId", verifyToken, ifOprator, changeDayScheduleType);
router.delete("/undoChekIn/:empId", verifyToken, ifOprator, undoChekIn);

export default router;