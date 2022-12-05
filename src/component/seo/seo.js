import React from 'react'
import { useSiteMetadata } from 'src/hooks/useSiteMetadata'

export const SEO = ({ title, description, pathname, children }) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${ siteUrl }${ image }`,
    url: `${ siteUrl }${ pathname || `` }`,
  }

  return (
    <>
      <title>{ seo.title }</title>
      <meta name='description' content={ seo.description } />
      <meta name='image' content={ seo.image } />
      <link rel='icon' href={ seo.image } />
      { children }
    </>
  )
}
