import { AiResponseProps, Message } from "@/types/type";
import { motion, AnimatePresence } from "framer-motion";
import { BotMessageSquare } from "lucide-react";

export default function GetResponse({
  message,
  role,
  isAssistant,
  loading,
}: AiResponseProps) {
  console.log(message)
  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(20px)" }}
      animate={{ opacity:1 , y: 0, filter: "blur(0px)" }}
      transition={{ 
        duration:0.3, 
        ease: "easeInOut",
        delay:1.8
      }}
    className="max-w-4xl w-full mx-auto flex flex-col gap-3 items-end justify-end p-2">
      {message.map((message: Message, index) => (
        <div
          key={index}
          className="bg-neutral-500/10 border flex border-dashed w-fit max-w-2xl rounded-md py-4 px-4 h-full"
        >
          <b>{message.role == "user" ? "Me :" : <BotMessageSquare />}</b>
          <p className=" w-fit text-right px-3">{message.content}</p>
        </div>
      ))}
      {loading && ( 
        <div className="bg-neutral-500/10 border border-dashed w-fit flex gap-2 max-w-2xl rounded-md py-4 px-4 h-full text-right">
          <b><BotMessageSquare className="" /></b>
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
    </motion.div>
    </AnimatePresence>
  );
}
