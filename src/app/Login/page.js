'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import { setCookie } from 'cookies-next';
import { getUserByUserAndPassword } from '@/userdataservice'; // Annahme: Deine API-Funktion zum Abrufen des Benutzers
import { useRouter } from 'next/navigation'; // Router-Hook von Next.js
import { publish } from '@/events';

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 50px auto 0;
  padding: 20px;
  background: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 12px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getUserByUserAndPassword(username, password);
      setCookie('userId', user.userId.toString(), { path: '/' });
      console.log('User logged in:', user);
      router.push('/'); // Navigiere zur Seite / nach erfolgreichem Login
      publish('userChanged')
    } catch (error) {
      console.error('Login failed:', error);
      // Hier könntest du eine Fehlermeldung anzeigen oder andere Handhabungen für fehlgeschlagene Anmeldungen durchführen
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Username:</Label>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <Label>Password:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <Button type="submit">Login</Button>
      </Form>
    </LoginContainer>
  );
};

export default LoginForm;
