import React from 'react'

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  if (process.env.NODE_ENV === 'development') {
    return
  }

  const components = getHeadComponents()

  const index = components.findIndex(({ type }) => type === 'style')
  const href = components[ index ].props[ 'data-href' ]

  components.splice(index, 1, <link rel='stylesheet' href={ href } />)

  replaceHeadComponents(components)
}
