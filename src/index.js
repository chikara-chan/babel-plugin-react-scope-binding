import {buildConstructor, buildBindingStatement, buildArrowFunction} from './factory'
import {findOwnerClassPath, isConstructor, isEventAttribute, isPureMemberExpressionWithThis, isPureCallExpressionWithThis, isReactClass} from './helpers'

function plugin({types: t}) {
  return {
    visitor: {
      Program(programPath, state) {
        programPath.traverse({
          ClassDeclaration: {
            enter(path) {
              const superClass = path.get('superClass'),
                classMethodPaths = path.get('body').get('body')

              if (!superClass.node || !isReactClass(superClass, path.scope)) {
                return
              }
              this.addedEventNames = []
              if (!classMethodPaths.some(classMethodPath => isConstructor(classMethodPath, t))) {
                path.get('body').node.body.unshift(buildConstructor(t))
              }
            },
            exit() {
              delete this.addedEventNames
            }
          },
          JSXAttribute(path) {
            let eventName, classPath

            if (!isEventAttribute(path, t, this.state.opts.propPrefix)) {
              return
            }
            if (this.state.opts.advanced === true && isPureCallExpressionWithThis(path.get('value').get('expression'), t)) {
              const handler = path.get('value').get('expression').get('callee').get('property').node.name,
                nodeArgs = path.get('value').get('expression').node.arguments

              path.get('value').get('expression').replaceWith(buildArrowFunction(t, handler, nodeArgs))

              return
            }
            if (!isPureMemberExpressionWithThis(path.get('value').get('expression'), t)) {
              return
            }

            eventName = path.get('value').get('expression').get('property').node.name
            if (!this.addedEventNames || ~this.addedEventNames.indexOf(eventName)) {
              return
            }
            classPath = findOwnerClassPath(path)
            classPath.traverse({
              ClassMethod(path) {
                if (isConstructor(path, t) && findOwnerClassPath(path) === classPath) {
                  path.get('body').pushContainer('body', buildBindingStatement(t, eventName))
                  this.addedEventNames.push(eventName)
                }
              }
            }, {addedEventNames: this.addedEventNames})
          }
        }, {addedEventNames: null, state})
      }
    }
  }
}

export default plugin
