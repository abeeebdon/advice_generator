"use client";
import { BsMoonStars } from "react-icons/bs";
import { CiDark } from "react-icons/ci";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "./useTheme";
import { FaPause, FaPlay } from "react-icons/fa";
interface Advice {
  id: number;
  advice: string;
}
export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [play, setPlay] = useState(false);
  const [index, setIndex] = useState(1);
  const [advice, setAdvice] = useState<Advice>({} as Advice);
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const fetchData = async () => {
    setStatus((prev) => ({ ...prev, loading: true }));
    setPlay(false);
    try {
      const response = await fetch(
        `https://api.adviceslip.com/advice/${index}`
      );
      const resp = await response.json();
      if (response.status == 200) {
        const advice = await resp.slip;

        setAdvice(advice);
        setPlay(true);
        setStatus((prev) => ({ ...prev, loading: false, success: true }));
      }
    } catch (err) {
      // return err
      setStatus((prev) => ({ ...prev, loading: false, error: true }));
    }
  };
  useEffect(() => {
    fetchData();
  }, [index]);

  useEffect(() => {
    const textToSpeech = (text: string) => {
      if (!window.speechSynthesis) {
        console.error("Speech Synthesis not supported in this browser.");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // Set language
      utterance.rate = 1; // Set speed (1 is normal)
      utterance.pitch = 1; // Set pitch (1 is default)
      utterance.onend = () => setPlay(false);
      window.speechSynthesis.speak(utterance);
    };
    if (advice.advice && play) {
      textToSpeech(advice.advice);
    }
  }, [play]);
  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-gray-400 dark:bg-blue-dark dark:text-foreground">
      <section className="relative flex flex-col gap-4 items-center shadow w-full max-w-md bg-slate-400 dark:bg-blue-darkg rounded-lg p-4 pt-10 pb-14">
        <div className="w-full flex justify-between px-4">
          <h2 className="text-secondary font-bold text-lg ">
            Advice Generator
          </h2>
          <div className="w-fit p-1 cursor-pointer border rounded-md dark:border-slate-600 ">
            <CiDark
              onClick={toggleTheme}
              size={24}
              color={theme == "light" ? "black" : "white"}
            />
          </div>
        </div>
        <p className="text-secondary uppercase ">Advice # {advice?.id}</p>
        <p className="w-full flex justify-center items-center h-[40px] text-center px-2">
          {status.loading
            ? "Loading ... "
            : status.error
            ? "There is an error"
            : `"${advice.advice}"`}
        </p>
        <div className="w-full flex items-center justify-center gap-4">
          <hr className="basis-1/3" />
          <div
            className=" cursor-pointer text-xl"
            onClick={() => setPlay(!play)}
          >
            {play ? <FaPause /> : <FaPlay />}
          </div>

          <hr className="basis-1/3" />
        </div>
        <div
          onClick={() => setIndex((prev) => prev + 1)}
          className="advice-button bg-secondary"
        >
          <Image src="/images/icon-dice.svg" alt="" width={30} height={30} />
        </div>
      </section>
    </main>
  );
}
