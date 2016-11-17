import React from 'react'
import Theme from 'js-theme'
// import Babel from '@workflo/babel-standalone'
const acorn = require('acorn/dist/acorn_loose')
import SimpleDecorator from './SimpleDecorator'
import MultiDecorator from './MultiDecorator'
import Radio from '../Radio'
import RadioGroup from '../Radio/RadioGroup'
import Popover from '../Popover'
import View from '../View'
import {
  Colors,
} from '@workflo/styles'

const keywordStrategy = (contentBlock, callback) => {
  const code = contentBlock.getText()

  try {
    const ast = acorn.parse_dammit(code)
    const declarations = ast.body
      .filter((node) => node.type === 'VariableDeclaration')
      .map((node) => ({
        start: node.start,
        end: node.start + (node.kind ? node.kind.length : 0)
      }))
    declarations.forEach((declaration) => {
      callback(declaration.start, declaration.end)
    })

  } catch (err) {
    console.error(err.message)
  }

  // try {
    // const ast = acorn.parse_dammit(code, {
    //   plugins: { jsx: true }
    // })
    // const declarations = ast.body
  //     .filter((node) => node.type === 'VariableDeclaration')
  //     .map((node) => ({
  //       start: node.start,
  //       end: node.start + (node.kind ? node.kind.length : 0)
  //     }))
  //   console.log('declarations: ', declarations)
  //   declarations.forEach((declaration) => {
  //     callback(declaration.start, declaration.end)
  //   })
  // } catch (e) {
  //   console.error('Caught exception: ', e)
  // }
}

const identifierStrategy = (contentBlock, callback) => {
  const code = contentBlock.getText()
  try {
    const ast = acorn.parse_dammit(code)
    const declarations = ast.body
      .filter((node) => node.type === 'VariableDeclaration')
      .map((node) => ({
        start: node.declarations[0].id.start,
        end: node.declarations[0].id.end
      }))
    declarations.forEach((declaration) => {
      callback(declaration.start, declaration.end)
    })
  } catch (e) {
    // console.error('Caught exception: ', e)
  }
}

const KeywordSpan = ({
  theme,
  children,
}) => (
  <span
    {...theme.keywordSpan}
  >
    {children}
  </span>
)

const IdentifierSpan = ({
  theme,
  children,
}) => (
  <span
    {...theme.identifierSpan}
  >
    {children}
  </span>
)

const defaultTheme = {
  value: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: Colors.grey200,
    }
  },
  keywordSpan: {
    color: 'black',
  },
  identifierSpan: {
    color: '#009e71',
  }
}

const ThemedKeywordSpan = Theme('KeywordSpan', defaultTheme)(KeywordSpan)
const ThemedIdentifierSpan = Theme('IdentifierSpan', defaultTheme)(IdentifierSpan)

const dataDecoratorFactory = (propKeyValues, onChange) =>
  new MultiDecorator([
    new SimpleDecorator(keywordStrategy, ThemedKeywordSpan),
    new SimpleDecorator(identifierStrategy, ThemedIdentifierSpan),
  ])

export default dataDecoratorFactory
