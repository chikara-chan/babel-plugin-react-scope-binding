'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var A = function () {
  function A() {
    (0, _classCallCheck3.default)(this, A);

    this.a = 1;
  }

  (0, _createClass3.default)(A, [{
    key: 'say',
    value: function say() {
      return 'hello';
    }
  }]);
  return A;
}();