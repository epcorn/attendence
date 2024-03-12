
import { WorkdayStatus, StaffTimelog, createOrUpdateWorkdayStatus, addCheckInToWorkdayStatus } from '../models/dayReportModel.js';

const checkIn = async (req, res, next) => {
    try {
        const { empId } = req.params;
        const WorkdayStatus = await createOrUpdateWorkdayStatus();
        const hasCheckedIn = await WorkdayStatus.hasStaffTimelogForEmployee(empId);
        if (hasCheckedIn) {
            return res.status(200).json({ "message": "User alredy checked In" });
        }
        const StaffTimelogData = await StaffTimelog.create({ employeeId: empId });
        addStaffTimelogToWorkdayStatus(StaffTimelogData);

        res.status(200).json({ "message": `user checke in`, StaffTimelogData });

    } catch (error) {
        next(error);
    }
};
const changeDayScheduleType = async (req, res, next) => {
    try {
        const { empId } = req.params;
        const WorkdayStatus = await createOrUpdateWorkdayStatus();
        const employee = await WorkdayStatus.toogleDayScheduleType(empId);

        res.status(200).json({ employee });
    } catch (error) {
        next(error);
    }

};
const undoChekIn = async (req, res, next) => {
    try {
        const { empId } = req.params;
        const WorkdayStatus = await createOrUpdateWorkdayStatus();
        const result = await WorkdayStatus.undoChekIn(empId);

        res.status(200).json({ "message": "marked unpresent!" });
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

export { checkIn, changeDayScheduleType, undoChekIn, markLate };