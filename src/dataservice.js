// dataservice.js

export async function getCalendarEntriesByUserId(userId) {
    const response = await fetch(`http://localhost:3001/calendarEntries?userId=${userId}`);
    if (response.ok) return response.json();
    throw new Error(`Failed to fetch calendar entries for user id: ${userId}`);
  }
  
  export async function addEntryToUserById(userId, entry) {
    try {
      const response = await fetch(`http://localhost:3001/calendarEntries?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add entry to user.');
      }
      console.log('Event added successfully');
    } catch (error) {
      console.error('Error adding entry:', error);
      throw new Error('Failed to add entry to user.');
    }
  }
  
  export async function deleteCalendarEntryById(userId, calendarId) {
    try {
      const response = await fetch(`http://localhost:3001/calendarEntries/${calendarId}?userId=${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`);
      }
      console.log(`Deleted Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`);
    } catch (error) {
      console.error(`Failed to delete Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`, error);
      throw new Error(`Failed to delete Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`);
    }
  }
  
  export async function deleteAllCalendarEntries(userId) {
    try {
      const entries = await getCalendarEntriesByUserId(userId);
      const deletePromises = entries.map((entry) => deleteCalendarEntryById(userId, entry.id));
      await Promise.all(deletePromises);
      console.log(`Successfully deleted all calendar entries for user id: ${userId}`);
    } catch (error) {
      console.error(`Failed to delete all calendar entries for user id: ${userId}`, error);
      throw new Error(`Failed to delete all calendar entries for user id: ${userId}`);
    }
  }
  
  export async function updateCalendarEntryById(userId, updatedEvent) {
    try {
      const response = await fetch(`http://localhost:3001/calendarEntries/${updatedEvent.id}?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update Calendar Entry. User Id: ${userId}, Calendar Id: ${updatedEvent.id}`);
      }
      console.log(`Updated Calendar Entry. User Id: ${userId}, Calendar Id: ${updatedEvent.id}`);
      return response.json(); // Return updated event data if needed
    } catch (error) {
      console.error(`Failed to update Calendar Entry. User Id: ${userId}, Calendar Id: ${updatedEvent.id}`, error);
      throw new Error(`Failed to update Calendar Entry. User Id: ${userId}, Calendar Id: ${updatedEvent.id}`);
    }
  }
  