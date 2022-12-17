import React, { createContext, useState, useCallback, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { TV_TAB, BROWSE_TAB, MOVIES_TAB, FAVORITE_TAB, HISTORY_TAB } from 'src/components/layout/constant'

export const MenuTabContext = createContext()

const MenuTabProvider = ({ children }) => {
  const [ menuTab, setMenuTab ] = useState(NaN)
  const location = useLocation()

  const synchronize = useCallback(() => {
    const path = location.pathname
    let currentTab

    if (path === '/' || path.startsWith('/search')) {
      const tab = Number(localStorage.getItem('menuTab')) || TV_TAB

      if (!localStorage.getItem('menuTab')) {
        localStorage.setItem('menuTab', tab)
      }

      setMenuTab(tab)

      return currentTab
    }

    const routes = [
      {
        route: '/watch/tv',
        tab: TV_TAB,
      },
      {
        route: '/watch/movie',
        tab: MOVIES_TAB,
      },
      {
        route: '/favorite',
        tab: FAVORITE_TAB,
      },
      {
        route: '/history',
        tab: HISTORY_TAB,
      },
      {
        route: '/browse',
        tab: BROWSE_TAB,
      },
    ]

    for (const { route, tab } of routes) {
      if (path.startsWith(route)) {
        if (tab === TV_TAB || tab === MOVIES_TAB) {
          localStorage.setItem('menuTab', tab)
        }

        setMenuTab(tab)
        break
      }
    }
  }, [ location ])

  useEffect(() => {
    synchronize()
  }, [ synchronize ])

  const data = {
    menuTab,
    synchronize,
  }

  return (
    <MenuTabContext.Provider value={ data }>
      { children }
    </MenuTabContext.Provider>
  )
}

export default MenuTabProvider
