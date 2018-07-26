import Base from '../base'
import getRandomColor from './color'

export default class Circle extends Base {
  constructor (size, posX, posY) {
    super()
    this.size = size

    if (this.config.direction.up) {
      this.dx = 0
      this.dy = -(Math.random() * (this.config.speed / 10))
    } else if (this.config.direction.right) {
      this.dx = Math.random() * (this.config.speed / 10)
      this.dy = 0
    } else if (this.config.direction.down) {
      this.dx = 0
      this.dy = Math.random() * (this.config.speed / 10)
    } else if (this.config.direction.left) {
      this.dx = -(Math.random() * (this.config.speed / 10))
      this.dy = 0
    } else if (this.config.direction.random) {
      this.dx = Math.random() >= 0.5 ? -(Math.random() * (this.config.speed / 10)) : Math.random() * (this.config.speed / 10)
      this.dy = Math.random() >= 0.5 ? -(Math.random() * (this.config.speed / 10)) : Math.random() * (this.config.speed / 10)
    }

    this.posX = posX
    this.posY = posY

    this.radius = this.config.lineLength

    this.color = getRandomColor()
  }

  drawCircle () {
    this.ctx.beginPath()
    this.ctx.arc(this.posX, this.posY, (this.size), 0, 2 * Math.PI, false)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }

  move () {
    if (this.dx + this.posX > this.canvas.width - this.size || this.dx + this.posX < this.size) {
      this.dx = -this.dx
    }

    if (this.dy + this.posY > this.canvas.height - this.size || this.dy + this.posY < this.size) {
      this.dy = -this.dy
    }

    this.posX += this.dx
    this.posY += this.dy

    this.drawCircle()
  }
}
