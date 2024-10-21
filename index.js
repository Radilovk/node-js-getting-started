const express = require('express');
const path = require('path');

const app = express();  // Инициализираме приложението
const PORT = process.env.PORT || 5001;

// Масив за временно съхранение на постове (за тестови цели)
let posts = [];

// Middleware за обработка на JSON заявки
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs');

// Главна страница
app.get('/', (req, res) => res.render('pages/index'));

// GET маршрут за извличане на всички постове
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

// POST маршрут за създаване на нов пост
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }

  // Създаваме новия пост и го добавяме към масива
  const newPost = { title, content };
  posts.push(newPost);

  res.status(201).send({ message: 'Post created', post: newPost });
});

// Запускане на сървъра
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
