// src/Calendar.js
'use client';
import React, { useState } from 'react';
import moment from 'moment';
import './Calendar.css';

const Calendar = () => {
    const [date, setDate] = useState(moment());

    const startDay = date.clone().startOf('month').startOf('week');
    const endDay = date.clone().endOf('month').endOf('week');

    const generateCalendar = () => {
        const calendar = [];
        let day = startDay.clone().subtract(1, 'day');
        while (day.isBefore(endDay, 'day')) {
            calendar.push(
                Array(7)
                    .fill(0)
                    .map(() => day.add(1, 'day').clone())
            );
        }
        return calendar;
    };

    const isSameMonth = (day) => day.isSame(date, 'month');

    const prevMonth = () => setDate(date.clone().subtract(1, 'month'));
    const nextMonth = () => setDate(date.clone().add(1, 'month'));

    const calendar = generateCalendar();

    return (
        <div className="calendar">
            <header>
                <div className="month-display">
                    <button onClick={prevMonth}>{'<'}</button>
                    <span>{date.format('MMMM YYYY')}</span>
                    <button onClick={nextMonth}>{'>'}</button>
                </div>
                <div className="day-names">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                        <div key={d} className="day-name">{d}</div>
                    ))}
                </div>
            </header>
            <div className="calendar-body">
                {calendar.map((week, idx) => (
                    <div key={idx} className="week">
                        {week.map((day) => (
                            <div key={day.format('D')} className={`day ${isSameMonth(day) ? '' : 'faded'}`}>
                                {day.format('D')}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
