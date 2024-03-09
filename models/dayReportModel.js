import mongoose from "mongoose";
import Employee from "./employeeModel";

const dayReportSchema = mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    checked_in: {
        type: Date,
        required: true,
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