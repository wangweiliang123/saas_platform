'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
//mixin.js
const vue_1 = __importDefault(require('vue'))
const mixin = vue_1.default.mixin({
  data() {
    return {
      timerListContainer: [],
    }
  },
  beforeDestroy() {
    if (this.timerListContainer && this.timerListContainer.length) {
      for (let i = 0; i < this.timerListContainer.length; i++) {
        if (this.timerListContainer[i]) {
          clearInterval(this.timerListContainer[i])
          clearTimeout(this.timerListContainer[i])
        }
      }
      this.timerListContainer = []
    }
  },
})
exports.default = mixin
