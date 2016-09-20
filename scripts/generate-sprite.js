const fs = require('fs')
const path = require('path')

const svgs = path.join(__dirname, '..', 'assets', 'icons')
const destination = path.join(__dirname, '..', 'assets', 'sprite', 'icons.js')

const spritePath = path.join(__dirname, '..', 'assets', 'sprite', 'svg', 'sprite.svg')
const sprite = fs.readFileSync(spritePath).toString()

const spriteContent = `module.exports =  \`${sprite}\`; // eslint-disable-line`
const spriteJsDestination = path.join(__dirname, '..', 'src', 'Icon', 'sprite.js')

fs.writeFile(spriteJsDestination, spriteContent, (error) => {
  if (error) throw error
  console.log('Sprite generated.') // eslint-disable-line no-console
})

const stripExtension = (icon) => icon.replace('.svg', '')

const icons = fs.readdirSync(svgs)
  .filter((file) => file !== '.DS_Store')
  .reduce((acc, icon) => Object.assign(acc, { [stripExtension(icon)]: { file: icon } }), {})

const getContent = (json) =>
  `module.exports = ${JSON.stringify(json, null, 2)}`

const handleCompletion = (error) => {
  if (error) throw error
}

fs.writeFile(destination, getContent(icons), handleCompletion)
