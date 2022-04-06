"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var RitmDate = /*#__PURE__*/function () {
  function RitmDate() {
    var initialDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, RitmDate);

    this.date = initialDate ? new Date(initialDate) : null;
    this.offset = new Date().getTimezoneOffset() / 60;
    this.weekDayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    this.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    this.userOffset = null;
    this.spare = '—';
    this.parsed = null;
    this.result = null;
    this.ISO = null;
    this.units = {
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000
    };
  }

  _createClass(RitmDate, [{
    key: "_reset",
    value: function _reset() {
      this.spare = '—';
      this.date = null;
      this.parsed = null;
      this.userOffset = null;
    }
  }, {
    key: "_isValid",
    value: function _isValid(d) {
      var date = new Date(d);
      return d && !isNaN(Date.parse(date));
    }
  }, {
    key: "_parseMask",
    value: function _parseMask(m, parsedDate) {
      var mask = m;
      var keys = Object.keys(parsedDate);
      keys.forEach(function (k) {
        mask = mask.replace(k, parsedDate[k]);
      });

      this._reset();

      return mask;
    }
  }, {
    key: "_split",
    value: function _split(date, offset, userOffset) {
      var _this$monthNames$mont;

      var twoDigit = function twoDigit(v) {
        return v >= 10 ? v : "0".concat(v);
      };

      var getOffset = function getOffset(offset, userOffset) {
        var os = userOffset !== null && userOffset !== void 0 ? userOffset : offset;
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
      return {
        YYYY: year,
        YY: String(year).slice(2, 4),
        MMMM: this.monthNames[month],
        MMM: (_this$monthNames$mont = this.monthNames[month]) === null || _this$monthNames$mont === void 0 ? void 0 : _this$monthNames$mont.slice(0, 3),
        MM: twoDigit(month + 1),
        M: month + 1,
        DD: twoDigit(dateNumber),
        D: dateNumber,
        dd: this.weekDayNames[day],
        HH: twoDigit(hours),
        h: hours % 12 || 12,
        mm: twoDigit(minutes),
        ss: twoDigit(seconds),
        offset: getOffset(offset, userOffset),
        _instance: date
      };
    }
  }, {
    key: "getIso",
    value: function getIso(parsedDate) {
      var YYYY = parsedDate.YYYY,
          MM = parsedDate.MM,
          DD = parsedDate.DD,
          HH = parsedDate.HH,
          mm = parsedDate.mm,
          ss = parsedDate.ss,
          offset = parsedDate.offset;
      return "".concat(YYYY, "-").concat(MM, "-").concat(DD, "T").concat(HH, ":").concat(mm, ":").concat(ss).concat(offset);
    }
  }, {
    key: "format",
    value: function format(d, m, spare) {
      var _m;

      if (arguments.length === 1 && typeof d === 'string' && !this._isValid(d)) {
        m = d;
        d = undefined;
      }

      if (spare) this.spare = spare;
      if (!d && !this._isValid(this.date)) return this.spare;

      if (d && !this.date) {
        this.date = new Date(d);
      }

      this.parsed = Date.parse(this.date);
      if (m === 'x') return this.parsed;
      var offset = this.offset,
          userOffset = this.userOffset,
          date = this.date;

      var parsedDate = this._split(date, offset, userOffset);

      this.ISO = this.getIso(parsedDate);

      if (((_m = m) === null || _m === void 0 ? void 0 : _m.toUpperCase()) === 'ISO') {
        this._reset();

        return this.ISO;
      } else {
        var mask;

        if (m !== 'l') {
          mask = m || 'DD.MM.YYYY • HH:mm';
        } else mask = 'D/M/YY';

        return this._parseMask(mask, parsedDate);
      }
    } // Chaining items

  }, {
    key: "zone",
    value: function zone(offset) {
      this.userOffset = offset;
      return this;
    }
  }, {
    key: "calc",
    value: function calc(quantity, unit, date) {
      this.date = date ? this._isValid(date) ? new Date(date) : this.date : this.date;
      if (!this.date) return this;
      var u = this.units[unit];
      var time = this.date.getTime();
      this.date.setTime(time + quantity * u);
      return this;
    }
  }, {
    key: "zeroing",
    value: function zeroing(date) {
      this.date = date ? this._isValid(date) ? new Date(date) : this.date : this.date;
      if (!this.date) return this;
      this.date.setHours(0);
      this.date.setMinutes(0);
      this.date.setSeconds(0);
      return this;
    } // Other

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