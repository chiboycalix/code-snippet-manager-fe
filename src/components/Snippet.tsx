import Highlight from 'react-highlight'
import './styles/snippet.css'
// import 'highlight.js/styles/atom-one-dark.css'
const Snippet = () => {
  return (
    <>
    <Highlight className="go snippet">
      {
`
package main

import (
    "log"
    "time"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/limiter"
)

func main() {
  app := fiber.New()

  // 3 requests per 10 seconds max
  app.Use(limiter.New(limiter.Config{
      Expiration: 10 * time.Second,
      Max:      3,
  }))

  // ...

  log.Fatal(app.Listen(":3000"))
}
          `
      }
    </Highlight>
    </>
  )
}

export default Snippet