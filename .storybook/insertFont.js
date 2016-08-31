const insertFont = () => {
  window.WebFontConfig = {
    google: { families: ['Open+Sans:400,300,600,700:latin'] },
  }
  const wf = document.createElement('script')
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'
  wf.type = 'text/javascript'
  wf.async = 'true'
  const s = global.document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(wf, s)
}

export default insertFont
