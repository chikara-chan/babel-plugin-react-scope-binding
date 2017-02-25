import {buildConstructor, buildBindingStatement, buildArrowFunction} from './factory'
import {isEventAttribute, isHandlerExpression, isHandlerExpressionWithParams, isReactClass} from './helpers'

function plugin({types: t}) {
  return {
    visitor: {
      ClassDeclaration(classPath, {opts}) {
        const defaultOpts = {
            propPrefix: 'on',
            advanced: false
          },
          superClass = classPath.get('superClass'),
          addedEventNames = []
        let bodyPaths = classPath.get('body').get('body')

        opts = {...defaultOpts, ...opts}
        if (!superClass || !isReactClass(superClass, classPath.scope)) {
          return
        }
        if (!bodyPaths.some(bodyPath =>
          bodyPath.isClassMethod({kind: 'constructor'})
        )) {
          classPath.get('body').node.body.unshift(buildConstructor(t))
          bodyPaths = classPath.get('body').get('body')
        }
        classPath.traverse({
          JSXAttribute(path) {
            let eventName,
              JSXExpression

            if (!isEventAttribute(path, opts.propPrefix)) {
              return
            }
            JSXExpression = path.get('value').get('expression')
            if (opts.advanced === true && isHandlerExpressionWithParams(JSXExpression, t)) {
              const handler = JSXExpression.get('callee').get('property').node.name,
                nodeArgs = JSXExpression.node.arguments

              JSXExpression.replaceWith(buildArrowFunction(t, handler, nodeArgs))

              return
            }
            if (!isHandlerExpression(path.get('value').get('expression'), t)) {
              return
            }

            eventName = JSXExpression.get('property').node.name
            if (~this.addedEventNames.indexOf(eventName)) {
              return
            }
            if (bodyPaths.some(bodyPath =>
              bodyPath.get('key').isIdentifier({name: eventName})
            )) {
              bodyPaths.forEach(bodyPath => {
                if (bodyPath.isClassMethod({kind: 'constructor'})) {
                  bodyPath.get('body').pushContainer('body', buildBindingStatement(t, eventName))
                  this.addedEventNames.push(eventName)
                }
              })
            }
          }
        }, {addedEventNames})
      }
    }
  }
}

export default plugin
