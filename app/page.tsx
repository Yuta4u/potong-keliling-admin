"use client"

import { useEffect, useState } from "react"
import { Switch } from "@chakra-ui/react"

export default function Home() {
  const [isChecked, setIsChecked]: any = useState([])

  useEffect(() => {
    const getJam = async () => {
      const res = await fetch("https://potong-keliling-api.vercel.app/v1/jam")
      const jam = await res.json()
      const jamAktif = jam.data
        .filter((e: any) => e.aktif)
        ?.map((e: any) => e.jam)
      setIsChecked(jamAktif)
    }
    if (isChecked.length === 0) {
      getJam()
    }
  }, [])
  const jam = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ]

  const handleIsAvaible = (jam: string, avaible: any[]): boolean => {
    return avaible?.includes(jam)
  }

  const postData = async (data: any) => {
    const response = await fetch(
      "https://potong-keliling-api.vercel.app/v1/updateJam",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const res = await response.json()
    console.log(res, "ini res")
  }

  function showAlert(e: any) {
    const checked = isChecked?.includes(e)
    if (checked) {
      const res = window.confirm(`Nonaktifkan untuk jam ${e}`)
      if (res) {
        setIsChecked(isChecked.filter((jam: string) => jam !== e))
        postData({ jam: e, aktif: 0 })
        alert("Berhasil nonaktifkan jam " + e)
      }
    } else {
      const res = window.confirm(`Aktifkan untuk jam ${e}`)
      if (res) {
        setIsChecked([...isChecked, e])
        postData({ jam: e, aktif: 1 })
        alert("Berhasil aktikan jam " + e)
      }
    }
  }

  return (
    <main className="bg-slate-50" style={{ height: "100vh" }}>
      {isChecked.length > 0 && (
        <div className="flex  h-full justify-center text-center items-center">
          <div className="w-3/5 h-3/4  flex flex-col justify-between">
            {jam.map((e) => (
              <div className="flex justify-between" key={e}>
                {e}
                <Switch
                  onChange={() => showAlert(e)}
                  isChecked={handleIsAvaible(e, isChecked)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
