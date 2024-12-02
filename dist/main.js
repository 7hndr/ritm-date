"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _names = _interopRequireDefault(require("./names.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _offset = /*#__PURE__*/new WeakMap();

var _userOffset = /*#__PURE__*/new WeakMap();

var _locale = /*#__PURE__*/new WeakMap();

var _availableLocales = /*#__PURE__*/new WeakMap();

var _spare = /*#__PURE__*/new WeakMap();

var _timestamp = /*#__PURE__*/new WeakMap();

var _ISO = /*#__PURE__*/new WeakMap();

var _units = /*#__PURE__*/new WeakMap();

var _logError = /*#__PURE__*/new WeakSet();

var _reset = /*#__PURE__*/new WeakSet();

var _parseMask = /*#__PURE__*/new WeakSet();

var _split = /*#__PURE__*/new WeakSet();

var _getIso = /*#__PURE__*/new WeakSet();

var RitmDate = /*#__PURE__*/function () {
  function RitmDate() {
    var initialDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, RitmDate);

    _classPrivateMethodInitSpec(this, _getIso);

    _classPrivateMethodInitSpec(this, _split);

    _classPrivateMethodInitSpec(this, _parseMask);

    _classPrivateMethodInitSpec(this, _reset);

    _classPrivateMethodInitSpec(this, _logError);

    _classPrivateFieldInitSpec(this, _offset, {
      writable: true,
      value: new Date().getTimezoneOffset() / 60
    });

    _classPrivateFieldInitSpec(this, _userOffset, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _locale, {
      writable: true,
      value: 'en'
    });

    _classPrivateFieldInitSpec(this, _availableLocales, {
      writable: true,
      value: ['en', 'ru']
    });

    _classPrivateFieldInitSpec(this, _spare, {
      writable: true,
      value: '—'
    });

    _classPrivateFieldInitSpec(this, _timestamp, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _ISO, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _units, {
      writable: true,
      value: {
        day: 86400000,
        days: 86400000,
        hour: 3600000,
        hours: 3600000,
        minutes: 60000,
        minute: 60000
      }
    });

    this.date = initialDate ? new Date(initialDate) : null;
  }

  _createClass(RitmDate, [{
    key: "format",
    value: function format(mask) {
      var _mask;

      if (!this.isValid(this.date)) return _classPrivateFieldGet(this, _spare);

      _classPrivateFieldSet(this, _timestamp, Date.parse(this.date));

      if (mask === 'x' || mask === 'X') return _classPrivateFieldGet(this, _timestamp);

      var parsedDate = _classPrivateMethodGet(this, _split, _split2).call(this, this.date, _classPrivateFieldGet(this, _offset), _classPrivateFieldGet(this, _userOffset));

      _classPrivateFieldSet(this, _ISO, _classPrivateMethodGet(this, _getIso, _getIso2).call(this, parsedDate));

      if (((_mask = mask) === null || _mask === void 0 ? void 0 : _mask.toUpperCase()) === 'ISO') {
        _classPrivateMethodGet(this, _reset, _reset2).call(this);

        return _classPrivateFieldGet(this, _ISO);
      } else {
        if (mask !== 'l') {
          mask = mask || 'DD.MM.YYYY • HH:mm';
        } else mask = 'D/M/YY';

        return _classPrivateMethodGet(this, _parseMask, _parseMask2).call(this, mask, parsedDate);
      }
    } // Chaining items

  }, {
    key: "zone",
    value: function zone(offset) {
      if (typeof +offset !== 'number') {
        _classPrivateMethodGet(this, _logError, _logError2).call(this, 'zone offset, must be number');
      } else {
        _classPrivateFieldSet(this, _userOffset, +offset * -1);
      }

      return this;
    }
  }, {
    key: "setSpare",
    value: function setSpare(spare) {
      if (typeof spare !== 'string') {
        _classPrivateMethodGet(this, _logError, _logError2).call(this, 'spare, must be string');
      } else {
        _classPrivateFieldSet(this, _spare, spare);
      }

      return this;
    }
  }, {
    key: "setLocale",
    value: function setLocale(locale) {
      if (_classPrivateFieldGet(this, _availableLocales).includes(locale)) {
        _classPrivateFieldSet(this, _locale, locale);
      } else {
        _classPrivateMethodGet(this, _logError, _logError2).call(this, 'localization');
      }

      return this;
    }
  }, {
    key: "calc",
    value: function calc(quantity, unit) {
      if (this.isValid(this.date)) {
        var u = _classPrivateFieldGet(this, _units)[unit];

        var time = this.date.getTime();
        this.date.setTime(time + quantity * u);
      }

      return this;
    }
  }, {
    key: "zeroing",
    value: function zeroing() {
      if (this.isValid(this.date)) {
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(0);
      }

      return this;
    } // Utils

  }, {
    key: "isValid",
    value: function isValid(d) {
      if (typeof d === 'number' && (d !== 0 || d < 14400000)) {
        return false;
      }

      var date = new Date(d);
      return !isNaN(Date.parse(date)) || !isNaN(date.getHours());
    }
  }, {
    key: "secondsToTime",
    value: function secondsToTime(initial) {
      var twoDigit = function twoDigit(v) {
        return v >= 10 ? v : "0".concat(v);
      };

      var hours = Math.floor(initial / (60 * 60));
      var divisor_for_minutes = initial % (60 * 60);
      var minutes = Math.floor(divisor_for_minutes / 60);
      var divisor_for_seconds = divisor_for_minutes % 60;
      var seconds = Math.ceil(divisor_for_seconds);
      return "".concat(twoDigit(hours), ":").concat(twoDigit(minutes), ":").concat(twoDigit(seconds));
    }
  }]);

  return RitmDate;
}();

exports["default"] = RitmDate;

function _logError2(error) {
  console.warn("Incorrect ".concat(error, "!"));
}

function _reset2() {
  _classPrivateFieldSet(this, _spare, '—');

  this.date = null;

  _classPrivateFieldSet(this, _timestamp, null);

  _classPrivateFieldSet(this, _userOffset, null);
}

function _parseMask2(m, parsedDate) {
  var mask = m;
  var keys = Object.keys(parsedDate);
  keys.forEach(function (k) {
    mask = mask.replace(k, parsedDate[k]);
  });

  _classPrivateMethodGet(this, _reset, _reset2).call(this);

  return mask;
}

function _split2(date, offset, userOffset) {
  var twoDigit = function twoDigit(v) {
    userOffset;
    return v >= 10 ? v : "0".concat(v);
  };

  var getOffset = function getOffset(offset, userOffset) {
    var os = !userOffset ? 0 : offset;
    var h = Math.abs(Math.floor(os));
    var m = Math.abs((os % 1).toFixed(1) * 10);
    return "".concat(os >= 0 ? '-' : '+').concat(twoDigit(h), ":").concat(twoDigit(m));
  };

  if (typeof userOffset === 'number') {
    var h = date.getHours();
    var abs = Math.abs(userOffset);
    var o = userOffset >= 0 ? h - abs : h + abs;
    date.setHours(offset + o);
  }

  var year = date.getFullYear();
  var month = date.getMonth();
  var dateNumber = date.getDate();
  var day = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var monthNames = _names["default"].months[_classPrivateFieldGet(this, _locale)];

  var weekNames = _names["default"].weeks[_classPrivateFieldGet(this, _locale)];

  return {
    YYYY: year,
    YY: String(year).slice(2, 4),
    MMMM: monthNames.full[month],
    MMM: monthNames["short"][month],
    MM: twoDigit(month + 1),
    M: month + 1,
    DD: twoDigit(dateNumber),
    D: dateNumber,
    ddd: weekNames.full[day],
    dd: weekNames["short"][day],
    HH: twoDigit(hours),
    h: hours % 12 || 12,
    mm: twoDigit(minutes),
    ss: twoDigit(seconds),
    offset: getOffset(offset, userOffset),
    _instance: date
  };
}

function _getIso2(parsedDate) {
  var YYYY = parsedDate.YYYY,
      MM = parsedDate.MM,
      DD = parsedDate.DD,
      HH = parsedDate.HH,
      mm = parsedDate.mm,
      ss = parsedDate.ss,
      offset = parsedDate.offset;
  return "".concat(YYYY, "-").concat(MM, "-").concat(DD, "T").concat(HH, ":").concat(mm, ":").concat(ss).concat(offset);
}