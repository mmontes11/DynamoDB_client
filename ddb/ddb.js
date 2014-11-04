var ddb = require('dynamodb').ddb({ accessKeyId: 'XXXXX',
									secretAccessKey: 'XXXX' })

exports.ping = function (){
	ddb.listTables({}, function(err, res) {
		if (!err){
			console.log("Conection succesful to DynamoDB");
		}else{
			console.log("Error conecting to DynamoDB: "+$err);
		}
	});
};


exports.listTables = function (req,res,page,title){
	ddb.listTables({}, function(err, resource) {
		console.log(resource);
		if (!err){
			res.render(page, { title: title, tables: resource.TableNames });
		}else{
			console.log("Error retrieving tables:  "+err);
		}
	});
};

exports.createTable = function(req,res){
	var tableName = req.body.tableName;
	var tableID = req.body.tableID;

	ddb.createTable(tableName, { hash: [tableID, ddb.schemaTypes().string],
						tableID: [ tableID, ddb.schemaTypes().string] },
						{read: 10, write: 10},
								function(err, details) {
									if (err){
										console.log('Error creating table: '+err);
									}
									res.render('index', { title: 'DynamoDB Client' });

	});	
}

exports.describe= function(req,res,page,title){
	ddb.listTables({}, function(err, resource) {
		console.log(resource);
		if (!err){
			res.render(page, { title: title, tables: resource.TableNames });
		}else{
			console.log("Error retrieving tables:  "+err);
		}
	});
}

exports.describeTable = function(req,response,page,title){
	var tableName = req.body.tableName;
	ddb.describeTable(tableName, function(err, resource) {
		if (err){
			console.log("Error retrieving table details:  "+err);
		}
		response.render(page, { title: title, tableName: tableName , details: resource });
	});
}
