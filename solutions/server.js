let express = require('express');
let bodyParser = require('body-parser');
let app = express(); 


var feedbackitems = [
    {"user":"john", "feedback":"bla", "rating":"34"},
    {"user":"john1", "feedback":"bla", "rating":"34"},
    {"user":"john2", "feedback":"bla", "rating":"34"},
    {"user":"john3", "feedback":"bla", "rating":"34"},
    {"user":"john4", "feedback":"bla", "rating":"34"}
];

app.use(bodyParser.json());

app.get('/items', (req, res) => {
    res.end(JSON.stringify(feedbackitems));
});

app.post('/item', (req, res) => {
    console.log(req.body);
    feedbackitems.push(req.body);
    res.end("OK");
});

app.use(express.static("."));

app.get('*', function(req, res){
    res.sendfile('index.html');
  });

app.listen(8080, ()=>{
    console.log("we are listening...");
});