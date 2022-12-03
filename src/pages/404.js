import * as React from 'react'
import { Link } from 'gatsby'

const pageStyles = {
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  padding: 4,
  fontSize: '1.25rem',
  borderRadius: 4,
}

const NotFoundPage = () => (
  <main style={ pageStyles } className='xl:ml-1/6 text-white'>
    <h1 style={ headingStyles }>You are lost!</h1>
    <p style={ paragraphStyles }>
      Sorry 😔, we couldn’t find what you were looking for.
      <br />
      { process.env.NODE_ENV === 'development' ? (
        <>
          <br />
          Try creating a page in <code style={ codeStyles }>src/pages/</code>.
          <br />
        </>
      ) : null }
      <br />
      <Link to='/'>Go to Homepage</Link>.
    </p>
  </main>
)

export default NotFoundPage

export const Head = () => <title>Not found</title>
