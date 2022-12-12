window.dataLayer = window.dataLayer || []

window.dataLayer.push = function (argument) {
  if (this.done) {
    return
  }

  if (argument && argument.event === 'gtm.dom') {
    this.done = true
  }

  Array.prototype.push.apply(this, arguments)
}

function gtag() {
  window.dataLayer.push(arguments)
}

gtag('js', new Date())
gtag({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
