"use client";
import { useResponse } from "@/hook/useResponse";
import { Message } from "@/types/type";
import { useState } from "react";

export default function UserInput() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { loading, handleResponse} = useResponse();

  const sendMessage = async () => {
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");

    const assistantMessage = await handleResponse(newMessages);

    setMessages([...newMessages ,
      {role:"assistant" , content:assistantMessage}
    ]);
    console.log(messages) 
  };

  // const handleSend = async () => {
  //   const newMessages: Message[] = [
  //     ...messages,
  //     { role: "user", content: input },
  //   ];
  //   setMessages(newMessages);
  //   setInput("")
  //   console.log(newMessages);
  //   const res = await fetch("/api/chat", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ messages: newMessages }),
  //   });

  //   const data = await res.json();
  //   console.log(data);

  //   setMessages([
  //     ...newMessages,
  //     { role: "assistant", content: data.data } as Message,
  //   ]);
  // };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="space-y-4 mb-4 text-black">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              m.role === "user" ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <b>{m.role}:</b>{m.content}
          </div>
        ))}
        {loading && (
          <div className="p-2 rounded bg-gray-100">
          <b>assistant:</b> 
          <div className="flex items-center gap-2 ml-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-sm text-gray-500">Thinking...</span>
          </div>
        </div>
)}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
