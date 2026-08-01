import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User, MessageCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "owner",
      text: "Hi there! I'm Neha, the owner of Neha Garments. 🌸 Feel free to ask me anything about our collections, sizing, shipping, or returns!",
      time: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Listen to global "open-chat" events for cross-component triggers
  useEffect(() => {
    const handleOpenChat = (e) => {
      setIsOpen(true);
      if (e.detail && e.detail.message) {
        // Send message from customer
        const userMsg = e.detail.message;
        sendMessage(userMsg);
      }
    };
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  const getOwnerReply = (userText) => {
    const text = userText.toLowerCase();

    // Contextual Product Details
    if (text.includes("product:") || text.includes("tell me about")) {
      const productName = userText.replace(/product:/i, "").replace(/tell me about/i, "").trim();
      return `Ah, the "${productName}" is one of our handpicked favorites! ✨ It is currently in stock and has excellent reviews for fabric quality and fit. Would you like assistance with choosing the right size?`;
    }

    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
      return "Hello! Hope you are having a wonderful day. How can I help you find your perfect outfit today? 💖";
    }
    if (text.includes("shipping") || text.includes("delivery") || text.includes("deliver")) {
      return "We offer FREE standard shipping across India on all orders over ₹50! Deliveries usually take 3 to 5 business days. We will email you a tracking link as soon as your parcel ships. 📦";
    }
    if (text.includes("return") || text.includes("refund") || text.includes("exchange")) {
      return "No worries! We offer a 15-day hassle-free return and exchange policy on all unworn items with tags intact. If something doesn't fit, we'll gladly swap it or refund you. 🔄";
    }
    if (text.includes("size") || text.includes("fit") || text.includes("measurement")) {
      return "Our garments fit true to size. You can see the Size Chart on any product details page. If you need custom tailoring for kurtis or dresses, let me know your measurements (bust, waist, hip) and we can customize it for you! 📏";
    }
    if (text.includes("custom") || text.includes("tailor") || text.includes("design")) {
      return "Yes! We specialize in custom fits. You can send us your specific measurements right here or reach out via WhatsApp at +91 98765 43210 to discuss custom styles. 🧵";
    }
    if (text.includes("discount") || text.includes("coupon") || text.includes("sale") || text.includes("promo")) {
      return "Exciting news! You can use the code GLAM50 at checkout to get an extra discount on our trending items. Let me know if you run into any issues applying it! 🏷️";
    }
    if (text.includes("whatsapp") || text.includes("phone") || text.includes("call") || text.includes("contact")) {
      return "You can reach my direct WhatsApp at +91 98765 43210 or email me at neha@nehagarments.com. I'm always online to chat! 📞";
    }

    // Default Fallback
    return "Thanks for reaching out! I've received your query and will reply as soon as possible. For immediate personal assistance, you can also ping me directly on WhatsApp at +91 98765 43210. 💬";
  };

  const sendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "customer",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);

    // Simulate owner typing delay
    setTimeout(() => {
      setIsTyping(false);
      const replyText = getOwnerReply(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "owner",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  // Suggestion buttons
  const suggestions = [
    "Sizing support 📏",
    "Track my order 📦",
    "Return policy 🔄",
    "WhatsApp Contact 📞",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Live Chat bubble button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center cursor-pointer shadow-lg shadow-pink-500/30 border border-white/20 relative"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {/* Glowing badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse"></span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.85 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-[320px] sm:w-[380px] h-[480px] bg-black/95 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold text-pink-400">
                    N
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-black rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Neha</h3>
                  <p className="text-[10px] text-green-400 flex items-center gap-1">
                    Store Owner • Active Online
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition p-1 hover:bg-white/5 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[75%] space-y-1">
                    <div
                      className={`p-3 rounded-2xl leading-relaxed text-sm ${
                        msg.sender === "customer"
                          ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-tr-none"
                          : "bg-white/10 text-gray-200 border border-white/5 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-gray-500 block px-1 text-right">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 bg-white/10 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions list */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none border-t border-white/5 bg-white/5">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(sug.replace(/[📏📦🔄📞]/g, "").trim())}
                  className="px-3 py-1 bg-white/10 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 text-[10px] text-gray-300 hover:text-white rounded-full transition cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Form Footer */}
            <form onSubmit={handleFormSubmit} className="p-3 border-t border-white/10 bg-black flex gap-2">
              <input
                type="text"
                placeholder="Ask Neha a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-pink-500 transition duration-300"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 rounded-xl flex items-center justify-center text-white cursor-pointer shadow-md shadow-pink-500/15"
              >
                <Send size={14} />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default ChatWidget;
