const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');

const PORT = process.env.PORT || 3000;

const app = express();

const todos = [];

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');



app.get('/', (req, res) => {
  res.render('index');
});

app.post('/todos', (req,res) => {
  const { todo } = req.body;
  todos.push(todo);
  const render = pug.compileFile('./views/includes/todolist.pug');
  res.send(render({ todos }));
});

app.delete('/todos/:id', (req,res) => {
  const { id } = req.params;
  const idx = todos.find(t => t === id);
  todos.splice(idx, 1);
  const render = pug.compileFile('./views/includes/todolist.pug');
  res.send(render({ todos }));
});

app.use(express.static(__dirname + '/assets'));

app.listen(PORT);
console.log('root app listening on port: 3000');
