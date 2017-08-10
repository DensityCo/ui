'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');


var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('InputBox', module).addWithInfo('Empty', function () {
  return _react2.default.createElement(_2.default, { type: 'text' });
}).addWithInfo('type=text', function () {
  return _react2.default.createElement(_2.default, { type: 'text', value: 'foo!' });
}).addWithInfo('type=password', function () {
  return _react2.default.createElement(_2.default, { type: 'password', placeholder: 'Type your password here.' });
}).addWithInfo('type=select', function () {
  return _react2.default.createElement(
    _2.default,
    { type: 'select' },
    _react2.default.createElement(
      'option',
      { value: 'foo' },
      'Foo'
    ),
    _react2.default.createElement(
      'option',
      { value: 'bar' },
      'Bar'
    ),
    _react2.default.createElement(
      'option',
      { value: 'baz' },
      'Baz'
    )
  );
});

