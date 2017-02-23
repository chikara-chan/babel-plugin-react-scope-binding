export function buildBindingStatement(t, identifier) {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(
        t.thisExpression(),
        t.identifier(identifier)
      ),
      t.callExpression(
        t.memberExpression(
          t.memberExpression(
            t.thisExpression(),
            t.identifier(identifier)
          ),
          t.identifier('bind')
        ),
        [t.thisExpression()]
      )
    )
  )
}

export function buildConstructor(t) {
  return t.classMethod(
    'constructor',
    t.identifier('constructor'),
    [],
    t.blockStatement([
      t.expressionStatement(
        t.callExpression(
          t.super(),
          []
        )
      )
    ])
  )
}

export function buildArrowFunction(t, identifier, nodeArgs) {
  return t.arrowFunctionExpression(
    [t.identifier('e')],
    t.blockStatement([
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.thisExpression(),
            t.identifier(identifier)
          ),
          [t.identifier('e'), ...nodeArgs]
        )
      )
    ])
  )
}
