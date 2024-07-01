'use client'

import { getCookie, setCookie } from 'cookies-next'
 
function App(){    
    return(
        <div>
            <input
            type="text"
            name="title"
            placeholder="Event Title"
            onChange={handleInputChange}
          />
        </div>
    )
}
const handleInputChange = (e) => {
    const { value } = e.target;
    setCookie('userId', value)
    alert("Logged in as: " + value)
  };

export default App;