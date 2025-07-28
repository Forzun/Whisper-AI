"use client";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function UserInput() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([])

  const handleSend = async () => {
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("")
    console.log(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    console.log(data);

    setMessages([
      ...newMessages,
      { role: "assistant", content: data.data } as Message,
    ]);
  };

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
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
