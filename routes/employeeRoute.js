import { Router } from "express";
import {
  login,
  setAdmin,
  setOprator,
  newEmployee,
  logout,
  allEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { ifAdmin, ifOprator, verifyToken } from "../middleware/verifyUser.js";
const router = Router();

router.post("/login", login);
router.post("/setAdmin/:empId", verifyToken, ifAdmin, setAdmin);
router.post("/setOprator/:empId", verifyToken, ifAdmin, setOprator);
router.post("/new", newEmployee);
router.post("/logout", verifyToken, logout);

router.get("/", verifyToken, ifOprator, allEmployee);

router.post("/:empId", verifyToken, ifAdmin, updateEmployee);
router.delete("/:empId", verifyToken, ifAdmin, deleteEmployee);

export default router;
