import { useDispatch } from 'react-redux';
import { getEmployees } from '../redux/employee/employeeSlice';
import { useEffect } from 'react';
function Employee() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEmployees());
    });
    return (
        <div>Employee</div>
    );
}

export default Employee;