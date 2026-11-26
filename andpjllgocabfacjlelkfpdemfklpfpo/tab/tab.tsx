// @ts-nocheck

import Vue from 'vue'
import App from './App.vue'
import KNOTDB from '../library/knotidb'
import TextHighlight from 'vue-text-highlight'
import Toasted from 'vue-toasted'
import vSelect from 'vue-select'
import 'vue-select/src/scss/vue-select.scss'
import { ReactiveProvide } from '../vendor/vue-reactive-provide'
import VueTippy, { TippyComponent } from 'vue-tippy'
import { store } from '../store/store'
import {
  DB_TBL_NOTIFICATIONS,
  SENTRY_DSN,
  VERSION_TAG,
  ENABLE_SENTRY
} from '../config'
import { createRoot } from 'react-dom/client'
import FeatureFlagsContainer from './components/FeatureFlags/Container'
import VirtualList from 'vue-virtual-scroll-list'
import * as Sentry from '@sentry/vue'

if (ENABLE_SENTRY) {
  Sentry.init({
    Vue,
    dsn: SENTRY_DSN,
    version: VERSION_TAG
  })
  Sentry.configureScope((scope) => {
    scope.setTag('source', 'timelineTab')
  })
}

Vue.use(ReactiveProvide)
Vue.component('text-highlight', TextHighlight)
Vue.component('virtual-list', VirtualList)

Vue.use(VueTippy)
Vue.component('tippy', TippyComponent)

// IMPORTANT: no need for this => just run "nvm use 14 && vue-devtools" and refresh devtools window when in tab
// MAKE SURE: npm run watch:dev (has to be development mode)

// CAUTION: this is not working anymore (use ./vue-devtools from console to open electron version + npm run watch:dev)
// V1
// Vue.config.devtools = true
// V2
// import devtools from '@vue/devtools'
// devtools.connect(/* host, port */)

Vue.use(Toasted, {
  position: 'bottom-left',
  duration: 7000,
  keepOnHover: true,
  theme: 'toasted-primary' // ['toasted-primary', 'outline', 'bubble']
})

Vue.component('v-select', vSelect)

/** Vue Filters Start */
/*
Vue.filter('truncate',
  (text, n, useWordBoundary) => {
    if (text.length <= n) {
      return text
    }
    var subString = text.substr(0, n - 1)
    return (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(' '))
      : subString) + ' ..' //or maybe use &hellip;
  })
*/
/** Vue Filters End */

const urlSearchParams = new URLSearchParams(window.location.search)

if (urlSearchParams.get('experimental')) {
  const rootContainer = document.getElementById('react')
  const reactRoot = createRoot(rootContainer)
  reactRoot.render(<FeatureFlagsContainer />)
} else {
  new Vue({
    el: '#app',
    store,
    render: (h) => h(App)
  })
}

class Badger {
  constructor(options) {
    Object.assign(
      this,
      {
        backgroundColor: '#0F62FE',
        color: '#fff',
        size: 0.6, // 0..1 (Scale in respect to the favicon image size)
        position: 'se', // Position inside favicon "n", "e", "s", "w", "ne", "nw", "se", "sw"
        radius: 10, // Border radius
        src: '', // Favicon source (dafaults to the <link> icon href)
        onChange() {}
      },
      options
    )
    this.canvas = document.createElement('canvas')
    this.src = this.src || this.faviconEL.getAttribute('href')
    this.ctx = this.canvas.getContext('2d')
  }

  faviconEL = document.querySelector("link[rel*='shortcut icon']")

  _drawIcon() {
    this.ctx.clearRect(0, 0, this.faviconSize, this.faviconSize)
    this.ctx.drawImage(this.img, 0, 0, this.faviconSize, this.faviconSize)
  }

  _drawShape() {
    const r = this.radius
    const xa = this.offset.x
    const ya = this.offset.y
    const xb = this.offset.x + this.badgeSize
    const yb = this.offset.y + this.badgeSize
    this.ctx.beginPath()
    this.ctx.moveTo(xb - r, ya)
    this.ctx.quadraticCurveTo(xb, ya, xb, ya + r)
    this.ctx.lineTo(xb, yb - r)
    this.ctx.quadraticCurveTo(xb, yb, xb - r, yb)
    this.ctx.lineTo(xa + r, yb)
    this.ctx.quadraticCurveTo(xa, yb, xa, yb - r)
    this.ctx.lineTo(xa, ya + r)
    this.ctx.quadraticCurveTo(xa, ya, xa + r, ya)
    this.ctx.fillStyle = this.backgroundColor
    this.ctx.fill()
    this.ctx.closePath()
  }

  _drawVal() {
    const margin = (this.badgeSize * 0.18) / 2
    this.ctx.beginPath()
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.font = `bold ${this.badgeSize * 0.82}px Arial`
    this.ctx.fillStyle = this.color
    this.ctx.fillText(
      this.value,
      this.badgeSize / 2 + this.offset.x,
      this.badgeSize / 2 + this.offset.y + margin
    )
    this.ctx.closePath()
  }

  _drawFavicon() {
    this.faviconEL.setAttribute('href', this.dataURL)
  }

  _draw() {
    this._drawIcon()
    if (this.value) this._drawShape()
    if (this.value) this._drawVal()
    this._drawFavicon()
  }

  _setup() {
    this.faviconSize = this.img.naturalWidth
    this.badgeSize = this.faviconSize * this.size
    this.canvas.width = this.faviconSize
    this.canvas.height = this.faviconSize
    const sd = this.faviconSize - this.badgeSize
    const sd2 = sd / 2
    this.offset = {
      n: { x: sd2, y: 0 },
      e: { x: sd, y: sd2 },
      s: { x: sd2, y: sd },
      w: { x: 0, y: sd2 },
      nw: { x: 0, y: 0 },
      ne: { x: sd, y: 0 },
      sw: { x: 0, y: sd },
      se: { x: sd, y: sd }
    }[this.position]
  }

  // Public functions / methods:

  update() {
    this._value = Math.min(99, parseInt(this._value, 10))
    if (this.img) {
      this._draw()
      if (this.onChange) this.onChange.call(this)
    } else {
      this.img = new Image()
      this.img.addEventListener('load', () => {
        this._setup()
        this._draw()
        if (this.onChange) this.onChange.call(this)
      })
      this.img.src = this.src
    }
  }

  get dataURL() {
    return this.canvas.toDataURL()
  }

  get value() {
    return this._value
  }

  set value(val) {
    this._value = val
    this.update()
  }
}

const NotificationManager = {
  async countNotifications() {
    const db = await KNOTDB
    let allUnseenNotifications = []
    const allNotifications = await db.getAll(DB_TBL_NOTIFICATIONS)
    allUnseenNotifications = allNotifications.filter((cluster) => !cluster.seen)
    myBadger.value = allUnseenNotifications.length
  }
}

const myBadgerOptions = {}
const myBadger = new Badger(myBadgerOptions)
NotificationManager.countNotifications()
setInterval(() => {
  NotificationManager.countNotifications()
}, 1000)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.command) {
    case 'check.notifications':
      NotificationManager.countNotifications()
      return true
      break
  }
})
