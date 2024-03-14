import {
  WorkdayStatus,
  CheckIn,
  createOrUpdateWorkdayStatus,
  addCheckInToWorkdayStatus,
} from "../models/dayReportModel.js";

const toogleCheckIn = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const workdayStatus = await createOrUpdateWorkdayStatus();
    const hasCheckedIn = await workdayStatus.hasCheckInForEmployee(empId);
    if (hasCheckedIn) {
      const result = await workdayStatus.undoCheckIn(empId);
      return res.status(200).json({ message: "User marked absent" });
    }
    const StaffTimelogData = await CheckIn.create({ employeeId: empId });
    await addCheckInToWorkdayStatus(StaffTimelogData);

    res.status(200).json({ message: `Attendence noted!`, StaffTimelogData });
  } catch (error) {
    next(error);
  }
};
const changeDayScheduleType = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const WorkdayStatus = await createOrUpdateWorkdayStatus();
    const employee = await WorkdayStatus.toggleScheduleType(empId);

    res.status(200).json({ employee });
  } catch (error) {
    next(error);
  }
};

const markLate = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const WorkdayStatus = await createOrUpdateWorkdayStatus();
    const employee = await WorkdayStatus.toggleLate(empId);

    res.status(200).json({ employee });
  } catch (error) {
    next(error);
  }
};

export { toogleCheckIn, changeDayScheduleType, markLate };
