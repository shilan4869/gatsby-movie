import React, { createContext, useState } from 'react'

export const MenuTabContext = createContext()

const MenuTabProvider = ({ children }) => {
  const [ menuTab, setMenuTab ] = useState(NaN)

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
