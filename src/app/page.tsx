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
            onSend={(innerHtml: String, textContent: String, innerText: String, nodes: NodeList) => 
              {
                setMessages([...messages, {
                  message: textContent as string,
                  sentTime: "just now",
                  sender: "me",
                  direction: "outgoing",
                  position: "last",
                }])
              }
            }
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}