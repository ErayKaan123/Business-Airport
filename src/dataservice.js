export async function getCalendarEntriesByUserId(userId) {
    const response = await fetch("http://localhost:3001/calendarEntries?userId=" + userId);
    if(response.ok)return response.json();
    throw response;
}

export async function addEntryToUserById(userId, entry) {
    const response = await fetch("http://localhost:3001/calendarEntries?userId=" + userId);
    console.log(response.json().then((response) => {return response}).result)
    fetch('http://localhost:3001/calendarEntries?userId=' + userId,{
        method:'POST',
        headers:{
            Accept:'application/json','Content-Type':'application/json',},
            body: JSON.stringify(entry),
        });
}

export async function deleteCalendarEntryById(userId, calendarId) {
    const response = await fetch(`http://localhost:3001/calendarEntries/${calendarId}?userId=${userId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log(`Deleted Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`);
    } else {
        console.error(`Failed to delete Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`);
        throw new Error(`Failed to delete Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`);
    }
}

export async function deleteAllCalendarEntries(userId) {
    try {
        const entries = await getCalendarEntriesByUserId(userId);
        const deletePromises = entries.map(entry => deleteCalendarEntryById(userId, entry.id));
        await Promise.all(deletePromises);
        console.log(`Successfully deleted all calendar entries for user id: ${userId}`);
    } catch (error) {
        console.error(`Failed to delete all calendar entries for user id: ${userId}`, error);
        throw new Error(`Failed to delete all calendar entries for user id: ${userId}`);
    }
}
/*+ "products?category=" + category*/