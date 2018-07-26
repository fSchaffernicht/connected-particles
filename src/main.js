import Base from './base'
import Lines from './modules/lines'
import Circle from './modules/circle'

class Run extends Base {
  constructor () {
    super()
    this.circles = []
  }

  clearCanvas () {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  init () {
    if (this.config.click) {
      document.addEventListener('click', event => {
        for (let i = 0; i < 3; i++) {
          const randomSize = Math.random() * (this.config.dotSize * 0.9)
          const circle = new Circle(
            randomSize,
            event.clientX,
            event.clientY
          )

          this.circles.push(circle)
        }
      })
    } else if (this.config.mouseMove) {
      document.addEventListener('mousemove', event => {
        for (let i = 0; i < 1; i++) {
          const randomSize = Math.random() * (this.config.dotSize * 0.9)
          const circle = new Circle(
            randomSize,
            event.clientX,
            event.clientY
          )

          this.circles.push(circle)
        }
      })
    } else {
      for (let i = 0; i < this.config.particles; i++) {
        const randomX = Math.floor(Math.random() * this.canvas.width)
        const randomY = Math.floor(Math.random() * this.canvas.height)
        const randomSize = Math.random() * (this.config.dotSize * 0.9)

        const circle = new Circle(
          randomSize,
          randomX,
          randomY
        )

        this.circles.push(circle)
      }
    }

    const lines = new Lines()

    const draw = (e) => {
      this.clearCanvas()

      this.circles.forEach((circle, index) => {
        circle.move()
      })

      lines.move(this.circles)

      window.requestAnimationFrame(draw)
    }

    draw()
  }
}

const runner = new Run()
runner.init()
