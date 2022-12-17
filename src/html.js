import favicon from 'static/favicon.png'
import webmanifest from 'static/site.webmanifest'
import appleTouchIcon from 'static/apple-touch-icon.png'
import safariPinnedTab from 'static/safari-pinned-tab.svg'
import gtag from 'static/gtag'
import fbq from 'static/fbq'
import error from 'static/error'

/* eslint-disable react/no-danger */

const Html = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}) => (
  <html lang='vi-VN' { ...htmlAttributes }>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' type='image/png' sizes='32x32' href={ favicon } />
      <link rel='manifest' href={ webmanifest } />
      <link rel='apple-touch-icon' sizes='180x180' href={ appleTouchIcon } />
      <link rel='mask-icon' href={ safariPinnedTab } color='#2579F2' />
      <meta name='apple-mobile-web-app-title' content='Divine Shop' />
      <script dangerouslySetInnerHTML={ { __html: gtag } } />
      <script dangerouslySetInnerHTML={ { __html: fbq } } />
      <script src='https://accounts.google.com/gsi/client async defer' />
      { headComponents }
    </head>
    <body { ...bodyAttributes }>
      { preBodyComponents }
      <div
        key='body'
        id='___gatsby'
        dangerouslySetInnerHTML={ { __html: body } }
      />
      <div key='popup' id='__popup' />
      { /* <a id='fb-messenger' target='_blank' rel='noreferrer'>
        <img
          title='Messenger'
          className='fixed right-6 bottom-6 cursor-wait rounded-full'
          loading='lazy'
        />
      </a>
      <div id='fb-root' />
      <div
        id='fb-customer-chat'
        className='fb-customerchat'
        attribution='biz_inbox'
      />
      <div key='dialog' id='__dialog' /> */ }
      <div
        key='alerter'
        id='__alerter'
        className='boundary fixed right-0 bottom-6 flex flex-col items-end space-y-3 z-10'
      />
      { postBodyComponents }
      <script dangerouslySetInnerHTML={ { __html: error } } />
    </body>
  </html>
)

export default Html
