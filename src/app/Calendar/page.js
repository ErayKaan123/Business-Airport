// src/App.js
'use client';

import React from 'react';
import Calendar from './components/calendar';
import styled from 'styled-components';

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
`;

function App() {
  return (
    <AppContainer>
      <Calendar />
    </AppContainer>
  );
}

export default App;
