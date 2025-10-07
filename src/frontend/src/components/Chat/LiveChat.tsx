import React, { useEffect, useState, useRef } from 'react';
import { Send, X, User, MessageSquare } from 'lucide-react';
export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{
    id: 1,
    sender: 'system',
    text: 'Welcome to NourishNet live chat! How can we help you today?',
    timestamp: new Date()
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSendMessage = e => {
    e.preventDefault();
    if (!message.trim()) return;
    // Add user message
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    // Simulate response typing
    setIsTyping(true);
    // Simulate response after delay
    setTimeout(() => {
      const responses = ['Thank you for reaching out! A local donor representative will be with you shortly.', "I understand you're looking for local support. Could you provide more details about your needs?", 'We have several donors in your area ready to help. What specific assistance are you looking for?', 'Our community volunteers are active in most neighborhoods. When would be a good time to connect you with someone nearby?', 'We can arrange a meeting with local donors who can provide immediate assistance. Would that be helpful?'];
      const responseMessage = {
        id: Date.now() + 1,
        sender: 'support',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setIsTyping(false);
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };
  const formatTime = date => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <>
      {/* Chat bubble button */}
      <button className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-40 transition-all ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-600 hover:bg-teal-700'}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} className="text-white" /> : <MessageSquare size={24} className="text-white" />}
      </button>
      {/* Chat window */}
      <div className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-40 transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        {/* Chat header */}
        <div className="bg-teal-600 text-white p-4">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-full mr-3">
              <User size={20} className="text-teal-600" />
            </div>
            <div>
              <h3 className="font-medium">NourishNet Support</h3>
              <p className="text-xs text-teal-100">
                {isTyping ? 'Typing...' : 'Online'}
              </p>
            </div>
          </div>
        </div>
        {/* Chat messages */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.map(msg => <div key={msg.id} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${msg.sender === 'user' ? 'bg-teal-600 text-white' : msg.sender === 'system' ? 'bg-gray-200 text-gray-700' : 'bg-blue-100 text-gray-800'}`}>
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-teal-100' : 'text-gray-500'}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>)}
          {isTyping && <div className="flex justify-start mb-4">
              <div className="bg-gray-200 rounded-lg p-3 max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{
                animationDelay: '0ms'
              }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{
                animationDelay: '150ms'
              }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{
                animationDelay: '300ms'
              }}></div>
                </div>
              </div>
            </div>}
          <div ref={messagesEndRef} />
        </div>
        {/* Chat input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex">
          <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition-colors">
            <Send size={18} />
          </button>
        </form>
      </div>
    </>;
}