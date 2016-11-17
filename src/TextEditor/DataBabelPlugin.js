import template from 'babel-template'

function dataBabelPlugin({ types: t }) {
  return {
    visitor: {
      Program(path) {
        path.unshiftContainer('body', buildInit())
      },
      VariableDeclaration(path) {
        const variableI = t.identifier(path.node.declarations[0].id.name)
        const windowI = t.identifier('window')
        const workfloI = t.memberExpression(windowI, t.identifier('workflo'))
        const liveViewI = t.memberExpression(workfloI, t.identifier('liveView'))
        const dataI = t.memberExpression(liveViewI, t.identifier('data'))
        const lVal = t.memberExpression(dataI, variableI)
        const rexpression = path.node.declarations[0].init
        path.insertAfter(
          t.expressionStatement(t.assignmentExpression('=', lVal, rexpression))
        )
      }
    }
  }
}

const buildInit = template(`
  window.workflo = window.workflo || {};
  window.workflo.liveView = window.workflo.liveView || {};
  window.workflo.liveView.data = window.workflo.liveView.data || {};
`)

export default dataBabelPlugin
