import { Router } from "express";
import { checkIn, changeDayScheduleType, undoChekIn } from '../controllers/dayReportController';
const router = Router();

router.post("/checkIn", checkIn);
router.post("/changeDayScheduleType/:empId", changeDayScheduleType);
router.delete("/undoChekIn/:empId", undoChekIn);

export default router;