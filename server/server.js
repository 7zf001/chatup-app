const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const userRouter = require('./user.js')
const Model = require('./model')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const Chat = Model.getModel('chat')
const PORT = process.env.PORT || 9093;

require('asset-require-hook')({
  extensions: ['jpg', 'jpeg', 'png']
})

import csshook from 'css-modules-require-hook/preset' // import hook before routes
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import store from '../src/store/index'
import App from '../src/app'
import mainfest from '../build/asset-manifest.json'

// io 是全局的请求
io.on('connection', function (socket) { 
// socket是当前这个链接的请求
	socket.on('sendmsg', function (data) {
		// 用io进行广播, 将data发送到全局
		const {from, to, content} = data
		let createDate = {
			chatid: [from, to].sort().join('_'),
			from,
			to,
			content,
		}
		Chat.create(createDate, function (err, doc) {
			if (!err) {
				io.emit('receivemsg', Object.assign({}, doc._doc))
			}
		})
	})
})


app.use(cookieParser())

app.use(bodyParser.json())

app.use('/user', userRouter);

// 进行路由拦截
app.use(function (req, res, next) {
	if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
		return next()
	}
	
	let context = {}

	res.write(`
<!DOCTYPE html>
<html lang="ch">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <title>乱up廿四</title>
    <link rel="stylesheet" href="/${mainfest['main.css']}" />
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">
`)

	const markupStream = renderToNodeStream(
		<Provider store={store}>
			<StaticRouter
				location={req.url}
				context={context}
			>
				<App />
			</StaticRouter>
		</Provider>
	)
	
	markupStream.pipe(res, {end: false})
	markupStream.on('end', function () {
		res.write(`</div>
    <script src="/${mainfest['main.js']}"></script>
  </body>
</html>`)
		res.end()
	})

	//res.send(layout)

	//return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(PORT, function () {
	console.log('Node app start at port 9093')
})