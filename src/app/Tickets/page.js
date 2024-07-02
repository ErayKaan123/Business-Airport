'use client'

import {getCalendarEntriesByUserId, addEntryToUserById} from "@/dataservice";
import { getCookie, setCookie } from 'cookies-next'
import { useState } from 'react';
import styled from 'styled-components';

 
const Background = styled.div`
  width: 100%;
  min-width: 100%;
  margin: 0px auto 0;
  padding: 20px;
  background: #f0f4f8;
  border-radius: 8px;
`;

function App(){    
    const [userId, setUserId] = useState(0);

    addEntryToUserById(getCookie("userId"), {
        "id": "0",
        "userId": 0,
        "date": "",
        "endDate": "",
        "time": "",
        "title": "",
        "description": ""
      })
    return(
        <Background>
            <div className="shadow-md">
                <h1>Buy Tickets - Your Gateway to Exciting Events</h1>
            </div>
        </Background>
    )
}

export default App;