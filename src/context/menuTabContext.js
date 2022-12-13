import React, { createContext, useState, useMemo } from 'react'
import { isClient } from 'lib/utilities/is'
import { TV_TAB } from 'src/components/layout/constant'

export const MenuTabContext = createContext()

const MenuTabProvider = ({ children }) => {
  const localTab = useMemo(() => {
    const tab = isClient ? JSON.parse(localStorage.getItem('menuTab')) || TV_TAB : TV_TAB

    if (isClient) {
      localStorage.setItem('menuTab', tab)
    }

    return tab
  }, [])


  const [ menuTab, setMenuTab ] = useState(Number(localTab))

  const authData = {
    menuTab,
    setMenuTab,
  }

  return (
    <MenuTabContext.Provider value={ authData }>
      { children }
    </MenuTabContext.Provider>
  )
}

export default MenuTabProvider
