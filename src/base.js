import config from './modules/config'

export default class Base {
  constructor () {
    const canvas = document.querySelector('canvas')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    this.config = config
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }
}
