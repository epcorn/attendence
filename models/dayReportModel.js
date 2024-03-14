import mongoose from "mongoose";
import Employee from "./employeeModel.js";

const workdayStatusSchema = mongoose.Schema({
  date: {
    type: Date,
    unique: true,
  },
  checkIns: {
    type: [{
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
      },
      checkInTime: {
        type: Date,
        default: null,
      },
      scheduleType: {
        type: String,
        enum: ["full", "half"],
        default: null,
      },
      isPresent: {
        type: Boolean,
        default: false,
      },
      isLate: {
        type: Boolean,
        default: false,
      },
    }],
  },
});

workdayStatusSchema.methods.hasCheckInForEmployee = function (employeeId) {
  return this.checkIns.some(checkIn => checkIn.employeeId.equals(employeeId));
};

workdayStatusSchema.methods.getEmployeeCheckInData = function (employeeId) {
  return this.checkIns.find(checkIn => checkIn.employeeId.equals(employeeId));
};

workdayStatusSchema.methods.toggleScheduleType = async function (employeeId) {
  const checkInToUpdate = this.checkIns.find(checkIn => checkIn.employeeId.equals(employeeId));

  if (checkInToUpdate) {
    checkInToUpdate.scheduleType = checkInToUpdate.scheduleType === "full" ? "half" : "full";
    await this.save();
    return checkInToUpdate;
  } else {
    throw new Error("Check-in document not found for the provided employeeId");
  }
};

workdayStatusSchema.methods.undoCheckIn = async function (employeeId) {
  const checkInToUpdate = this.checkIns.find(checkIn => checkIn.employeeId.equals(employeeId));
  if (checkInToUpdate) {
    checkInToUpdate.isPresent = !checkInToUpdate.isPresent;
    checkInToUpdate.checkInTime = null;
    checkInToUpdate.scheduleType = null;
    checkInToUpdate.isLate = false;
    await this.save();
    return checkInToUpdate;
  } else {
    throw new Error("Check-in document not found for the provided employeeId");
  }
};
workdayStatusSchema.methods.checkIn = async function (employeeId) {
  const checkInToUpdate = this.checkIns.find(checkIn => checkIn.employeeId.equals(employeeId));
  if (checkInToUpdate) {
    checkInToUpdate.isPresent = true;
    checkInToUpdate.checkInTime = new Date;
    checkInToUpdate.scheduleType = "full";
    checkInToUpdate.isLate = false;
    await this.save();
    return checkInToUpdate;
  } else {
    throw new Error("Check-in document not found for the provided employeeId");
  }
};

workdayStatusSchema.methods.toggleLate = async function (employeeId) {
  const checkInToUpdate = this.checkIns.find(checkIn => checkIn.employeeId.equals(employeeId));

  if (checkInToUpdate) {
    checkInToUpdate.isLate = !checkInToUpdate.isLate;
    await this.save();
    return checkInToUpdate;
  } else {
    throw new Error("Check-in document not found for the provided employeeId");
  }
};

async function createOrUpdateWorkdayStatus() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Check if a workdayStatus document already exists for the current day
  let existingWorkdayStatus = await WorkdayStatus.findOne({ date: currentDate });

  if (!existingWorkdayStatus) {
    // If no document exists, create a new one
    existingWorkdayStatus = new WorkdayStatus({ date: currentDate });
    // Retrieve all employee IDs from the Employee collection
    const allEmployees = await Employee.find({}, '_id');

    // Populate the checkIns array with employee IDs and default status
    existingWorkdayStatus.checkIns = allEmployees.map(employee => ({
      employeeId: employee._id,
    }));

    // Save the updated or new workdayStatus document
    await existingWorkdayStatus.save();
  }
  return existingWorkdayStatus;
}

const addCheckInToWorkdayStatus = async (checkInData) => {
  const workdayStatus = await createOrUpdateWorkdayStatus();
  workdayStatus.checkIns.push(checkInData);
  await workdayStatus.save();
};

const WorkdayStatus = mongoose.model("WorkdayStatus", workdayStatusSchema);


export {
  WorkdayStatus,
  createOrUpdateWorkdayStatus,
  addCheckInToWorkdayStatus,
};
