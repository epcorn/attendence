import mongoose from 'mongoose';

const staffTimelogSchema = mongoose.Schema({
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

const workdayStatusSchema = mongoose.Schema({
    attendanceDate: {
        type: Date,
        default: Date.now,
        unique: true,
    },
    attendanceRecords: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'CheckIn',
    }
});

// Method to check if a check-in exists for a specific employee in a day report
workdayStatusSchema.methods.hasCheckInForEmployee = async function (employeeId) {
    const attendanceRecords = await this.model('CheckIn').find({ _id: { $in: this.attendanceRecords } });
    return attendanceRecords.some(checkIn => checkIn.employeeId.equals(employeeId));
};

// Method to get check-in data for a specific employee in a day report
workdayStatusSchema.methods.getEmployeeCheckInData = async function (employeeId) {
    const attendanceRecords = await this.model('CheckIn').find({ _id: { $in: this.attendanceRecords } });
    return attendanceRecords.find(checkIn => checkIn.employeeId.equals(employeeId));
};

// Method to update check-in data for a specific employee in a day report
workdayStatusSchema.methods.toogleDayScheduleType = async function (employeeId) {
    const attendanceRecords = await this.model('CheckIn').find({ _id: { $in: this.attendanceRecords } });
    const checkInToUpdate = await attendanceRecords.find(checkIn => checkIn.employeeId.equals(employeeId));

    if (checkInToUpdate) {
        checkInToUpdate.dayScheduleType = checkInToUpdate.dayScheduleType === "full" ? "half" : "full";
        await checkInToUpdate.save();
        return checkInToUpdate;
    } else {
        throw new Error('Check-in document not found for the provided employeeId');
    }
};

workdayStatusSchema.methods.undoCheckIn = async function (employeeId) {
    const attendanceRecords = await this.model('CheckIn').find({ _id: { $in: this.attendanceRecords } });
    const checkInToUpdate = attendanceRecords.find(checkIn => checkIn.employeeId.equals(employeeId));

    if (checkInToUpdate) {
        // Remove the checkInToUpdate document from the "CheckIn" collection
        const removedCheckIn = await this.model('CheckIn').findByIdAndDelete(checkInToUpdate._id);

        if (!removedCheckIn) {
            throw new Error('Failed to remove the check-in document from the collection.');
        }

        // Remove the checkInToUpdate document ID from the attendanceRecords array in the WorkdayStatus document
        this.attendanceRecords.pull(checkInToUpdate._id);
        await this.save();

        return removedCheckIn;
    } else {
        throw new Error('Check-in document not found for the provided employeeId');
    }
};

workdayStatusSchema.methods.toggleLate = async function (employeeId) {
    const attendanceRecords = await this.model('CheckIn').find({ _id: { $in: this.attendanceRecords } });
    const checkInToUpdate = await attendanceRecords.find(checkIn => checkIn.employeeId.equals(employeeId));

    if (checkInToUpdate) {
        checkInToUpdate.isLate = checkInToUpdate.isLate === true ? false : true;
        await checkInToUpdate.save();
        return checkInToUpdate;
    } else {
        throw new Error('Check-in document not found for the provided employeeId');
    }
};


// Function to create or update a day report for the current date
const createOrUpdateWorkdayStatus = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let WorkdayStatus = await WorkdayStatus.findOne({ date: today });

    if (!WorkdayStatus) {
        WorkdayStatus = new WorkdayStatus({ date: today });
    }

    return WorkdayStatus;
};

// Function to add a check-in to a day report
const addCheckInToWorkdayStatus = async (checkInData) => {
    const WorkdayStatus = await createOrUpdateWorkdayStatus();
    WorkdayStatus.attendanceRecords.push(checkInData._id);
    await WorkdayStatus.save();
};
const WorkdayStatus = mongoose.model('WorkdayStatus', workdayStatusSchema);
const StaffTimelog = mongoose.model('CheckIn', staffTimelogSchema);

export { WorkdayStatus, StaffTimelog, createOrUpdateWorkdayStatus, addCheckInToWorkdayStatus };
