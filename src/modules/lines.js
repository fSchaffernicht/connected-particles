import Base from '../base'
import { transformAlphaFromColor } from './util'

export default class Lines extends Base {
  drawTriangle (x1, y1, x2, y2, color) {
    this.ctx.beginPath()
    this.ctx.lineWidth = this.config.lineThickness
    this.ctx.strokeStyle = color
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  move (circles) {
    let a
    let x
    let y

    for (var index = 0, len = circles.length; index < len; index++) {
      for (let i = 0; i < len; i++) {
        let nextItem = circles[index + i]

        if (nextItem) {
          a = circles[i].radius * 2
          x = Math.abs(circles[index].posX - nextItem.posX)
          y = Math.abs(circles[index].posY - nextItem.posY)
          let distance = Math.sqrt((x * x) + (y * y))

          if (a > distance) {
            this.drawTriangle(
              circles[index].posX,
              circles[index].posY,
              nextItem.posX,
              nextItem.posY,
              transformAlphaFromColor(circles[index].color, distance)
            )
          }
        }
      }
    }
  }
}
