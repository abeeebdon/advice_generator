'use client'
import { error } from 'console'
import Image from 'next/image'
import { useEffect, useState } from 'react'
interface Advice {
  id: number
  advice: string
}
export default function Home() {
  const [index, setIndex] = useState(1)
  const [advice, setAdvice] = useState<Advice>({} as Advice)
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  })
  const fetchData = async () => {
    setStatus((prev) => ({ ...prev, loading: true }))
    try {
      const response = await fetch(`https://api.adviceslip.com/advice/${index}`)
      const resp = await response.json()
      if (response.status == 200) {
        const advice = await resp.slip

        setAdvice(advice)
        setStatus((prev) => ({ ...prev, loading: false, success: true }))
      }
    } catch (err) {
      // return err
      setStatus((prev) => ({ ...prev, loading: false, error: true }))
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const getNextAdvice = () => {
    setIndex((prev) => prev + 1)
    fetchData()
  }
  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-blue-dark">
      <section className="relative flex flex-col gap-4 items-center shadow rounded-lg p-4 bg-blue-darkg pt-10 pb-14">
        <p>Advice # {advice.id}</p>
        <p className="w-full max-w-[300px]">
          {status.loading
            ? 'Loading ... '
            : status.error
            ? 'There is an error'
            : `"${advice.advice}"`}
        </p>
        <div>
          <Image
            src="/images/pattern-divider-mobile.svg"
            alt=""
            width={300}
            className="sm:hidden"
            height={300}
          />
          <Image
            src="/images/pattern-divider-desktop.svg"
            alt=""
            width={300}
            className="sm:block hidden"
            height={300}
          />
        </div>
        <div
          onClick={getNextAdvice}
          className="absolute -bottom-10 bg-secondary cursor-pointer hover:shadow-lg w-fit p-4 rounded-full"
        >
          <Image
            src="/images/icon-dice.svg"
            alt=""
            width={40}
            className="sm:block hidden"
            height={40}
          />
        </div>
      </section>
    </main>
  )
}
