// src/pages/Project.js
import { useParams } from "react-router-dom";
import BtnGitHub from "../components/btnGitHub/BtnGitHub";
import useProjects from "../helpers/projectsList";  // Импортируем хук
import { useState } from "react"; // Импортируем useState для состояния кнопки
import { useAuth } from "../context/AuthContext"; // Импортируем хук для работы с контекстом аутентификации
import axios from 'axios';

const Project = () => {
  const { id } = useParams();  // Получаем id проекта из URL
  const projects = useProjects();  // Получаем проекты через хук
  const { user } = useAuth();  // Получаем пользователя из контекста
  const [loading, setLoading] = useState(false); // Стейт для загрузки

  // Если проекты еще не загружены, показываем сообщение о загрузке
  if (projects.length === 0) {
    return <div>Загрузка...</div>;
  }

  // Находим проект по id
  const project = projects.find((project) => project.proj_id === parseInt(id));

  // Если проект не найден, показываем сообщение
  if (!project) {
    return <div>Проект не найден.</div>;
  }

  console.log(user);
  if (!user) {
    return <div>Пользователь не авторизован.</div>;
  }

  // Функция для отправки POST-запроса на сервер для создания товара
  const handleCreateProduct = async () => {
    setLoading(true); // Включаем индикатор загрузки
    try {
      const body = { login: user.login, project_id: project.proj_id };
      const response = axios.post('http://localhost:3001/api/orders/create', body);
      console.log(response);
      setLoading(false); // Выключаем индикатор загрузки
    }
    catch (err) {
      console.error('Create order failed!', err);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="project-details">
          <h1 className="title-1">{project.title}</h1>

          <img
            src={`http://localhost:3001${project.imgbig}`}
            alt={project.title}
            className="project-details__cover"
          />
          <div className="project-details__desc">
            <p>Skills: {project.skills}</p>
          </div>

          {project.gitHubLink && (
            <BtnGitHub link={project.gitHubLink} />
          )}

          {/* Кнопка для создания товара */}
          <button
            className="btn-create-product"
            onClick={handleCreateProduct}
            disabled={loading} // Блокируем кнопку, если идет загрузка
          >
            {loading ? "Создание заказа..." : "Создать заказ"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Project;