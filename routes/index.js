var ddb = require('../ddb/ddb.js');

exports.index = function(req, res){
 	res.render('index', { title: 'DynamoDB Client' });
};

exports.list = function(req, res){
	ddb.listTables(req, res,'list','List Tables'); 
};

exports.create = function(req, res){
	res.render('create', { title: 'Create Table' });
};

exports.createTable = function(req, res){
	ddb.createTable(req,res);
};

exports.describe = function(req, res){
	ddb.describe(req, res,'describe','Describe Table');
};


exports.describeTable = function(req, res){
	ddb.describeTable(req,res,'tableDetails','Table Details');
};