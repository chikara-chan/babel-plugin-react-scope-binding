'use strict'

let _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of')

let _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf)

let _classCallCheck2 = require('babel-runtime/helpers/classCallCheck')

let _classCallCheck3 = _interopRequireDefault(_classCallCheck2)

let _createClass2 = require('babel-runtime/helpers/createClass')

let _createClass3 = _interopRequireDefault(_createClass2)

let _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn')

let _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2)

let _inherits2 = require('babel-runtime/helpers/inherits')

let _inherits3 = _interopRequireDefault(_inherits2)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  }
}

let A = function(_B) {
  (0, _inherits3.default)(A, _B)

  function A() {
    (0, _classCallCheck3.default)(this, A)

    let _this = (0, _possibleConstructorReturn3.default)(this, (A.__proto__ || (0, _getPrototypeOf2.default)(A)).call(this))

    _this.a = 1

    return _this
  }

  (0, _createClass3.default)(A, [{
    key: 'say',
    value: function say() {
      return 'hello'
    }
  }])

  return A
}(B)
