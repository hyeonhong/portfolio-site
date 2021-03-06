import { useContext, useState } from 'react'
import LangContext from 'utils/context/LangContext'

export function LangProvider({ children }) {
  const [lang, setLang] = useState('kr')

  function switchLang(selected) {
    setLang(selected)
  }

  return <LangContext.Provider value={{ lang, switchLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
