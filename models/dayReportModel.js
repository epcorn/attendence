import mongoose from "mongoose";

const checkInSchema = mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  checkInTime: {
    type: Date,
    default: Date.now,
  },
  scheduleType: {
    type: String,
    enum: ["full", "half"],
    default: "full",
  },
  isLate: {
    type: Boolean,
    default: false,
  },
});

const workdayStatusSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    unique: true,
  },
  checkIns: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "CheckIn",
  },
});

workdayStatusSchema.methods.hasCheckInForEmployee = async function (
  employeeId
) {
  const checkIns = await this.model("CheckIn").find({
    _id: { $in: this.checkIns },
  });
  return checkIns.some((checkIn) => checkIn.employeeId.equals(employeeId));
};

workdayStatusSchema.methods.getEmployeeCheckInData = async function (
  employeeId
) {
  const checkIns = await this.model("CheckIn").find({
    _id: { $in: this.checkIns },
  });
  return checkIns.find((checkIn) => checkIn.employeeId.equals(employeeId));
};

workdayStatusSchema.methods.toggleScheduleType = async function (employeeId) {
  const checkIns = await this.model("CheckIn").find({
    _id: { $in: this.checkIns },
  });
  const checkInToUpdate = await checkIns.find((checkIn) =>
    checkIn.employeeId.equals(employeeId)
  );

  if (checkInToUpdate) {
    checkInToUpdate.scheduleType =
      checkInToUpdate.scheduleType === "full" ? "half" : "full";
    await checkInToUpdate.save();
    return checkInToUpdate;
  } else {
    throw new Error("Check-in document not found for the provided employeeId");
  }
};

workdayStatusSchema.methods.undoCheckIn = async function (employeeId) {
  const checkIns = await this.model("CheckIn").find({
    _id: { $in: this.checkIns },
  });
  const checkInToUpdate = checkIns.find((checkIn) =>
    checkIn.employeeId.equals(employeeId)
  );

  if (checkInToUpdate) {
    const removedCheckIn = await this.model("CheckIn").findByIdAndDelete(
      checkInToUpdate._id
    );

    if (!removedCheckIn) {
      throw new Error(
        "Failed to remove the check-in document from the collection."
      );
    }

    this.checkIns.pull(checkInToUpdate._id);
    await this.save();

    return removedCheckIn;
  } else {
    throw new Error("Check-in document not found for the provided employeeId");
  }
};

workdayStatusSchema.methods.toggleLate = async function (employeeId) {
  const checkIns = await this.model("CheckIn").find({
    _id: { $in: this.checkIns },
  });
  const checkInToUpdate = await checkIns.find((checkIn) =>
    checkIn.employeeId.equals(employeeId)
  );

  if (checkInToUpdate) {
    checkInToUpdate.isLate = !checkInToUpdate.isLate;
    await checkInToUpdate.save();
    return checkInToUpdate;
  } else {
    throw new Error("Check-in document not found for the provided employeeId");
  }
};

const createOrUpdateWorkdayStatus = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let workdayStatus = await WorkdayStatus.findOne({ date: today });

  if (!workdayStatus) {
    workdayStatus = new WorkdayStatus({ date: today });
  }

  return workdayStatus;
};

const addCheckInToWorkdayStatus = async (checkInData) => {
  const workdayStatus = await createOrUpdateWorkdayStatus();
  workdayStatus.checkIns.push(checkInData._id);
  await workdayStatus.save();
};

const WorkdayStatus = mongoose.model("WorkdayStatus", workdayStatusSchema);
const CheckIn = mongoose.model("CheckIn", checkInSchema);

export {
  WorkdayStatus,
  CheckIn,
  createOrUpdateWorkdayStatus,
  addCheckInToWorkdayStatus,
};
