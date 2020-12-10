// import express (after npm install express)
const express = require('express');
const GIFEncoder = require('gif-encoder-2')
const { createCanvas } = require('canvas')
const { writeFile } = require('fs')
const path = require('path')
// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 3000;

// create a route for the app
app.get('/', (req, res) => {
  const size = 200
  const half = size / 2

  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  function drawBackground() {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)
  }

  const encoder = new GIFEncoder(size, size)
  encoder.setDelay(500)
  encoder.start()

  drawBackground()
  ctx.fillStyle = '#ff0000'
  ctx.fillRect(0, 0, half, half)
  encoder.addFrame(ctx)

  drawBackground()
  ctx.fillStyle = '#00ff00'
  ctx.fillRect(half, 0, half, half)
  encoder.addFrame(ctx)

  drawBackground()
  ctx.fillStyle = '#0000ff'
  ctx.fillRect(half, half, half, half)
  encoder.addFrame(ctx)

  drawBackground()
  ctx.fillStyle = '#ffff00'
  ctx.fillRect(0, half, half, half)
  encoder.addFrame(ctx)

  encoder.finish()

  const buffer = encoder.out.getData()
  writeFile(path.join(__dirname, 'output', 'gif.gif'), buffer, error => {
    console.log(error)
    res.json({ 'error': 'error' })
  })

  res.statusCode = 200
  res.json({ data: 'success' })
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
