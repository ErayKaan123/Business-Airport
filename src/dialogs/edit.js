// Dialog.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const DialogContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 400px;
  max-width: 90%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: showPopup 0.3s ease forwards;

  @keyframes showPopup {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const BlurBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 999;
`;

const DialogContent = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background: #dc3545;
  &:hover {
    background: #c82333;
  }
`;

const Dialog = ({ isOpen, onClose, initialEvent, onSave }) => {
  const [event, setEvent] = useState({ ...initialEvent });

  useEffect(() => {
    setEvent({ ...initialEvent });
  }, [initialEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(event);
    toast.success('Event updated successfully');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <BlurBackground />
      <DialogContainer>
        <DialogContent>
          <Title>Edit Event</Title>
          <Label>Title:</Label>
          <Input type="text" name="title" value={event.title} onChange={handleChange} />
          <Label>Description:</Label>
          <TextArea name="description" value={event.description} onChange={handleChange} />
          <Label>Location:</Label>
          <Input type="text" name="location" value={event.location} onChange={handleChange} />
          <Label>Start Date:</Label>
          <Input type="date" name="date" value={event.date} onChange={handleChange} />
          <Label>End Date:</Label>
          <Input type="date" name="endDate" value={event.endDate} onChange={handleChange} />
          <Button onClick={handleSave}>OK</Button>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </DialogContent>
      </DialogContainer>
    </>
  );
};

export default Dialog;
