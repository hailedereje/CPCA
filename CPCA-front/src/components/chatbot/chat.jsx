import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import chatBotImage from "@/assets/chatbot.jpg";
import userAvatar from "@/assets/userAvatar.jpg"; // Add the path to the user avatar image
import { chatKn } from './constants';
import { IoMdClose, IoMdSend } from 'react-icons/io';
import { FaComments } from 'react-icons/fa';

const API_KEY = import.meta.env.VITE_API_KEY;
export const MyChatBot = () => {
  const genAI = new GoogleGenerativeAI(`${API_KEY}`);
  const [inputText, setInputText] = useState('');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([{ text: "hey there! I'm a chatbot. Ask me anything!", type: 'bot'}]);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  async function run(inputText) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: chatKn }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
  
    const msg = inputText;

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    return text
  }

  useEffect(() => {
    if (prompt) {
      // setLoading(true);
      const fetchResponse = async () => {
        const result = await run(prompt);
        const responseMessage = { text: result, type: 'bot' };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
        scrollToBottom();
      };
      fetchResponse();
      // setLoading(false);
    }
  }, [prompt]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      const userMessage = { text: inputText, type: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setPrompt(inputText);
      setInputText('');
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="fixed bottom-4 left-4">
      {!showChat &&<button
      onClick={toggleChat}
      className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg focus:outline-none flex items-center space-x-2 fixed bottom-4 left-4"
    >
      <FaComments className="w-6 h-6" /> {/* Add the message icon */}
      <span>Chat</span>
    </button>}
      {showChat && (
        <div className="w-[400px] max-w-md  h-[90vh] mx-auto mt-5 border rounded-lg shadow-lg bg-white flex flex-col">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-lg font-semibold">CPCA Chatbot</h2>
            <button onClick={toggleChat} className="text-white">
              <IoMdClose className='text-xl' />
            </button>
          </div>
          <div className="h-full overflow-y-auto p-4" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 mb-2 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <img
                    src={chatBotImage} // Bot avatar URL
                    alt="Bot Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`px-2  rounded-md ${
                    message.type === 'user'
                      ? ' text-black bg-gray-100 self-end'
                      : ' text-black-400 self-start bg-gray-100'
                  }`}
                >
                  <span className='text-sm'>{message.text}</span>
                  {/* {loading && message.type === 'bot' && <div className='loader'/>} */}
                </div>
                {message.type === 'user' && (
                  <img
                    src={userAvatar} // User avatar URL
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
            ))}
            {messages.length === 0 && (
                <div className='w-full h-full flex items-center justify-center'>
                    <span className='text-xl font-bold  text-blue-500'>start chatting</span>
                </div>
            )}
          </div>
          <form className="flex p-2 relative" onSubmit={handleSendMessage}>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              type="text"
              className="pe-6 text-sm flex-grow px-4 py-2 border-2 border-blue-400 rounded-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Type a message..."
            />
            <button
              type='submit'
              className="absolute inset-y-0 right-4"
            >
              <IoMdSend className='text-blue-400 text-xl' />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyChatBot;
