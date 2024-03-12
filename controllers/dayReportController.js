
import { DayReport, CheckIn, createOrUpdateDayReport, addCheckInToDayReport } from '../models/dayReportModel.js';

const checkIn = async (req, res, next) => {
    try {
        const { empId } = req.params;
        const dayReport = await createOrUpdateDayReport();
        const hasCheckedIn = await dayReport.hasCheckInForEmployee(empId);
        if (hasCheckedIn) {
            return res.status(200).json({ "message": "User alredy checked In" });
        }
        const checkInData = await CheckIn.create({ employeeId: empId });
        addCheckInToDayReport(checkInData);

        res.status(200).json({ "message": `user checke in`, checkInData });

    } catch (error) {
        next(error);
    }
};
const changeDayScheduleType = async (req, res, next) => {
    try {
        const { empId } = req.params;
        const dayReport = await createOrUpdateDayReport();
        const employee = await dayReport.toogleDayScheduleType(empId);

        res.status(200).json({ employee });
    } catch (error) {
        next(error);
    }

};
const undoChekIn = async (req, res, next) => {
    try {
        const { empId } = req.params;
        const dayReport = await createOrUpdateDayReport();
        const result = await dayReport.undoChekIn(empId);

        res.status(200).json({ "message": "marked unpresent!" });
    } catch (error) {
        next(error);
    }


};
const markLate = async (req, res, next) => {
    try {
        const { empId } = req.params;
        const dayReport = await createOrUpdateDayReport();
        const employee = await dayReport.toggleLate(empId);

        res.status(200).json({ employee });
    } catch (error) {
        next(error);
    }
};

export { checkIn, changeDayScheduleType, undoChekIn, markLate };