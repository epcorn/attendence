import { useEffect, useState } from 'react';
import { workdayStatus } from '../redux/attendence/attendenceSlice';
import { useDispatch } from 'react-redux';
function DatePicker() {
    const [selectedDate, setSelectedDate] = useState('');
    const dispatch = useDispatch();

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);
    };
    useEffect(() => {
        dispatch(workdayStatus(selectedDate));
    }, [dispatch, selectedDate]);

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString();
        return formattedDate;
    };

    return (
        <div>
            <input type="date" value={selectedDate} onChange={handleDateChange} />
            {selectedDate && (
                <p>Selected Date (ISO 8601 format): {formatDate(selectedDate)}</p>
            )}
        </div>
    );
}

export default DatePicker;
