import { errorHandler } from '../utils/error.js';
import Employee from "../models/employeeModel.js";
import { createToken } from "../middleware/verifyUser.js";

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are requird"));
  }
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return next(errorHandler(404, "Employee not found!"));
    }
    const validEmployee = await employee.comparePassword(password);
    if (!validEmployee) {
      return next(errorHandler(400, "Invalid credential"));
    }
    const token = createToken(employee);

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ message: `Hello ${employee.firstname}`, user: employee, token });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User have been signed out");
  } catch (error) {
    next(error);
  }
};
const setAdmin = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      empId,
      { isAdmin: true },
      { new: true }
    );
    if (!updatedEmployee) {
      return next(errorMiddleware(404, "Employee not found!"));
    }
    const { password, ...rest } = updatedEmployee._doc;
    res.status(200).json({
      message: `${updatedEmployee.firstname} is Oprator now!`,
      employee: rest,
    });
  } catch (error) {
    next(error);
  }
};
const setOprator = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      empId,
      { isOprator: true },
      { new: true }
    );
    if (!updatedEmployee) {
      return next(errorMiddleware(404, "Employee not found!"));
    }
    const { password, ...rest } = updatedEmployee._doc;
    res.status(200).json({
      message: `${updatedEmployee.firstname} is Oprator now!`,
      employee: rest,
    });
  } catch (error) {
    next(error);
  }
};
const newEmployee = async (req, res, next) => {
  try {
    const { firstname, lastname, email, phone, category, division, company } =
      req.body;
    const createdEmployee = await Employee.create({
      firstname,
      lastname,
      email,
      phone,
      category,
      division,
      company,
      password: phone,
    });
    const { password, ...rest } = createdEmployee._doc;
    res
      .status(201)
      .json({ message: "Employee is Registered!", employee: rest });
  } catch (error) {
    next(error);
  }
};

const allEmployee = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    const empArray = employees.map((emp) => ({
      firstname: emp.firstname,
      lastname: emp.lastname,
      email: emp.email,
      phone: emp.phone,
      category: emp.category,
      division: emp.division,
      company: emp.company,
    }));
    res.status(200).json({ empArray });
  } catch (error) {
    next(error);
  }
};

const empDetails = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ "message": "No such employee" });
    }
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => { };
const deleteEmployee = async (req, res, next) => { };

export {
  login,
  setAdmin,
  setOprator,
  newEmployee,
  allEmployee,
  empDetails,
  deleteEmployee,
  updateEmployee,
  logout,
};
