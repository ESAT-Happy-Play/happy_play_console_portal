import React, { useState, useMemo } from 'react'
import Calendar from 'react-calendar';
import './calendar.scss';
import { drawTypeList } from '../../helper/mocks';
import { IOSSwitch } from '../../components/switch/IOSSwitch';

const ScheduleCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // COMPUTED values
  const newdate = useMemo(() => {
    let max = new Date(date);
    max.setDate(max.getDate() + 10);
    return max;
  }, [date])

  const maxDate = useMemo(() => {
    let max = new Date(newdate);
    max.setDate(max.getDate() + 25);
    return max;
  }, [date]);


  return (
    <div className='schedule-container'>
      <div className='calendar-header'>
        <p>Current Day: {date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>Current Draw: 2PM</p>
        <p>Status: Open</p>
      </div>
      <Calendar
        maxDate={maxDate}
        minDate={date}
        onClickDay={(date) => { setSelectedDate(date) }}
        defaultValue={selectedDate}
        showWeekNumbers={true}
        minDetail='year'
        defaultView='month' />
      <div className='toggles-container'>
        <div className='toggles-header'>
          <h2>{selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</h2><IOSSwitch />
        </div>
        {drawTypeList.map((drawType) =>
          <div className='draw-time-row'><p>{drawType.name}</p><IOSSwitch size="small" /></div>
        )}
      </div>
    </div>
  )
}

export default ScheduleCalendar
