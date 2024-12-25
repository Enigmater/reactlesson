// src/helpers/projectsList.js
import { useState, useEffect } from 'react';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  
  // Функция для получения проектов с сервера
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/projects');
        const data = await response.json();
        setProjects(data);  // Записываем данные в состояние
      } catch (error) {
        console.error('Ошибка при загрузке проектов:', error);
      }
    };

    fetchProjects();
  }, []);  // Пустой массив зависимостей, чтобы запрос выполнялся только один раз
  console.log(projects)
  return projects;
}

export default useProjects;