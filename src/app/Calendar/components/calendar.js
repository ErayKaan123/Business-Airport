// Calendar.js

import { getCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import Dialog from '@/dialogs/edit'; // Passe den Pfad entsprechend deiner Projektstruktur an
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import styled from 'styled-components';
import { 
  getCalendarEntriesByUserId, 
  addEntryToUserById, 
  deleteCalendarEntryById,
  deleteAllCalendarEntries,
  updateCalendarEntryById // Importiere die Funktion zum Aktualisieren eines Eintrags
} from '@/dataservice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  position: relative;
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

const Actions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 12px;
`;

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    userId: getCookie('userId'),
    date: new Date(),
    endDate: null,
    time: '',
    title: '',
    description: '',
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getCalendarEntriesByUserId(getCookie('userId')).then((response) => setEvents(response));
  }, []);

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
    addEntryToUserById(getCookie('userId'), newEvent).then(() => {
      setEvents([...events, newEvent]);
      setNewEvent({
        userId: getCookie('userId'),
        date: new Date(),
        endDate: null,
        time: '',
        title: '',
        description: '',
      });
      toast.success('Event added successfully');
    }).catch(error => {
      toast.error('Failed to add event. Try again.');
    });
  };

  const deleteEvent = (event) => {
    deleteCalendarEntryById(getCookie('userId'), event.id).then(() => {
      setEvents(events.filter(e => e.id !== event.id));
      toast.success(`Successfully deleted your ${event.title.length > 0 ? event.title : "Event"}`);
    }).catch(error => {
      toast.error('Failed to delete event. Try again.');
    });
  };

  const deleteAllEvents = () => {
    deleteAllCalendarEntries(getCookie('userId'))
      .then(() => {
        setEvents([]);
        toast.success('Successfully deleted all events');
      })
      .catch(error => {
        toast.error('Failed to delete all events. Try again.');
      });
  };

  const updateEvent = (updatedEvent) => {
    updateCalendarEntryById(getCookie('userId'), updatedEvent).then(() => {
      const updatedEvents = events.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      setEvents(updatedEvents);
      toast.success('Event updated successfully');
    }).catch(error => {
      toast.error('Failed to update event. Try again.');
    });
  };

  const sortedEvents = events.slice().sort((a, b) => {
    const dateTimeA = new Date(`${moment(a.date).format('YYYY-MM-DD')}T${a.time}`);
    const dateTimeB = new Date(`${moment(b.date).format('YYYY-MM-DD')}T${b.time}`);
    return dateTimeA - dateTimeB;
  });

  const openEditDialog = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedEvent(null);
    setIsDialogOpen(false);
  };

  const handleSaveEvent = (updatedEvent) => {
    updateEvent(updatedEvent);
    setIsDialogOpen(false);
  };

  return (
    <CalendarContainer>
      <ToastContainer />
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
          <Input type="time" name="time" value={newEvent.time} onChange={handleInputChange} />
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
        <div className="flex justify-end">
          <button onClick={deleteAllEvents} className="px-5 py-2 my-4 bg-red-500 hover:bg-red-600 rounded text-white">Delete All</button>
        </div>
        {events.length === 0 ? (
          <p>No events added yet.</p>
        ) : (
          <EventsList>
            {sortedEvents.map((event) => (
              <EventItem key={event.id}>
                <EventTitle>{event.title}</EventTitle>
                <div>
                  {moment(event.date).format('MMMM D, YYYY')} at {event.time}
                  {event.endDate && <span> to {moment(event.endDate).format('MMMM D, YYYY')}</span>}
                </div>
                <EventDescription>{event.description}</EventDescription>
                <Actions>
                  <button onClick={() => openEditDialog(event)} className="py-2 px-6 bg-[#007bff] hover:bg-[#0056b3] rounded text-white">Edit</button>
                  <button onClick={() => deleteEvent(event)} className="px-5 bg-red-500 hover:bg-red-600 rounded text-white">Delete</button>
                </Actions>
              </EventItem>
            ))}
          </EventsList>
        )}
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        initialEvent={selectedEvent}
        onSave={handleSaveEvent}
      />
    </CalendarContainer>
  );
};

export default Calendar;
