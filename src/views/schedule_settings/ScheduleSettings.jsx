import React, { useState, useMemo } from 'react'
import Calendar from 'react-calendar';
import './calendar.scss';

function ScheduleSettings() {
  const [date, setDate] = useState(new Date());

  const newdate = useMemo(() => {
    let max = new Date(date);
    max.setDate(max.getDate() + 10);
    return max;
  }, [date])

  const maxDate = useMemo(() => {
    let max = new Date(newdate);
    max.setDate(max.getDate() + 25);
    return max;
  }, [date])
  return (
    <div>
      <div>
        <Calendar
          maxDate={maxDate}
          minDate={date}
          onClickDay={() => { console.log(date) }}
          showWeekNumbers={true}
          minDetail='year'
          defaultView='month' />
      </div>
    </div>
  )
}

export default ScheduleSettings
