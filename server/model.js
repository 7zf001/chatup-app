// require mongoose
const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development'
// connect mongodb
var DB_URL;

DB_URL = 'mongodb://127.0.0.1:27017/chatup-app';

if (env === 'production') {
	DB_URL = 'mongodb://appadmin:App123$@127.0.0.1:27017/chatup-app';	
}
console.log(DB_URL)
mongoose.connect(DB_URL);

// listen 监听连接成功之后console.log
mongoose.connection.on('connected', function () {
	console.log('mongo connect success!')
});

// 建立表
const models = {
	user: {
		'username': {type: String, require: true},
		'password': {type: String, require: true},
		'type': {type: String, require: true},
		'company': String,
		'desc': String,
		'money': String,
		'avatar': String,
		'title': String,
	},
	chat: {
		'chatid': {type: String, require: true},
		'from': {type: String, require: true},
		'to': {type: String, require: true},
		'content': {type: String, require: true,default: ''},
		'read': {type: Boolean, default: false},
		'create_time': {type: Number, default: new Date().getTime()}
	}
}

for (let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports =  {
	getModel: function(name) {
		return mongoose.model(name)
	}
}
