'use client'

import { getCookie, setCookie } from 'cookies-next'
import { useState } from 'react';
 
function App(){    
    const [userId, setUserId] = useState(0);

    const handleInputChange = () => {
        setCookie('userId', userId.target.value)
        alert("Logged in as: " + userId.target.value)
      };

    return(
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"calc(100vh - 100px)", width:"100vw"}}>
            <input
            type="number"
            name="userId"
            placeholder="User ID"
            onChange={setUserId}
            style={{border:"black solid", borderRadius:"5px"}}
          />
          <button style={{marginLeft:"10px", border: "black solid",borderRadius:"5px"}} onClick={handleInputChange}>
            Submit
          </button>
        </div>
    )
}

export default App;