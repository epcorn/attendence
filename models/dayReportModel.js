import mongoose from "mongoose";
import Employee from "./employeeModel";

const dayReportSchema = mongoose.Schema({
    emp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    checked_in: {
        type: Date,
        required: true,
    },
    checked_out: Date,
    day_schedule_type: {
        type: String,
        enum: ["full", "half"],
        default: "full"
    }

});