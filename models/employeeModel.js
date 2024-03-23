import mongoose from "mongoose";
import bcrypt from "bcrypt";

const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 30,
  },
  lastname: {
    type: String,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: Number,
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "oprator", "hr"],
    default: null
  },
  category: {
    type: String,
    enum: ["alpha", "normal", "executive", "trainee"],
    default: "normal",
  },
  division: {
    type: String,
    enum: ["pc", "lc", "att", "os", "fs"],
  },
  company: {
    type: String,
    enum: ["EPPL", "PMO", "PMS", "EPC", "PCS", "EPPLG"],
  },
});

employeeSchema.pre("save", async function encryptPass(next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

employeeSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
