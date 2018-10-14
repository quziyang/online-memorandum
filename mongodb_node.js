/***********************
 * 日期：2018/09/12
 * 作者：曲子扬
 * 用途：nodejs中间件，操作MongoDB
 * other: 用于在线备忘录
 */

var _express = require("express");
var _app = _express();

// 引入MongoDB模块，获得客户端对象
var MongoClient = require('mongodb').MongoClient;
// MongoDB连接字符串
var DB_CONN_STR = 'mongodb://127.0.0.1:27017';
_app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// 向数据库集合中插入一条数据并返回
_app.get('/insert-data', function(req, res){
	var _insertMsg = JSON.parse(req.query.insertMsg);

	// 下面这种写法为最新写法
	MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function(err, db){
		// 获得数据库的名字
		var dbo = db.db("notebook");
		// 获得当前数据库的集合
		var _collection = dbo.collection("notelist");
		_collection.insertOne(_insertMsg, function(err, result){
			if(err){throw err}
			res.send(result);
			res.end();
			db.close();
		})
	})
});

// 视频中同名接口写了两个，实际写一个就可以了
// 根据id查询一条数据并返回
/*_app.get('/node-find-id', function(req, res){
	var _findId = JSON.parse(req.query.findIdMsg);
	// 将MongoDB数据中的_id属性的值转换为MongoDB对象ID
	var ObjectID = require('mongodb').ObjectID;
	var _findObjId = ObjectID.createFromHexString( _findId._id );

	// 下面这种写法为最新写法
	MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function(err, db){
		// 获得数据库的名字
		var dbo = db.db("notebook");
		// 获得当前数据库的集合
		var _collection = dbo.collection("notelist");
		_collection.findOne({"_id": _findObjId}, {}, function(err, result){
			if(err){throw err}
			res.send(result);
			res.end();
			db.close();
		})
	})
});*/

// 根据修改后的数据的id更新该条数据
// （更新后姓名为空，内容更新为修改后内容）
_app.get('/node-save-id', function(req, res){
	var _saveId = JSON.parse(req.query.saveIdMsg);
	// 将MongoDB数据中的_id属性的值转换为MongoDB对象ID
	var ObjectID = require('mongodb').ObjectID;
	var _saveObjId = ObjectID.createFromHexString( _saveId._id );

	// 下面这种写法为最新写法
	MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function(err, db){
		// 获得数据库的名字
		var dbo = db.db("notebook");
		// 获得当前数据库的集合
		var _collection = dbo.collection("notelist");
		// 下面这种写法为最新写法
		_collection.updateOne({
								"_id": _saveObjId
							  },{
								$set: {
									"name": _saveId._author,
									"content": _saveId._msg
								}
							  }, function(err, result){
								   if(err){throw err}
								   // 此处返回的对象是更新操作是否成功的对象
								   res.send(result);
								   res.end();
								   db.close();
							  })
	})
});

// 根据id查询一条数据返回
_app.get('/node-find-id', function(req, res){
	var _findId = JSON.parse(req.query.findIdMsg);
	// 将MongoDB数据中的_id属性的值转换为MongoDB对象ID
	var ObjectID = require('mongodb').ObjectID;
	var _findObjId = ObjectID.createFromHexString( _findId._id );

	// 下面这种写法为最新写法
	MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function(err, db){
		// 获得数据库的名字
		var dbo = db.db("notebook");
		// 获得当前数据库的集合
		var _collection = dbo.collection("notelist");
		_collection.findOne({
								"_id": _findObjId,
							}, function(err, result){
								if(err){throw err}
								res.send(result);
								res.end();
								db.close();
							})
	})
});

// 根据id删除一条数据
_app.get('/node-del', function(req, res){
	var _delId = JSON.parse(req.query.delMsg);
	// 将MongoDB数据中的_id属性的值转换为MongoDB对象ID
	var ObjectID = require('mongodb').ObjectID;
	var _delObjId = ObjectID.createFromHexString( _delId._id );

	// 下面这种写法为最新写法
	MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function(err, db){
		// 获得数据库的名字
		var dbo = db.db("notebook");
		// 获得当前数据库的集合
		var _collection = dbo.collection("notelist");
		// 下面这种写法为最新写法
		_collection.deleteOne({
								"_id": _delObjId,
							}, function(err, result){
								if(err){throw err}
								res.send(result);
								res.end();
								db.close();
							})
	})
});

// 返回数据库集合中的数据
_app.get('/node-list', function(req, res){
	MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function(err, db){
		// 获得数据库的名字
		var dbo = db.db("notebook");
		dbo.collection("notelist").find().toArray(function(err, result){
			if(err){throw err}
			res.send(result);
			res.end();
			db.close();
		})
	})
});

_app.listen(3367, function(){
	console.log("3367,vuejs版本购物车中间件");
})