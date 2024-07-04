'use client';

import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { addEntryToUserById } from "@/dataservice";
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100vw;
  min-height: calc(100vh - 100px);
  overflow: visible;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #e9ecef;
  text-align: center;
`;

const SubContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto 0;
  padding: 20px;
  background: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

function App() {
  const [userId, setUserId] = useState(0);
  const [flights, setFlights] = useState([
    {
      id: 1,
      from: 'Berlin',
      to: 'New York',
      date: '2024-07-10',
      endDate: '2024-07-11',
      time: '10:00 AM',
      title: 'Flight to New York',
      description: 'Non-stop flight to New York',
      price: '$500'
    },
    {
      id: 2,
      from: 'Berlin',
      to: 'London',
      date: '2024-07-12',
      endDate: '2024-07-13',
      time: '12:00 PM',
      title: 'Flight to London',
      description: 'Non-stop flight to London',
      price: '$450'
    },
    {
      id: 3,
      from: 'Berlin',
      to: 'Paris',
      date: '2024-07-14',
      endDate: '2024-07-15',
      time: '2:00 PM',
      title: 'Flight to Paris',
      description: 'Non-stop flight to Paris',
      price: '$400'
    }
  ]);

  useEffect(() => {
    const userIdFromCookie = getCookie("userId");
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
    } else {
      const newUserId = Math.floor(Math.random() * 1000);
      setCookie("userId", newUserId);
      setUserId(newUserId);
    }
  }, []);

  const handleBuyNow = (flight) => {
    const entry = {
      userId: userId,
      date: flight.date,
      endDate: flight.endDate,
      time: flight.time,
      title: flight.title,
      description: flight.description
    };

    addEntryToUserById(userId, entry);
    toast.success(`Successfully purchased: ${flight.title}`);
  };

  return (
    <AppContainer>
      <SubContainer>
        <h1 className="font-bold font-sans text-3xl mb-8 text-center">
          Buy Tickets - Your Gateway to Exciting Events
        </h1>
        {flights.map((flight) => (
          <div key={flight.id} className="bg-gray-200 p-4 mb-4 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{flight.title}</h2>
              <p className="text-gray-700">{`From: ${flight.from} To: ${flight.to}`}</p>
              <p className="text-gray-700">{flight.time}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{flight.price}</p>
              <button 
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleBuyNow(flight)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
        <ToastContainer />
      </SubContainer>
    </AppContainer>
  );
}

export default App;
