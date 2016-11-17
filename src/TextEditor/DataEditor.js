import React from 'react'
import Draft from 'draft-js'
import CodeUtils from 'draft-js-code'

import {
  Fonts,
  Spacing,
  Colors,
} from '@workflo/styles'

import dataDecoratorFactory from './DataDecorator'
import dataBabelPlugin from './DataBabelPlugin'
import {
  PropKeyValueT,
} from './Types'
import View from '../View'

const {
    EditorState,
    convertFromRaw,
    convertToRaw,
} = Draft

type PropsT = {
  componentName: string,
  propKeyValues: Array<PropKeyValueT>,
}

const babelOptions = {
  presets: ['es2015', 'react', 'stage-0'],
  plugins: ['DataBabelPlugin'],
  filename: 'workflo',
  babelrc: false,
}

export default class DataEditor extends React.Component {

  constructor(props: PropsT) {
    super(props)

    this.state = {
      editorState: this.getEditorState(props),
    }
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.keyBindingFn = this.keyBindingFn.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleTab = this.handleTab.bind(this)

    Babel.registerPlugin('DataBabelPlugin', dataBabelPlugin)
  }

  onChange (editorState) {
    this.setState({
      editorState: editorState,
    })
    const content = editorState.getCurrentContent()
    const code = content.getFirstBlock().getText()
    if (content !== this.previousContent) {
      try {
        const es5Ast = Babel.transform(code, babelOptions)
        eval(es5Ast.code)
        console.log('es5Ast: ', es5Ast.code)
      } catch (err) {
        console.error(err.message)
      }
      this.previousContent = content
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('will receive props')
    if (nextProps.propKeyValues !== this.props.propKeyValues) {
      this.setState({
        editorState: this.getEditorState(nextProps),
      })
    }
  }

  getEditorState = (props) => {
    const {
      componentName,
      propKeyValues,
      onChange,
    } = props
    const contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: getDataString(componentName, propKeyValues)
        }
      ]
    })

    return EditorState.createWithContent(contentState, dataDecoratorFactory(propKeyValues, onChange))
  }

  handleKeyCommand (command) {
    const { editorState } = this.state
    let newState

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command)
    }

    if (!newState) {
      newState = Draft.RichUtils.handleKeyCommand(editorState, command)
    }

    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  keyBindingFn (e) {
    const editorState = this.state.editorState
    let command

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e)
    }
    if (command) {
      return command
    }

    return Draft.getDefaultKeyBinding(e)
  }

  handleReturn (e) {
    const editorState = this.state.editorState
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this.onChange(
      CodeUtils.handleReturn(e, editorState)
    )
    return true
  }

  handleTab (e) {
    const editorState = this.state.editorState

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this.onChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  render () {
    return (
      <View
        style={styles.editor}
      >
        <Draft.Editor
          customStyleMap={styleMap}
          editorState={this.state.editorState}
          onChange={this.onChange}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          handleReturn={this.handleReturn}
          onTab={this.handleTab}
          readOnly={false}
        />
      </View>
    )
  }
}

const getDataString = (componentName, propKeyValues) => {
  // const props = propKeyValues
  //   .map((propKeyValue) => {
  //     const { key, value, type } = propKeyValue
  //     switch (type) {
  //       case 'variable':
  //         return `  ${key}={${value}}`
  //       case 'string':
  //         return `  ${key}='${value}'`
  //       case 'number':
  //         return `  ${key}={${value}}`
  //       default:
  //         return `  ${key}={${value}}`
  //     }
  //   })
  //   .join('\n')
  return `const user = {
  firstName: 'Brenda',
  lastName: 'Jenner',
}

const comment = {
  description: 'Something good',
}

const responders = [
  {
    firstName: 'Brenda',
    lastName: 'Jenner',
  },
  {
    firstName: 'Jenna',
    lastName: 'Doe',
  },
]`
}

const styleMap = {
  CODE: {
    backgroundColor: Colors.grey50,
    fontFamily: '"Open Sans", "Menlo", "Consolas", monospace',
    padding: 2,
  },
}

const styles = {
  editor: {
    ...Fonts.base,
    padding: Spacing.small,
    backgroundColor: 'white',
    color: Colors.grey600,
    lineHeight: '1.6em',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}
