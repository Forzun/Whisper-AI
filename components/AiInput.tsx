"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Paperclip, Plus, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/ textara";
import GetResponse from "./getResponse";
import { Message } from "@/types/type";

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

const MIN_HEIGHT = 48;
const MAX_HEIGHT = 164;

const AnimatedPlaceholder = ({ showSearch }: { showSearch: boolean }) => (
  <AnimatePresence mode="wait">
    <motion.p
      key={showSearch ? "search" : "ask"}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.1 }}
      className="pointer-events-none w-[150px] text-sm absolute text-black/70 dark:text-white/70"
    >
      {showSearch ? "Not available yet" : "Ask Skiper Ai..."}
    </motion.p>
  </AnimatePresence>
);

export default function AiInput() {
  const [value, setValue] = useState("");
  const [bottom, setBottom] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
  });
  const [showSearch, setShowSearch] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handelClose = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
    setImagePreview(null); // Use null instead of empty string
  };

  const handelChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const [message, setMessage] = useState<Message[]>([]);

  const handleSubmit = () => {
    const newMessage: Message[] = [...message, { content: value }];
    setMessage(newMessage);
    setValue("");
    adjustHeight(true);
    setBottom(true);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  return (
    <div className="w-full overflow-hidden h-[90vh]">
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          layout: { delay: bottom ? 0.2 : 0 }, // Add delay only for layout changes
        }}
        layout
        style={{ justifyContent: bottom ? "end" : "flex-start" }}
        className={`flex flex-col h-full md:pt-20 pt-10 border border-dashed`}
      >
        <div className=" overflow-y-auto no-scrollbar flex flex-col-reverse px-4">
          <GetResponse message={message} />
        </div>
        <div
          className={`relative max-w-4xl border rounded-[22px] w-full border-black/5 p-1 mx-auto`}
        >
          <div className="relative rounded-2xl border border-black/5 bg-neutral-800/5 flex flex-col">
            <div
              className="overflow-y-auto"
              style={{ maxHeight: `${MAX_HEIGHT}px` }}
            >
              <div className="relative">
                <Textarea
                  id="ai-input-04"
                  value={value}
                  placeholder=""
                  className="w-full rounded-2xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white resize-none focus-visible:ring-0 leading-[1.2]"
                  ref={textareaRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  onChange={(e) => {
                    setValue(e.target.value);
                    adjustHeight();
                  }}
                />
                {!value && (
                  <div className="absolute left-4 top-3">
                    <AnimatedPlaceholder showSearch={showSearch} />
                  </div>
                )}
              </div>
            </div>

            <div className="h-12 bg-black/5 dark:bg-white/5 rounded-b-xl">
              <div className="absolute left-3 bottom-3 flex items-center gap-2">
                <label
                  className={cn(
                    "cursor-pointer relative rounded-full p-2 bg-black/5 dark:bg-white/5",
                    imagePreview
                      ? "bg-[#ff3f17]/15 border border-[#ff3f17] text-[#ff3f17]"
                      : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                  )}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handelChange}
                    className="hidden"
                  />
                  <Paperclip
                    className={cn(
                      "w-4 h-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors",
                      imagePreview && "text-[#ff3f17]"
                    )}
                  />
                  {imagePreview && (
                    <div className="absolute w-[100px] h-[100px] top-14 -left-4">
                      <Image
                        className="object-cover rounded-2xl"
                        src={imagePreview || "/picture1.jpeg"}
                        height={500}
                        width={500}
                        alt="additional image"
                      />
                      <button
                        onClick={handelClose}
                        className="bg-[#e8e8e8] text-[#464646] absolute -top-1 -left-1 shadow-3xl rounded-full rotate-45"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(!showSearch);
                  }}
                  className={cn(
                    "rounded-full transition-all flex items-center gap-2 px-1.5 py-1 border h-8",
                    showSearch
                      ? "bg-neutral-800/10 border-dashed text-neutral-100"
                      : "bg-black/5 dark:bg-white/5 border-transparent text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                  )}
                >
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <motion.div
                      animate={{
                        rotate: showSearch ? 180 : 0,
                        scale: showSearch ? 1.1 : 1,
                      }}
                      whileHover={{
                        rotate: showSearch ? 180 : 15,
                        scale: 1.1,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 25,
                      }}
                    >
                      <Globe
                        className={cn(
                          "w-4 h-4",
                          showSearch ? "text-neutral-500" : "text-inherit"
                        )}
                      />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {showSearch && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                          width: "auto",
                          opacity: 1,
                        }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm overflow-hidden whitespace-nowrap text-neutral-100 flex-shrink-0"
                      >
                        Search
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              <div className="absolute right-3 bottom-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={cn(
                    "rounded-full border border-dashed  p-2 transition-colors",
                    value
                      ? "bg-neutral-100/10 text-neutral-100"
                      : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
