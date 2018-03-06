const express require('express')
const bodyParser require('body-parser')
const cookieParser require('cookie-parser')
const path require('path')
const userRouter require('./user.js')
const Model require('./model')

/*import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'*/

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const Chat = Model.getModel('chat')

/*Chat.remove({}, function (err, doc) {
	
})*/
// io 是全局的请求
io.on('connection', function (socket) { // socket是当前这个链接的请求
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
	return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function () {
	console.log('Node app start at port 9093')
})