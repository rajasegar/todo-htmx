const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

const todos = [];

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');


const renderTodos = () => {
return todos.map(t => {
    return `<li>
      <input type="checkbox">
      ${t}
      <button type="button" hx-delete="/todos/${t}" hx-target="#todo-list">&times;</button>
      </li>`
  }).join('\n');
}
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/todos', (req,res) => {
  const { todo } = req.body;
  todos.push(todo);
  res.send(renderTodos());
});

app.delete('/todos/:id', (req,res) => {
  const { id } = req.params;
  const idx = todos.find(t => t === id);
  todos.splice(idx, 1);
  res.send(renderTodos());
  
});

app.use(express.static(__dirname + '/assets'));

app.listen(PORT);
console.log('root app listening on port: 3000');
