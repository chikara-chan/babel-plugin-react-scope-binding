export function findOwnerClassPath(path) {
  return path.findParent(path => path.isClassExpression()
  )
}

export function isConstructor(path, t) {
  return t.isIdentifier(path.get('key').node, {name: 'constructor'})
}

// E.g. onClick={}
export function isEventAttribute(path, propPrefix) {
  let ret = false

  if (
    !path.get('name').isJSXIdentifier() ||
    !path.get('value').isJSXExpressionContainer()
  ) {
    return ret
  }

  if (Array.isArray(propPrefix)) {
    ret = propPrefix.some(prefix => {
      const rName = new RegExp(`^${prefix}`)

      return rName.exec(path.get('name').node.name)
    })
  } else {
    const rName = new RegExp(`^${propPrefix}`)

    if (rName.exec(path.get('name').node.name)) {
      ret = true
    }
  }

  return ret
}

// E.g. onClick={this.handleClick}
export function isHandlerExpression(path) {
  return path.isMemberExpression() &&
    path.get('object').isThisExpression() &&
    path.get('property').isIdentifier()
}

// E.g. onClick={this.handleClick(item)}
export function isHandlerExpressionWithParams(path) {
  return path.isCallExpression() &&
    isHandlerExpression(path.get('callee'))
}

function isPathReactClass(path) {
  if (path.matchesPattern('React.Component') ||
    path.matchesPattern('React.PureComponent')) {
    return true
  }

  if (path.node && (
    path.node.name === 'Component' ||
    path.node.name === 'PureComponent'
    )) {
    return true
  }

  return false
}

export function isReactClass(superClass, scope) {
  let ret = false

  if (isPathReactClass(superClass)) {
    ret = true
  } else if (superClass.node.name) {
    const className = superClass.node.name,
      binding = scope.getBinding(className)

    if (!binding) {
      ret = false
    } else {
      superClass = binding.path.get('superClass')

      if (isPathReactClass(superClass)) {
        ret = true
      }
    }
  }

  return ret
}
