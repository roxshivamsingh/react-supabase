import { useCallback, useEffect, useState } from 'react'
import './App.css'
import supabase from "./supabase"

type TValue = { id: number, name: string }
type TCorpus = { value: TValue[], loading: boolean }
const INIT_CORPUS: TCorpus = { value: [], loading: true }
function App() {

  const [corpus, setCorpus] = useState<TCorpus>(INIT_CORPUS)
  const getCountries = useCallback(async () => {
    try {
      const { data } = await supabase.from("countries").select()
      setCorpus((prev) => ({ ...prev, value: data as TValue[] }))

    } catch {
      console.log("No rows.")
    } finally {
      setCorpus((prev) => ({ ...prev, loading: false }))
    }
  }, [])

  useEffect(() => { getCountries() }, [getCountries])

  console.log(corpus)

  return (
    <>
      Supabase
    </>
  )
}

export default App
