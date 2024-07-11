import { getCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import Dialog from '@/dialogs/edit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import '../Calendar.css';
import { 
  getCalendarEntriesByUserId, 
  addEntryToUserById, 
  deleteCalendarEntryById,
  deleteAllCalendarEntries,
  updateCalendarEntryById
} from '@/dataservice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className="calendar-container">
      <ToastContainer />
      <h1 className="title">Calendar</h1>
      <div>
        <h2 className="section-title">Add New Event</h2>
        <div className="form">
          <DatePicker
            selected={newEvent.date}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            customInput={<input className="input" />}
          />
          <DatePicker
            selected={newEvent.endDate}
            onChange={handleEndDateChange}
            dateFormat="MMMM d, yyyy"
            placeholderText="End Date (optional)"
            customInput={<input className="input" />}
          />
          <input type="time" name="time" value={newEvent.time} onChange={handleInputChange} className="input" />
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="input"
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleInputChange}
            className="textarea"
          />
          <button onClick={addEvent} className="button">Add Event</button>
        </div>
      </div>
      <div>
        <h2 className="section-title">All Events</h2>
        <div className="flex justify-end">
          <button onClick={deleteAllEvents} className="delete-all-button">Delete All</button>
        </div>
        {events.length === 0 ? (
          <p>No events added yet.</p>
        ) : (
          <ul className="events-list">
            {sortedEvents.map((event) => (
              <li key={event.id} className="event-item">
                <strong className="event-title">{event.title}</strong>
                <div>
                  {moment(event.date).format('MMMM D, YYYY')} at {event.time}
                  {event.endDate && <span> to {moment(event.endDate).format('MMMM D, YYYY')}</span>}
                </div>
                <p className="event-description">{event.description}</p>
                <div className="actions">
                  <button onClick={() => openEditDialog(event)} className="button">Edit</button>
                  <button onClick={() => deleteEvent(event)} className="button delete-all-button">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        initialEvent={selectedEvent}
        onSave={handleSaveEvent}
      />
    </div>
  );
};

export default Calendar;
