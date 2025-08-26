"use client";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const handleSendMessage = async (innerHtml: string, textContent: string, innerText: string, nodes: NodeList) => {
    const userMessage: MessageModel = {
      message: textContent,
      sentTime: new Date().toLocaleTimeString(),
      sender: "me",
      direction: "outgoing",
      position: "last",
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);

    try {
      // Call the API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: innerText }),
      });

      if (response.ok) {
        const botResponse = await response.json();
        setMessages(prev => [...prev, botResponse]);
      } else {
        // Handle error
        const errorMessage: MessageModel = {
          message: "Sorry, I couldn't process your message.",
          sentTime: new Date().toLocaleTimeString(),
          sender: "Bot",
          direction: "incoming",
          position: "last",
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: MessageModel = {
        message: "Sorry, there was an error processing your message.",
        sentTime: new Date().toLocaleTimeString(),
        sender: "Bot",
        direction: "incoming",
        position: "last",
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((message, index) => (
              <Message key={index} model={message} />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={handleSendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}