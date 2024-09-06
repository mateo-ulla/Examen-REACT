import React, { useEffect, useState } from 'react';

function Input({ userData }) {
    const [text, setText] = useState("");

    const filteredUsers = userData.filter((user) => user.name.toLowerCase().startsWith(text.toLowerCase()))

    const handleChange = (e) => {
        setText(e.target.value);
    }

  return (
    <div>
        <input type="text" onChange={handleChange} placeholder='Buscar' />
        <ul>
            {filteredUsers.map((user, index) => <li key={index}>{user.name}</li>)}
        </ul>
    </div>
  )
}

export default Input;