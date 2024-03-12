import mongoose from 'mongoose';

const checkInSchema = mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    checkInTime: {
        type: Date,
        default: Date.now,
    },
    dayScheduleType: {
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

// Method to check if a check-in exists for a specific employee in a day report
dayReportSchema.methods.hasCheckInForEmployee = async function (employeeId) {
    const checkIns = await this.model('CheckIn').find({ _id: { $in: this.checkIns } });
    return checkIns.some(checkIn => checkIn.employeeId.equals(employeeId));
};

// Method to get check-in data for a specific employee in a day report
dayReportSchema.methods.getEmployeeCheckInData = async function (employeeId) {
    const checkIns = await this.model('CheckIn').find({ _id: { $in: this.checkIns } });
    return checkIns.find(checkIn => checkIn.employeeId.equals(employeeId));
};

// Method to update check-in data for a specific employee in a day report
dayReportSchema.methods.toogleDayScheduleType = async function (employeeId) {
    const checkIns = await this.model('CheckIn').find({ _id: { $in: this.checkIns } });
    const checkInToUpdate = await checkIns.find(checkIn => checkIn.employeeId.equals(employeeId));

    if (checkInToUpdate) {
        checkInToUpdate.dayScheduleType = checkInToUpdate.dayScheduleType === "full" ? "half" : "full";
        await checkInToUpdate.save();
        return checkInToUpdate;
    } else {
        throw new Error('Check-in document not found for the provided employeeId');
    }
};

dayReportSchema.methods.undoCheckIn = async function (employeeId) {
    const checkIns = await this.model('CheckIn').find({ _id: { $in: this.checkIns } });
    const checkInToUpdate = checkIns.find(checkIn => checkIn.employeeId.equals(employeeId));

    if (checkInToUpdate) {
        // Remove the checkInToUpdate document from the "CheckIn" collection
        const removedCheckIn = await this.model('CheckIn').findByIdAndDelete(checkInToUpdate._id);

        if (!removedCheckIn) {
            throw new Error('Failed to remove the check-in document from the collection.');
        }

        // Remove the checkInToUpdate document ID from the checkIns array in the dayReport document
        this.checkIns.pull(checkInToUpdate._id);
        await this.save();

        return removedCheckIn;
    } else {
        throw new Error('Check-in document not found for the provided employeeId');
    }
};

dayReportSchema.methods.toggleLate = async function (employeeId) {
    const checkIns = await this.model('CheckIn').find({ _id: { $in: this.checkIns } });
    const checkInToUpdate = await checkIns.find(checkIn => checkIn.employeeId.equals(employeeId));

    if (checkInToUpdate) {
        checkInToUpdate.isLate = checkInToUpdate.isLate === true ? false : true;
        await checkInToUpdate.save();
        return checkInToUpdate;
    } else {
        throw new Error('Check-in document not found for the provided employeeId');
    }
};


// Function to create or update a day report for the current date
const createOrUpdateDayReport = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let dayReport = await DayReport.findOne({ date: today });

    if (!dayReport) {
        dayReport = new DayReport({ date: today });
    }

    return dayReport;
};

// Function to add a check-in to a day report
const addCheckInToDayReport = async (checkInData) => {
    const dayReport = await createOrUpdateDayReport();
    dayReport.checkIns.push(checkInData._id);
    await dayReport.save();
};
const DayReport = mongoose.model('DayReport', dayReportSchema);
const CheckIn = mongoose.model('CheckIn', checkInSchema);

export { DayReport, CheckIn, createOrUpdateDayReport, addCheckInToDayReport };
