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
    email: String,
    phone: Number,
    password: String,
    category: {
        type: String,
        enum: ['alpha', 'normal', 'executive', 'trainee'],
        default: 'normal',
    },
    division: {
        type: String,
        enum: ['pc', 'lc', 'att', 'os', 'fs'],
    },

});


employeeSchema.pre('save', async function encryptPass() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
employeeSchema.methods.comparePassword = async function (password,) {
    return await bcrypt.compare(password, this.password);
};

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
