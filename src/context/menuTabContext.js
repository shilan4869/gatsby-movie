import React, { createContext, useState, useEffect } from 'react'
import { TV_TAB } from 'src/components/layout/constant'

export const MenuTabContext = createContext()

const MenuTabProvider = ({ children }) => {
  const [ menuTab, setMenuTab ] = useState(NaN)

  /** synchronize the menu with previous user session */
  useEffect(() => {
    const localTab = localStorage.getItem('menuTab')

    if (localTab) {
      setMenuTab(Number(localTab))
    } else {
      localStorage.setItem('menuTab', TV_TAB)
      setMenuTab(Number(TV_TAB))
    }
  }, [])

  const data = {
    menuTab,
    setMenuTab,
  }

  return (
    <MenuTabContext.Provider value={ data }>
      { children }
    </MenuTabContext.Provider>
  )
}

export default MenuTabProvider
