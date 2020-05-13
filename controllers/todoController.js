var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var urlencodedparser = bodyParser.urlencoded({extended:false});

mongoose.connect('mongodb://localhost/todoDB', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to db !');
});

var todoSchema = new mongoose.Schema({
    item : String
});
var todoModel = mongoose.model('todoModel', todoSchema);
/* var itemOne = todoModel({item : 'pdhna hai ml'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
}); */

//var data = [{item : 'eat munchkin'}, {item : 'do hw'}, {item : 'pet dog'}, {item : 'cut nails'}]; 



module.exports = function(app){

app.get('/todo', function(req,res){
    todoModel.find({},function(err, data){
        if (err) throw err;
        console.log('GET REQ');
        res.render('todo', {todos : data});
    });
});

app.post('/todo', urlencodedparser, function(req,res){
    console.log('POST REQ');
    //console.log('req body:-------',req.body);
    var newTodo = todoModel(req.body).save(function(err,data){
        if (err) throw err;
        res.json(data);
    });  

});

app.delete('/todo/:item', function(req,res){
    console.log('DELETE REQ',req.params.item);
    todoModel.find({item : req.params.item.replace(/ /g, ' ')}).deleteOne(function(err,data){
        if (err) throw err;
        res.json(data);
        //return todo.item.replace(/ /g, ' ') !== req.params.item;
    });
    
    
});

};
