import { Message } from "@/types/type";
import GetResponse from "./getResponse";
import { useEffect, useState } from "react";
import { useResponse } from "@/hook/useResponse";

export default function AiResponse({ message }: any) {
  const [response, setResponse] = useState<Message[]>([]);
  const { loading, handleResponse , limit } = useResponse();

  useEffect(() => {
    if (!message || message.length === 0) return;

    const userMessage = message[message.length - 1];
    console.log(userMessage);

    setResponse((prev) => [...prev, userMessage]);

    const processMessage = async () => {
      console.log("this is how the message look like: ", message)
      const assistantMessage = await handleResponse(message);
      console.log("respnse: " , assistantMessage)

      setResponse((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    };

    processMessage();
  }, [message]);

  return <GetResponse message={response} loading={loading} limit={limit} />;
}
