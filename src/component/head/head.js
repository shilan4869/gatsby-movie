import React from 'react'
import { SEO as Seo } from './seo'

const Head = ({ title, description, pathname, children }) => (
  <Seo title={ title } description={ description } pathname={ pathname }>
    <script src='https://accounts.google.com/gsi/client' async defer />
    { children }
  </Seo>
)

export default Head
