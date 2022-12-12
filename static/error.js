window.addEventListener('error', error => {
  const data = JSON.stringify({
    message: error.message,
    filename: error.filename,
    lineno: error.lineno,
    colno: error.colno,
    error: JSON.stringify(error.error),
  })

  if (location.search.indexOf('debug') !== -1) {
    document.body.insertBefore(document.createTextNode(data), document.body.firstChild)
  }

  fetch('/api/report/js', {
    body: data,
    headers: { 'content-type': 'application/json', 'x-requested-with': 'error' },
    method: 'POST',
    mode: 'same-origin',
  })
})
