'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunniesComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _funnies = require('./funnies');

var _funnies2 = _interopRequireDefault(_funnies);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _radium = require('radium');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Funnies = function () {
  function Funnies() {
    var _this = this;

    var messages = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, Funnies);

    this.messages = _funnies2.default.concat(messages);

    // convert messages into a map of message to how many times it has been
    // used.
    this.record = {};
    this.messages.forEach(function (message) {
      _this.record[message] = 0;
    });
  }

  // pick the smallest of the freqencies for a message to get a more random
  // distribution


  _createClass(Funnies, [{
    key: 'message',
    value: function message() {
      var _this2 = this;

      var smallestMessage = this.messages.reduce(function (smallest, message) {
        if (_this2.record[smallest] > _this2.record[message]) {
          return message;
        } else if (_this2.record[smallest] === _this2.record[message]) {
          return _lodash2.default.sample([smallest, message]);
        } else {
          return smallest;
        }
      });

      // update the recrd to show that this message was picked
      this.record[smallestMessage] += 1;
      return smallestMessage;
    }
  }, {
    key: 'messageHTML',
    value: function messageHTML() {
      var message = this.message();
      var html = ('<div class="funnies">\n      <span class="loading-funny">' + message + '</span>\n    </div>').replace(/(\r?\n|^ +)/gm, '');
      return { message: message, html: html };
    }
  }]);

  return Funnies;
}();

exports.default = Funnies;


var styles = {
  funnies: {
    background: "#EEE",
    paddingTop: "0.5em",
    position: "relative",
    height: "7.2em",
    fontFamily: "Helvetica, Arial, sans-serif",
    color: "#555"
  },
  funniesText: {
    transition: "opacity 0.2s ease-in",
    position: "absolute",
    textAlign: "center",
    width: "100%",
    fontSize: "1em",

    funniesEnter: { opacity: 0.01 },
    funniesEnterActive: { opacity: 1.0 },
    funniesLeave: {
      opacity: 1.0
    },
    funniesLeaveActive: {
      opacity: 0
    }
  },
  funniesHeader: {
    textAlign: "center",
    fontSize: "2em"
  }
};

var FunniesComponent = exports.FunniesComponent = function (_React$Component) {
  _inherits(FunniesComponent, _React$Component);

  function FunniesComponent(props) {
    _classCallCheck(this, FunniesComponent);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(FunniesComponent).call(this));

    _this3.state = {};
    _this3.state.funnies = new Funnies(props.customMessages);
    _this3.state.message = _this3.state.funnies.message();

    // periodically, update the message to be something else
    _this3.state.interval = setInterval(function () {
      _this3.setState({ message: _this3.state.funnies.message() });
    }, props.interval);
    return _this3;
  }

  _createClass(FunniesComponent, [{
    key: 'cssTransitionStyles',
    value: function cssTransitionStyles() {
      return [_react2.default.createElement(_radium.Style, {
        scopeSelector: '.funnies-text.funnies-enter',
        rules: styles.funniesText.funniesEnter,
        key: 0
      }), _react2.default.createElement(_radium.Style, {
        scopeSelector: '.funnies-text.funnies-enter-active',
        rules: styles.funniesText.funniesEnterActive,
        key: 1
      }), _react2.default.createElement(_radium.Style, {
        scopeSelector: '.funnies-text.funnies-leave',
        rules: styles.funniesText.funniesLeave,
        key: 2
      }), _react2.default.createElement(_radium.Style, {
        scopeSelector: '.funnies-text.funnies-leave-active',
        rules: styles.funniesText.funniesLeaveActive,
        key: 3
      })];
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.state.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'funnies', style: styles.funnies },
        this.cssTransitionStyles(),
        _react2.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            transitionName: 'funnies',
            transitionEnterTimeout: 200,
            transitionLeaveTimeout: 200
          },
          _react2.default.createElement(
            'h1',
            { style: styles.funniesHeader },
            'Loading...'
          ),
          _react2.default.createElement(
            'span',
            {
              className: 'funnies-text',
              style: styles.funniesText,
              key: this.state.message
            },
            this.state.message
          )
        )
      );
    }
  }]);

  return FunniesComponent;
}(_react2.default.Component);

FunniesComponent.defaultProps = { interval: 8000, customMessages: [] };

// for browser support
if (typeof window !== 'undefined') {
  window.Funnies = Funnies;
  window.FunniesComponent = FunniesComponent;
}
// for AMD
if (typeof define === 'function' && define.amd) {
  define([], function () {
    return { Funnies: Funnies, FunniesComponent: FunniesComponent };
  });
}