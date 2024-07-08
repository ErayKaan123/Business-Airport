export async function getCalendarEntriesByUserId(userId) {
    const response = await fetch("http://localhost:3001/calendarEntries?userId=" + userId);
    if(response.ok)return response.json();
    throw response;
}

export async function addEntryToUserById(userId, entry) {
    const response = await fetch("http://localhost:3001/calendarEntries?userId=" + id);
    console.log(response.json().then((response) => {return response}).result)
    fetch('http://localhost:3001/calendarEntries?userId=' + userId,{
        method:'POST',
        headers:{
            Accept:'application/json','Content-Type':'application/json',},
            body: JSON.stringify(entry),
        });
}

export async function deleteCalendarEntryById(userId, calendarId) {
    console.log(userId);
}

export async function deleteAllCalendarEntries(userId,) {
    
}
/*+ "products?category=" + category*/