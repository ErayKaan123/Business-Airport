export async function getCalendarEntriesByUserId(id) {
    const response = await fetch("http://localhost:3001/calendarEntries?userId=" + id);
    if(response.ok)return response.json();
    throw response;
}

export async function addEntryToUserById(id, entry) {
    const response = await fetch("http://localhost:3001/calendarEntries?userId=" + id);
    console.log(response.json().then((response) => {return response}).result)
    fetch('http://localhost:3001/calendarEntries?userId=' + id,{
        method:'POST',
        headers:{
            Accept:'application/json','Content-Type':'application/json',},
            body: JSON.stringify(entry),
        });
}
/*+ "products?category=" + category*/