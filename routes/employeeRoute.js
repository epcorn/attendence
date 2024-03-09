import { Router } from "express";
import { login, setAdmin, setOprato, newEmployee, logout, allEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController';
const router = Router();

router.post('/login', login);
router.post('/setAdmin/:empId', setAdmin);
router.post('/setOprator/:empId', setOprato);
router.post('/new', newEmployee);
router.post('/logout', logout);

router.get('/', allEmployee);

router.post('/:empId', updateEmployee);
router.delete('/:empId', deleteEmployee);

export default router;