import React, { useState } from 'react';
import './Chat.css';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);

    const response = `Respuesta simulada a: "${input}"`;
    setMessages([...messages, { role: 'user', content: input }, { role: 'ai', content: response }]);

    setInput('');
  };

  return (
    <div className="chat-container">
      <h2>Habla con la IA</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'Tú' : 'IA'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Chat;