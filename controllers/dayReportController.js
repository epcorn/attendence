import {
  createOrUpdateWorkdayStatus,
  WorkdayStatus,
} from "../models/dayReportModel.js";
import { errorHandler } from '../utils/error.js';

const todaysStatus = async (req, res, next) => {
  try {
    let dateVal = new Date(req.body.date);
    dateVal.setHours(0, 0, 0, 0);
    if (!dateVal) {
      return res.status(404).json({ "message": "bad request" });
    }

    // Query for documents with date falling within the specified range
    const workdayStatus = await WorkdayStatus.find({ date: dateVal });
    res.status(200).json({ "message": "Todays day Status", workdayStatus });
  } catch (error) {
    next(error);
  }

};

const toogleCheckIn = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const workdayStatus = await createOrUpdateWorkdayStatus();
    const obj = workdayStatus.checkIns.find(checkIn => checkIn.employeeId.equals(empId));
    if (obj.isPresent) {
      const result = await workdayStatus.undoCheckIn(empId);
      return res.status(200).json({ "message": `user makred absent`, result });
    } else {
      const result = await workdayStatus.checkIn(empId);
      return res.status(200).json({ "message": `user marked present`, result });
    }
  } catch (error) {
    next(error);
  }
};

const changeDayScheduleType = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const workdayStatus = await createOrUpdateWorkdayStatus();
    const obj = workdayStatus.checkIns.find(checkIn => checkIn.employeeId.equals(empId));
    if (obj.isPresent) {
      const result = await workdayStatus.toggleScheduleType(empId);
      return res.status(200).json({ "message": "Sechedule changed!", result });
    } else {
      return res.status(400).json({ "message": "User not present" });
    }
    res.status(200).json({ employee });
  } catch (error) {
    next(error);
  }
};

const markLate = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const workdayStatus = await createOrUpdateWorkdayStatus();
    const obj = workdayStatus.checkIns.find(checkIn => checkIn.employeeId.equals(empId));
    if (obj.isPresent) {
      const result = await workdayStatus.toggleLate(empId);
      return res.status(200).json({ "message": "User marked late", result });
    } else {
      return res.status(400).json({ "message": "User not present" });
    }

  } catch (error) {
    next(error);
  }
};

export { toogleCheckIn, changeDayScheduleType, markLate, todaysStatus };
