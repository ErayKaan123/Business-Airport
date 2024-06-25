// src/Calendar.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto 0;
  padding: 20px;
  background: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const SectionTitle = styled.h2`
  margin-top: 20px;
  color: #555;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const EventsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const EventItem = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const EventTitle = styled.strong`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const EventDescription = styled.p`
  margin: 0;
  color: #666;
`;

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    date: new Date(),
    endDate: null,
    time: '',
    title: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewEvent({ ...newEvent, date });
  };

  const handleEndDateChange = (date) => {
    setNewEvent({ ...newEvent, endDate: date });
  };

  const addEvent = () => {
    setEvents([...events, newEvent]);
    setNewEvent({ date: new Date(), endDate: null, time: '', title: '', description: '' });
  };

  const sortedEvents = events.slice().sort((a, b) => {
    const dateTimeA = new Date(`${moment(a.date).format('YYYY-MM-DD')}T${a.time}`);
    const dateTimeB = new Date(`${moment(b.date).format('YYYY-MM-DD')}T${b.time}`);
    return dateTimeA - dateTimeB;
  });

  return (
    <CalendarContainer>
      <Title>Calendar</Title>
      <div>
        <SectionTitle>Add New Event</SectionTitle>
        <Form>
          <DatePicker
            selected={newEvent.date}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            customInput={<Input />}
          />
          <DatePicker
            selected={newEvent.endDate}
            onChange={handleEndDateChange}
            dateFormat="MMMM d, yyyy"
            placeholderText="End Date (optional)"
            customInput={<Input />}
          />
          <Input
            type="time"
            name="time"
            value={newEvent.time}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
          <TextArea
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleInputChange}
          />
          <Button onClick={addEvent}>Add Event</Button>
        </Form>
      </div>
      <div>
        <SectionTitle>All Events</SectionTitle>
        {events.length === 0 ? (
          <p>No events added yet.</p>
        ) : (
          <EventsList>
            {sortedEvents.map((event, index) => (
              <EventItem key={index}>
                <EventTitle>{event.title}</EventTitle>
                <div>
                  {moment(event.date).format('MMMM D, YYYY')} at {event.time}
                  {event.endDate && (
                    <span> to {moment(event.endDate).format('MMMM D, YYYY')}</span>
                  )}
                </div>
                <EventDescription>{event.description}</EventDescription>
              </EventItem>
            ))}
          </EventsList>
        )}
      </div>
    </CalendarContainer>
  );
};

export default Calendar;
