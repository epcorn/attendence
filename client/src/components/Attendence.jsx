import { Button, Checkbox, Table, TextInput } from 'flowbite-react';
import DatePicker from './DatePicker';
import { useSelector } from 'react-redux';
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from 'react';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import { togglePresence } from '../redux/attendence/attendenceSlice';

function Attendence() {
    const { currentUser } = useSelector(state => state.user);
    const { workdayStatus, loading } = useSelector(state => state.dayStat);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    function handleSubmit() {
        console.log(searchTerm);
    }

    const handleClick = (employeeId, isPresent) => {
        // Dispatch the togglePresence action with the employeeId and isPresent value
        console.log(employeeId);
        console.log(isPresent);
        dispatch(togglePresence(employeeId));
    };
    return (
        <div className='flex-col mt-2 mx-auto '>
            {loading && <Loading />}
            <div className=' flex justify-between'>
                <div></div>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        type="text"
                        value={searchTerm}
                        placeholder="Search..."
                        rightIcon={AiOutlineSearch}
                        className=""
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
                <DatePicker />
            </div>
            <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
                {currentUser.role === "oprator" && workdayStatus.length > 0 ? (
                    <>
                        <Table hoverable className=" shadow-md">
                            <Table.Head>
                                <Table.HeadCell>Employee ID</Table.HeadCell>
                                <Table.HeadCell>Check In time</Table.HeadCell>
                                <Table.HeadCell>Schedule Type</Table.HeadCell>
                                <Table.HeadCell>Is late</Table.HeadCell>
                                <Table.HeadCell>Attendance</Table.HeadCell>
                            </Table.Head>
                            {workdayStatus?.map((employee) => (
                                <Table.Body key={employee.employeeId} className="divide-y">
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            {employee.employeeId}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {new Date(employee.checkInTime).toLocaleTimeString()}
                                        </Table.Cell>
                                        <Table.Cell>{employee.scheduleType}</Table.Cell>
                                        <Table.Cell>
                                            <Button className={employee.isLate ? " bg-red-400" : "bg-green-400"}>{employee.isLate ? "Late" : "No"}</Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Checkbox
                                                value={employee.isPresent}
                                                onClick={(e) => handleClick(employee.employeeId, e.target.checked)} // Pass employeeId and checked state to handleClick
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                        </Table>
                    </>
                ) : (
                    <p className=' text-center font-bold'>No Data found!!</p>
                )}
            </div>
        </div>
    );
}

export default Attendence;
