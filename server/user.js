const express = require('express');
const Router = express.Router();
const utils = require('utility');
const path = require('path');
const fs = require('fs');

const Model = require('./model')
const User = Model.getModel('user')
const Chat = Model.getModel('chat')
const _filter = { password: 0, __v: 0 };

function saltMD5(str) {
	const salt = '!2da@XAxaWErefsdfg(@#/.123';
	const saltStr = str + salt;

	return utils.md5(utils.md5(saltStr))
}

Router.post('/readmsg', function (req, res) {
	const {userId} = req.cookies
	const {from} = req.body

	Chat.update(
		{from, to: userId, read: false}, 
		{'$set': {read: true}}, 
		{'multi': true},
		function (err, doc) {
			if (err) {
				return res.json({code: 1, msg: '修改失败!'})
			}
			
			return res.json({code: 0, num: doc.nModified})
		} )
})

Router.post('/update', function (req, res) {
	const {userId} = req.cookies
	const body = req.body
	User.findByIdAndUpdate(userId, body, function (err, doc) {
		if (err) {
			return res.json({code: 1, msg: '服务器异常'})
		}
		// 为了不获取password字段，使用Object.assign() 获取username和type，然后再和body合并
		var data = Object.assign({}, {
			username: doc.username,
			type: doc.type
		}, body)

		return res.json({code: 0, data})
	})
})

Router.post('/register', function (req, res) {
	const { username, password, type } = req.body; 
	User.findOne({ username }, function (err, doc) {
		if (doc !== null) {
			return res.json({code: 1, msg: '账号已存在!'})
		} else {
			var UserEntity = new User({
				username, password: saltMD5(password), type
			})

			UserEntity.save(function (err, doc) {
				if (err) {
					return res.json({code: 1, msg: '服务器异常'})
				}
				res.cookie('userId', doc._id)
				return res.json({code: 0})
			})
		}
	})
})

Router.post('/signin', function (req, res) {
	const { username, password } = req.body;
	User.findOne({ username, password: saltMD5(password) }, _filter, function (err, doc) {
		if (err) {
			return res.json({code: 1, msg: '服务器异常'})
		}
		if (doc !== null) {
			res.cookie('userId', doc._id)
			return res.json({code: 0, data: doc});
		} else {
			return res.json({code: 1, msg: '账号不存在'})
		}
	})
})

Router.get('/list', function (req, res) {
	const { type } = req.query

	const where = {
		type
	}

	User.find(where, _filter, function (err, doc) {
		if (err) {
			return res.json({code: 1, msg: '服务器异常'})
		}
		return res.json({code: 0, data: doc})
	})
})

Router.get('/info', function (req, res) {
	const { userId } = req.cookies;

	if (!userId) {
		return res.json({code: 1})
	}

	User.findOne({_id: userId}, _filter, function (err, doc) {
		if (err) {
			return res.json({code: 1, msg: '服务器异常!'})
		}

		if (doc) {
			return res.json({code: 0, data: doc})
		} else {
			return res.json({code: 1, msg: '账号不存在!'})
		}
	})
	
})

Router.get('/avatarlist', function (req, res) {
	fs.readdir('./src/components/img', function (err, files) {
		if (err) {
			return res.json({code: 1, msg: '服务器异常'})
		}
		if (!files) {
			return res.json({code: 1, msg: '没有头像图片'})
		}
		var newArr = files.map((v) => {
			return v.split('\.').shift();
		})

		return res.json(newArr)
	})
})

Router.get('/chatmsglist', function (req, res) {
	const {userId} = req.cookies
	
	if (!userId) {
		return res.json({code: 1, msg: 'cookits is loss'})
	}

	User.find({}, function (err, userdocs) {
		let users = {}
		userdocs.forEach( v => {
			users[v._id] = {name: v.username, avatar: v.avatar, company: v.company}
		})

		Chat.find({'$or': [{from: userId}, {to: userId}]}, function (err, doc) {
			if (!err) {
				return res.json({code: 0, msgs: doc, users: users})
			}
		})
	})
})

module.exports = Router;