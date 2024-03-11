import mongoose from 'mongoose';

const checkInSchema = mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    checkeInTime: {
        type: Date,
        default: Date.now,
    },
    day_schedule_type: {
        type: String,
        enum: ["full", "half"],
        default: "full"
    },
    isLate: {
        type: Boolean,
        default: false,
    }
});

const dayReportSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        unique: true,
    },
    checkIns: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'CheckIn',
    }
});


dayReportSchema.methods.hasCheckInForEmployee = async function (empId) {
    // Fetch the CheckIn documents referenced by the ObjectId values in the checkIns array
    const checkIns = await this.model('CheckIn').find({ _id: { $in: this.checkIns } });
    // Check if any of the fetched CheckIn documents match the provided empId
    return checkIns.some(checkIn => checkIn.empId.equals(empId));
};
dayReportSchema.methods.getEmployeeData = async function (empId) {

    const checkIns = await this.model('CheckIn').find({ _id: { $in: this.checkIns } });

    return checkIns.find(checkIn => checkIn.empId.equals(empId));
};

dayReportSchema.methods.updateEmployeeData = async function (empId) {
    const checkIns = await this.model('CheckIn').find({ _id: { $in: this.checkIns } });

    const checkInToUpdate = checkIns.find(checkIn => checkIn.empId.equals(empId));

    if (checkInToUpdate) {
        checkInToUpdate.day_schedule_type = checkInToUpdate.day_schedule_type === "full" ? "half" : "full";
        await checkInToUpdate.save();
        return checkInToUpdate; // Return the updated CheckIn document
    } else {
        throw new Error('CheckIn document not found for the provided empId');
    }
};


const createOrUpdateDayReport = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let dayReport = await DayReport.findOne({ date: today });

    if (!dayReport) {
        dayReport = new DayReport({ date: today });
    }

    return dayReport;
};

const addCheckInToDayReport = async (checkInData) => {
    const dayReport = await createOrUpdateDayReport();
    dayReport.checkIns.push(checkInData._id);
    await dayReport.save();
};
const DayReport = mongoose.model('DayReport', dayReportSchema);
const CheckIn = mongoose.model('CheckIn', checkInSchema);

export { DayReport, CheckIn, createOrUpdateDayReport, addCheckInToDayReport };