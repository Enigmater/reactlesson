// src/pages/Projects.js
import React from 'react';
import Project from '../components/project/Project';  // Импортируем компонент Project
import useProjects from './../helpers/projectsList';  // Импортируем хук

const Projects = () => {
  const projects = useProjects();  // Используем хук для получения проектов

  // Если проекты еще не загружены, показываем сообщение о загрузке
  if (projects.length === 0) {
    return (
      <main className="section">
        <div className="container">
          <h2 className="title-1">Projects</h2>
          <p>Загрузка...</p> {/* Показываем загрузку, пока данные не получены */} 
        </div>
      </main>
    );
  }


  return (
    <main className="section">
      <div className="container">
        <h2 className="title-1">Projects</h2>
        <ul className="projects">
          {projects.map((project, index) => (
            <Project
              key={index}
              title={project.title}
              img={`http://localhost:3001/${project.img}`} 
              //imgBig={project.imgBig}  // Путь к большому изображению
              imgBig={`http://localhost:3001/${project.imgBig}`}
              skills={project.skills}
              gitHubLink={project.gitHubLink}
              index={project.proj_id}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Projects;