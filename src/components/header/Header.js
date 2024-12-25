import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const Header = () => {
  // Состояние для хранения имени
  const [name, setName] = useState('Yuri'); // Начальное имя

  // Функция для запроса на сервер
  const fetchName = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/name'); // Замените на ваш endpoint
      setName(response.data.name); // Обновляем имя в состоянии
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">
          <strong>
            Hi, my name is <em>{name}</em>
          </strong>
          <br />a frontend developer
        </h1>
        <div className="header__text">
          <p>with passion for learning and creating.</p>
        </div>
        <button onClick={fetchName} className="btn">
          Change Name
        </button>
      </div>
    </header>
  );
};

export default Header;