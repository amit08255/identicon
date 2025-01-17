const fetch = require('node-fetch')
const jsdom = require('jsdom')
const crypto = require('crypto')
const { JSDOM } = jsdom
const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window

/* eslint-disable */
const IqonsCatalog = {
  face: [
    'face_01',
    'face_02',
    'face_03',
    'face_04',
    'face_05',
    'face_06',
    'face_07',
    'face_08',
    'face_09',
    'face_10',
    'face_11',
    'face_12',
    'face_13',
    'face_14',
    'face_15',
    'face_16',
    'face_17',
    'face_18',
    'face_19',
    'face_20',
    'face_21'
  ],
  side: [
    'side_01',
    'side_02',
    'side_03',
    'side_04',
    'side_05',
    'side_06',
    'side_07',
    'side_08',
    'side_09',
    'side_10',
    'side_11',
    'side_12',
    'side_13',
    'side_14',
    'side_15',
    'side_16',
    'side_17',
    'side_18',
    'side_19',
    'side_20',
    'side_21'
  ],
  top: [
    'top_01',
    'top_02',
    'top_03',
    'top_04',
    'top_05',
    'top_06',
    'top_07',
    'top_08',
    'top_09',
    'top_10',
    'top_11',
    'top_12',
    'top_13',
    'top_14',
    'top_15',
    'top_16',
    'top_17',
    'top_18',
    'top_19',
    'top_20',
    'top_21'
  ],
  bottom: [
    'bottom_01',
    'bottom_02',
    'bottom_03',
    'bottom_04',
    'bottom_05',
    'bottom_06',
    'bottom_07',
    'bottom_08',
    'bottom_09',
    'bottom_10',
    'bottom_11',
    'bottom_12',
    'bottom_13',
    'bottom_14',
    'bottom_15',
    'bottom_16',
    'bottom_17',
    'bottom_18',
    'bottom_19',
    'bottom_20',
    'bottom_21'
  ]
}

class Iqons {
  static async svg (t, s = !1, useLagacyColor = false) {
    const e = this._hash(t)
    return this._svgTemplate(
      e[0],
      e[2],
      e[3] + e[4],
      e[5] + e[6],
      e[7] + e[8],
      e[9] + e[10],
      e[11],
      e[12],
      s,
      useLagacyColor
    )
  }

  static async render (t, s) {
    s.innerHTML = await this.svg(t)
  }

  static async toDataUrl (t) {
    return `data:image/svg+xml;base64,${btoa(await this.svg(t, !0)).replace(
      /#/g,
      '%23'
    )}`
  }

  static placeholder (t = '#bbb', s = 1) {
    return `<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" >\n    <path fill="none" stroke="${t}" stroke-width="${2 *
      s}" transform="translate(0, 8) scale(0.5)" d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z"/>\n    <g transform="scale(0.9) translate(9, 8)">\n        <circle cx="80" cy="80" r="40" fill="none" stroke="${t}" stroke-width="${s}" opacity=".9"></circle>\n        <g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>\`\n    </g>\n</svg>`
  }

  static renderPlaceholder (t, s, e) {
    t.innerHTML = this.placeholder(s, e)
  }

  static placeholderToDataUrl (t, s) {
    return `data:image/svg+xml;base64,${btoa(this.placeholder(t, s))}`
  }

  static async image (t) {
    const s = await this.toDataUrl(t),
      e = await this._loadImage(s)
    return (e.style.width = '100%'), (e.style.height = '100%'), e
  }

  static async _svgTemplate (t, s, e, a, n, r, i, c, l, useLagacyColor) {
    return this._$svg(await this._$iqons(t, s, e, a, n, r, i, l, useLagacyColor), c)
  }

  static async _$iqons (t, s, e, a, n, r, i, c, useLagacyColor) {
    for (
      t = parseInt(t),
      s = parseInt(s),
      i = parseInt(i),
      t === s && ++t > 9 && (t = 0);
      i === t || i === s;

    ) { ++i > 9 && (i = 0) }
    const colors = useLagacyColor ? this.colors : this.colorsNew
    return (
      (t = colors[t]),
      (s = colors[s]),
      `<g color="${t}" fill="${(i = colors[
        i
      ])}">\n    <rect fill="${s}" x="0" y="0" width="160" height="160"></rect>\n    <circle cx="80" cy="80" r="40" fill="${t}"></circle>\n    <g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>\n    ${await this._generatePart(
        'top',
        a,
        c
      )}\n    ${await this._generatePart(
        'side',
        n,
        c
      )}\n    ${await this._generatePart(
        'face',
        e,
        c
      )}\n    ${await this._generatePart('bottom', r, c)}\n</g>`
    )
  }

  static _$svg (t, s) {
    const e = this._getRandomId()
    return `<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" >\n    <defs>\n        <path d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z"/>\n    </defs>\n    <g>\n        <g>\n            ${t}\n        </g>\n    </g>\n</svg>`
  }

  static async _generatePart (t, s, e = !1) {
    if (e) {
      const e = await this._getAssets(),
        a = '#' + t + '_' + this._assetIndex(s, t)
      return e.querySelector(a).innerHTML
    }
    return `<use width="160" height="160" xlink:href="${
      this.svgPath
    }#${t}_${this._assetIndex(s, t)}"/>`
  }

  static _loadImage (t) {
    return new Promise((resolve, reject) => {
      const a = document.createElement('img')
      a.addEventListener('load', t => s(a), { once: !0 }), (a.src = t)
    })
  }

  static async _getAssets () {
    return this._assets
      ? this._assets
      : ((this._assets = fetch(this.svgPath)
        .then(t => t.text())
        .then(t => {
          const s = document.createElement('x-assets')
          return (s.innerHTML = t), (this._assets = s), s
        })),
        this._assets)
  }

  static get colors () {
    return [
      '#fb8c00',
      '#d32f2f',
      '#fbc02d',
      '#3949ab',
      '#03a9f4',
      '#8e24aa',
      '#009688',
      '#f06292',
      '#7cb342',
      '#795548'
    ]
  }

  static get colorsNew () {
    return [
      '#FFA431',
      '#F31652',
      '#FFCB4B',
      '#324FFF',
      '#2CCBFF',
      '#933EFF',
      '#00C098',
      '#FF6E9F',
      '#A3E65C',
      '#A27261'
    ]
  }

  static get assetCounts () {
    return {
      face: IqonsCatalog.face.length,
      side: IqonsCatalog.side.length,
      top: IqonsCatalog.top.length,
      bottom: IqonsCatalog.bottom.length,
      gaze: 2
    }
  }

  static _assetIndex (t, s) {
    return (t = (Number(t) % this.assetCounts[s]) + 1) < 10 && (t = '0' + t), t
  }

  static _hash (t) {
    return (
      '' +
      t
        .split('')
        .map(t => Number(t.charCodeAt(0)) + 3)
        .reduce((t, s) => t * (1 - t) * this.__chaosHash(s), 0.5)
    )
      .split('')
      .reduce((t, s) => s + t, '')
      .substr(4, 17)
  }

  static __chaosHash (t) {
    let s = 1 / t
    for (let t = 0; t < 100; t++) s = (1 - s) * s * 3.569956786876
    return s
  }
  
  static _getRandomId () {
    const c = crypto.randomBytes(4).toString('hex')
    return parseInt(c, 16)
  }
}

Iqons.svgPath = 'http://localhost:8080/static/iqons.min.svg'

module.exports = Iqons