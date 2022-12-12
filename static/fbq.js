function fbq() {
  if (fbq.callMethod) {
    fbq.callMethod.apply(fbq, arguments)
  } else {
    fbq.queue.push(arguments)
  }
}

fbq.push = fbq
fbq.loaded = !0
fbq.version = '2.0'
fbq.queue = []

window._fbq = fbq
