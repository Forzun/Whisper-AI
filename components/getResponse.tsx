import { AiResponseProps, Message } from "@/types/type";

export default function GetResponse({
  message,
  role,
  isAssistant,
  loading,
}: AiResponseProps) {
  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col gap-3 items-end justify-end p-2">
      {message.map((message: Message, index) => (
        <div
          key={index}
          className="bg-neutral-500/10 border border-dashed w-fit max-w-2xl rounded-md py-4 px-4 h-full text-right"
        >
          {message.content}
        </div>
      ))}
    </div>
  );
}
