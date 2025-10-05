import { useState, useRef, useEffect } from 'react';
import './AIChatBox.css';
import api from '#utils/api.js';

const ChatBox = ({ nodes = [], edges = [] }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Xin chào! Tôi có thể giúp bạn cải thiện roadmap. Hỏi tôi về cách thêm node, sắp xếp layout hoặc tối ưu roadmap nhé!", 
      type: 'ai' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // FIXED: Proper async function without setTimeout antipattern
  const getAIResponse = async (message) => {
    try {
      const lowerMessage = message.toLowerCase();
      const AIResponse = await api.post('/gemini/generate-roadmap', 
        { text: lowerMessage }, 
        { withCredentials: true }
      );
      //console.log('AI Response:', AIResponse);
      return AIResponse?.data?.response || "Xin lỗi, tôi không thể xử lý yêu cầu này.";
    } catch (error) {
      console.error('API Error:', error);
      return "Đã có lỗi xảy ra khi xử lý yêu cầu của bạn.";
    }
  };

  // FIXED: Removed setTimeout antipattern, proper async/await handling
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // FIXED: Proper await without setTimeout
      const aiResponseText = await getAIResponse(inputMessage);

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        type: 'ai'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        type: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="chat-toggle" onClick={() => setIsOpen(true)}>
        💬 AI Assistant
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span>🤖 AI Roadmap Assistant</span>
        <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-content">
              {message?.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai">
            <div className="message-content">
              <div className="typing">AI đang suy nghĩ...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Hỏi AI về roadmap..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSendMessage} 
          disabled={!inputMessage.trim() || isLoading}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox;