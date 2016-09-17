const copyTemplate = require('copy-template-dir')
const path = require('path')
const fs = require('fs')

const name = process.argv[2]

if (!name) {
  throw Error('Error: Must include a component name. --name=Name')
}

const pascalToDash = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

const pascalToCamel = (str) =>
  str.charAt(0).toLowerCase() + str.substring(1)

const moduleName = `${pascalToDash(name)}`
const outputDirectory = path.join(__dirname, '..', 'src', name)
const templateDirectory = path.join(__dirname, '..', 'templates', 'component')

if (fs.existsSync(outputDirectory)) {
  throw Error(`${name} already exists. Delete ${name} directory before generating this component`)
}

const templateVariables = {
  WorkfloComponent: name,
  WorkfloComponentLowerCase: name.toLowerCase(),
  WorkfloComponentHyphen: pascalToDash(name),
  WorkfloComponentCamel: pascalToCamel(name),
  moduleName,
}

copyTemplate(templateDirectory, outputDirectory, templateVariables, (err, files) => {
  if (err) throw err

  files.forEach((filePath) => {
    const newName = filePath.replace('WorkfloComponent', name)
    fs.rename(`${filePath}`, newName, (renameError) => {
      if (renameError) {
        throw renameError
      }
      console.log(`Created ${newName}`) // eslint-disable-line no-console
    })
  })
})
