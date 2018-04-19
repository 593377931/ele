const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const rootPath = path.join(__dirname, '../')

const appDate = require(path.join(rootPath, './data.json'))

app.set('x-powered-by', false)

app.use(express.static(path.join(rootPath, './dist')))
app.get('/', (req, res) => {
  console.log('root')
  res.sendFile('./dist/index.html', {
    root: rootPath
  })
})

app.get('/api/:part', (req, res) => {
  res.send({
    errno: 0,
    data: appDate[req.params.part]
  })
})

app.listen('9999', () => console.log('listening on 9999'))