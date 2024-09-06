import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Input from './Input';

function UserList() {
    const db = "http://localhost:3000";
    const [userData, setUserData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });

    useEffect(() => {
        axios
            .get(`${db}/usuarios`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.log("No anduvo", error);
            });
    }, [refreshData]);

    const triggerRefresh = () => {
        setRefreshData(prev => !prev);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${db}/usuarios`, formData)
            .then(function (response) {
                window.alert(`Se ha creado el usuario ${formData.name}`);
                triggerRefresh();
        })
            .catch(function (error) {
                console.log("No se cargo el usuario");
        });
        }

    const handleDelete = (id) => {
        axios
            .delete(`${db}/usuarios/${id}`)
            .then(() => {
                console.log('Usuario borrado');
                triggerRefresh();
            })
            .catch(error => {
                console.log("No se pudo borrar", error);
            });
    };

    const handleEdit = (user) => {
        setFormData({ name: user.name, email: user.email });
        axios
            .put(`${db}/usuarios/${user}`, formData)
            .then(function (response) {
                window.alert(`Se ha editado el usuario ${formData.name}`);
                triggerRefresh();
        })
            .catch(function (error) {
                console.log("No se pudo editar el usuario");
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <h1>EXAMEN REACT</h1>
            <Input userData={userData} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Nombre'
                        required
                    />
                </label>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='nombre@gmail.com'
                        required
                    />
                </label>
                <button type="submit">Enviar</button>
                <button onClick={handleEdit}>Actualizar</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th><b>Nombre:</b></th>
                        <th><b>Email:</b></th>
                        <th><b>Acciones:</b></th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Editar</button>
                                <p></p>
                                <button onClick={() => handleDelete(user.id)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
