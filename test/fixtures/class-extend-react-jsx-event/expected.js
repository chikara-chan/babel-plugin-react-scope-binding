"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var A = function (_Component) {
  (0, _inherits3.default)(A, _Component);

  function A() {
    (0, _classCallCheck3.default)(this, A);

    var _this = (0, _possibleConstructorReturn3.default)(this, (A.__proto__ || (0, _getPrototypeOf2.default)(A)).call(this));

    _this.state = {
      a: 1
    };
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(A, [{
    key: "handleClick",
    value: function handleClick() {
      this.setState({
        a: 2
      });
    }
  }, {
    key: "say",
    value: function say() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { href: "javascript:void(0)", onClick: this.handleClick },
          "link"
        )
      );
    }
  }]);
  return A;
}(_react.Component);