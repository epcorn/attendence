import {
  createOrUpdateWorkdayStatus,
  WorkdayStatus,
} from "../models/dayReportModel.js";

const todaysStatus = async (req, res, next) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Bad request: date is missing" });
    }

    const todayIs = new Date();
    todayIs.setUTCHours(0, 0, 0, 0);

    // Convert both dates to milliseconds since January 1, 1970
    const todayIsTimestamp = todayIs.getTime();
    const dateTimestamp = new Date(date).getTime();

    if (todayIsTimestamp < dateTimestamp) {
      return res
        .status(403)
        .json({ message: "The provided date is in the future", date });
    }

    if (todayIsTimestamp === dateTimestamp) {
      let workdayStatus = await WorkdayStatus.find({ date });
      if (workdayStatus.length === 0) {
        workdayStatus.push(await createOrUpdateWorkdayStatus());
      }
      return res.status(200).json({
        message: "Today's day Status",
        workdayStatus: workdayStatus[0],
        date,
      });
    }

    if (todayIsTimestamp > dateTimestamp) {
      const workdayStatus = await WorkdayStatus.find({ date });
      console.log(workdayStatus);
      if (workdayStatus.length <= 0) {
        return res
          .status(404)
          .json({ message: "We do not have that old Data", date });
      }
      return res
        .status(200)
        .json({ message: "Old Status", workdayStatus: workdayStatus[0], date });
    }
  } catch (error) {
    next(error);
  }
};

const toogleCheckIn = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const workdayStatus = await createOrUpdateWorkdayStatus();
    const obj = workdayStatus.checkIns.find((checkIn) =>
      checkIn.employeeId.equals(empId)
    );
    if (obj.isPresent) {
      const result = await workdayStatus.undoCheckIn(empId);
      return res.status(200).json({ message: `user makred absent`, result });
    } else {
      const result = await workdayStatus.checkIn(empId);
      return res.status(200).json({ message: `user marked present`, result });
    }
  } catch (error) {
    next(error);
  }
};

const changeDayScheduleType = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const { type } = req.body;
    console.log(req.body);
    const workdayStatus = await createOrUpdateWorkdayStatus();
    const obj = workdayStatus.checkIns.find((checkIn) =>
      checkIn.employeeId.equals(empId)
    );
    if (obj.isPresent) {
      const result = await workdayStatus.toggleScheduleType(empId, type);
      return res.status(200).json({ message: "Sechedule changed!", result });
    } else {
      return res.status(400).json({ message: "User not present" });
    }
  } catch (error) {
    next(error);
  }
};

const markLate = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const workdayStatus = await createOrUpdateWorkdayStatus();
    const obj = workdayStatus.checkIns.find((checkIn) =>
      checkIn.employeeId.equals(empId)
    );
    if (obj.isPresent) {
      const result = await workdayStatus.toggleLate(empId);
      return res.status(200).json({ message: "User marked late", result });
    } else {
      return res.status(200).json({ message: "User not present" });
    }
  } catch (error) {
    next(error);
  }
};

export { toogleCheckIn, changeDayScheduleType, markLate, todaysStatus };
