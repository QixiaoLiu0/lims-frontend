"use client";
import { Loader2, Send, ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { aiService } from "@/services/aiService";

// random title
const GREETING_TITLES = [
  "Any new ideas to explore?",
  "What system shall we optimize today?",
  "How can I help you analyze the lab data?",
  "Ready to track some test results?",
  "What's on your mind?",
];

export default function ChatBox() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // stores the result from aiService
  const [chatData, setChatData] = useState({ message: "", results: null });
  // Rendered text for typewriter effect
  const [displayedText, setDisplayedText] = useState("");

  // Randomly select the title when mounting the client.
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * GREETING_TITLES.length);
    setTitle(GREETING_TITLES[randomIndex]);
  }, []);

  // Typewriter Effect Logic
  useEffect(() => {
    if (!chatData.message && !chatData.results) return;

    let fullText = chatData.message || "";
    if (chatData.results && chatData.results.length > 0) {
      fullText += `\n\nResults Details: \n${JSON.stringify(chatData.results, null, 2)}`;
    }

    let currentIndex = 0;
    setDisplayedText("");
    let timerId = null;

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;

        const randomDelay = Math.floor(Math.random() * (100 - 50 + 1)) + 20;
        timerId = setTimeout(typeNextChar, randomDelay);
      }
    };

    typeNextChar();

    // clear function
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [chatData]);

  // send prompt
  const handleSend = async e => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setChatData({ message: "", results: null });
    setDisplayedText("");

    try {
      const res = await aiService.sendChatMessage({ prompt });

      // extract message & results
      setChatData({
        message: res?.message || "",
        results: res?.results || null,
      });
    } catch (error) {
      console.error("AI Request Failed:", error);
      setChatData({
        message: "Network error, please try again.",
        results: null,
      });
    } finally {
      setIsLoading(false);
      setPrompt(""); // clear input box
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3f7fe] to-white dark:from-gray-900 dark:to-gray-800 relative flex flex-col items-center pt-32 px-4 font-sans">
      {/* 1. return Dashboard btn */}
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-lg shadow-sm hover:shadow"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Dashboard
      </button>

      {/* 2. random title */}
      <h1 className="text-4xl md:text-2xl text-gray-800 dark:text-gray-200 mb-10 transition-opacity duration-500">
        {title || "..."}
      </h1>

      {/* 3. input box */}
      <form onSubmit={handleSend} className="w-full max-w-3xl relative group">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full px-6 py-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-600 transition-all duration-300 group-focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-focus-within:border-blue-200group-focus-within:-translate-y-1">
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="Ask AI..."
            className="flex-1 bg-transparent outline-none text-gray-700 dark:text-white text-lg placeholder:text-gray-400 disabled:bg-transparent"
          />

          {/* send btn & loading animate */}
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="text-gray-100 bg-blue-600 rounded-4xl px-4 py-2 dark:bg-blue-600 dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500 enabled:cursor-pointer disabled:cursor-not-allowed dark:disabled:opacity-60 
            disabled:hover:text-gray-300 transition-colors ml-4"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-6 w-6" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
      </form>

      {/* 4. Return value display area (typewriter effect output) */}
      {displayedText && (
        <div className="w-full max-w-3xl mt-12 p-8 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-left">
          <pre className="font-sans whitespace-pre-wrap">
            {displayedText}
            {/* The blinking cursor of a simulated typewriter */}
            {displayedText.length <
              chatData.message.length +
                (chatData.results
                  ? JSON.stringify(chatData.results, null, 2).length
                  : 0) && (
              <span className="inline-block w-2 h-5 bg-blue-500 dark:bg-blue-500 ml-1 animate-pulse align-middle"></span>
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
