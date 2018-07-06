const config = {
  lineLength: 45,
  lineThickness: 0.5,
  particles: 500,
  speed: 3,
  dotSize: 1
}

function getRandomColor () {
  const r = Math.max(100, Math.floor(Math.random() * 255))
  const g = Math.max(100, Math.floor(Math.random() * 120))
  const b = Math.max(100, Math.floor(Math.random() * 255))
  return `rgba(${r},${g},${b}, ${Math.random()})`
}

const particles = (options) => {
  console.log(options)
  const canvas = document.querySelector('canvas')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const ctx = canvas.getContext('2d')
  console.log(ctx)

  function clearCanvas () {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  class Circle {
    constructor (size, posX, posY) {
      this.size = size
      this.dx = Math.random() >= 0.5 ? -(Math.random() * (config.speed / 10)) : Math.random() * (config.speed / 10)
      this.dy = Math.random() >= 0.5 ? -(Math.random() * (config.speed / 10)) : Math.random() * (config.speed / 10)
      this.posX = posX
      this.posY = posY

      this.radius = config.lineLength

      this.color = getRandomColor()
      // this.color = 'white'
    }

    drawCircle () {
      ctx.beginPath()
      ctx.arc(this.posX, this.posY, (this.size), 0, 2 * Math.PI, false)
      ctx.fillStyle = this.color
      ctx.fill()
    }

    move () {
      if (this.dx + this.posX > canvas.width - this.size || this.dx + this.posX < this.size) {
        this.dx = -this.dx
      }

      if (this.dy + this.posY > canvas.height - this.size || this.dy + this.posY < this.size) {
        this.dy = -this.dy
      }

      this.posX += this.dx
      this.posY += this.dy

      this.drawCircle()
    }
  }

  class Lines {
    drawTriangle (x1, y1, x2, y2, color) {
      ctx.beginPath()
      ctx.lineWidth = config.lineThickness
      ctx.strokeStyle = color
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
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

            if (a > Math.sqrt((x * x) + (y * y))) {
              this.drawTriangle(
                circles[index].posX,
                circles[index].posY,
                nextItem.posX,
                nextItem.posY,
                circles[index].color
              )
            }
          }
        }
      }
    }
  }

  let circles = []

  for (let i = 0; i < config.particles; i++) {
    const randomX = Math.floor(Math.random() * canvas.width)
    const randomY = Math.floor(Math.random() * canvas.height)
    const randomSize = Math.random() * (config.dotSize * 0.9)

    const circle = new Circle(
      randomSize,
      randomX,
      randomY
    )

    circles.push(circle)
  }

  const lines = new Lines()

  const draw = (e) => {
    clearCanvas()

    circles.forEach((circle, index) => {
      circle.move()
    })

    lines.move(circles)

    window.requestAnimationFrame(draw)
  }

  draw()
}
