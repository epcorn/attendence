import { useEffect, useState } from 'react';
import { workdayStatus } from '../redux/attendence/attendenceSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function DatePicker() {
    const [selectedDate, setSelectedDate] = useState();
    const [date, setDate] = useState(useSelector(state => state.dayStat.date));
    const dispatch = useDispatch();

    const handleDateChange = (e) => {
        const tempDate = e.target.value;
        console.log(tempDate);
        setDate(tempDate);
        setSelectedDate(formatDate(tempDate));

    };
    useEffect(() => {
        if (selectedDate !== undefined) {
            dispatch(workdayStatus(selectedDate));
        }
    }, [dispatch, selectedDate]);

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString();
        return formattedDate;
    };
    console.log(selectedDate);
    return (
        <div className='mr-3'>
            <input type="date" value={date} onChange={handleDateChange} />
        </div>
    );
}

export default DatePicker;
