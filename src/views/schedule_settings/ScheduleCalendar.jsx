import React, { useState, useMemo } from 'react'
import Calendar from 'react-calendar';
import './calendar.scss';
// import { drawTypeList } from '../../helper/mocks';
import { IOSSwitch } from '../../components/switch/IOSSwitch';

const ScheduleCalendar = ({ drawTypes, closeDates, selectDateCallback, closeDateCallback }) => {
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

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    selectDateCallback(date);
  }

  const handleDrawTypeClick = (data, clickType) => {
    closeDateCallback(data, clickType, selectedDate);
  }

  return (
    <div className='schedule-container'>
      {
        (drawTypes !== null && closeDates !== null) ?
        <>
          <div className='calendar-header'>
            <p>Current Day: {date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>Current Draw: 2PM</p>
            <p>Status: Open</p>
          </div>
          <Calendar
            maxDate={maxDate}
            minDate={date}
            onClickDay={(date) => { handleSelectDate(date) }}
            defaultValue={selectedDate}
            showWeekNumbers={true}
            minDetail='year'
            defaultView='month' />
          <div className='toggles-container'>
            <div className='toggles-header'>
              <h2>{selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
              <IOSSwitch
              checked={(drawTypes.filter((item) => closeDates.map(m => m.id).includes(item.id)).length > 0) ? false : true } />
            </div>
            <div style={{maxHeight:'480px', overflow:'auto'}}>
              {
                (drawTypes.length > 0) ?
                drawTypes.map((drawType) =>
                  <div className='draw-time-row' key={drawType.id}>
                    <p>{drawType.gameDrawTypeName}</p>
                    <IOSSwitch onClick={ e => handleDrawTypeClick(drawType, 0) }
                    checked={(closeDates.find(m => m.closedDrawType == drawType.id) !== undefined) ? false : true } size="small" />
                  </div>
                )
                : <div>No available draw time.</div>
              }
            </div>
          </div>
        </>
        : <div style={{padding:'25px'}}>Loading...Please wait.</div>
      }
    </div>
  )
}

export default ScheduleCalendar
