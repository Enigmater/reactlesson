import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Project from '../components/project/Project'; 

const Profile = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        logout(); // Вызываем функцию logout из контекста
    };

    // Загружаем заказы, если пользователь авторизован
    useEffect(() => {
        if (user) {
            const fetchOrders = async () => {
                try {
                    // Отправляем запрос с логином пользователя в заголовке
                    console.log(user);
                    const response = await axios.get(`http://localhost:3001/api/orders`, {
                        params: {
                            userId: user.id,  // Передаем логин пользователя
                        },
                    });
                    // Если ответ является массивом, устанавливаем его в состояние
                    if (Array.isArray(response.data)) {
                        setOrders(response.data);
                    } 
                    console.log(response);
                } catch (error) {
                    setError('Не удалось загрузить заказы'); // Обработка ошибок
                }
            };
    
            fetchOrders(); // Загружаем заказы             
        }
    }, [user]); // Эффект срабатывает, когда user изменяется

    if (!user) {
        return <div>Загрузка...</div>; // Если user еще не загружен
    }

     // Обработчик удаления заказа
    const handleDeleteOrder = async (orderId) => {
        try {
            // Отправляем запрос на удаление заказа
            const response = await axios.delete(`http://localhost:3001/api/orders`, {
                params: {
                    userId: user.id, // Передаем id пользователя, чтобы убедиться, что это его заказ
                    orderId: orderId
                },
            });

            // Если заказ успешно удален, обновляем список заказов
            setOrders(orders.filter(order => order.id_order !== orderId));
        } catch (error) {
            setError('Не удалось удалить заказ'); // Обработка ошибок
        }
    };

    return (
        <div className="profile">
            <h1>Добро пожаловать {user.login} в вашу панель управления</h1>
            <p>Это ваша личная панель, где вы можете управлять своей учетной записью.</p>
            <button onClick={handleLogout} className="logout-btn">
                Выйти
            </button>

            <div>
                <h2>Ваши заказы</h2>
                {error && <p className="error">{error}</p>} {/* Отображение сообщения об ошибке */}
                {orders.length === 0 ? (
                    <p>Нет доступных заказов.</p>
                ) : (
                    <ul className="projects">
                        {orders.map((project, index) => (
                            <li key={project.id_order}>
                            <Project
                                title={project.title}
                                img={`http://localhost:3001/${project.img}`} 
                                imgBig={`http://localhost:3001/${project.imgBig}`}
                                skills={project.skills}
                                gitHubLink={project.gitHubLink}
                                index={project.proj_id}
                            />
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteOrder(project.id_order)} // Вызываем функцию удаления заказа
                            >
                                Удалить заказ
                            </button>
                        </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Profile;