
import { DayReport, CheckIn, createOrUpdateDayReport, addCheckInToDayReport } from '../models/dayReportModel.js';

const checkIn = async (req, res, next) => {
    try {
        const { empId } = req.params;
        const dayReport = await createOrUpdateDayReport();
        const hasCheckedIn = await dayReport.hasCheckInForEmployee(empId);
        if (hasCheckedIn) {
            return res.status(200).json({ "message": "User alredy checked In" });
        }
        const checkInData = await CheckIn.create({ empId });
        addCheckInToDayReport(checkInData);

        res.status(200).json({ "message": `user checke in`, checkInData });

    } catch (error) {
        next(error);
    }
};
const changeDayScheduleType = async (req, res, next) => {
    const { empId } = req.params;
    const dayReport = await createOrUpdateDayReport();
    const employee = await dayReport.updateEmployeeData(empId);

    res.status(200).json({ employee });

};
const undoChekIn = async (req, res, next) => { };

export { checkIn, changeDayScheduleType, undoChekIn };