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
const express = require('express');
const mysql = require('mysql');  // Импорт на MySQL библиотеката
const app = express();
const PORT = process.env.PORT || 5001;

// Свързване с базата данни MySQL
const db = mysql.createConnection({
  host: 'localhost',   // Ако базата данни е на същия сървър, използвай localhost
  user: 'radilovk_bot',  // Твоето потребителско име за базата данни
  password: 'Legion69.#',  // Твоята парола за базата данни
  database: 'radilovk_Diets'  // Името на базата данни
});

// Свързване към базата данни
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.json());  // Middleware за JSON данни

// Примерен маршрут за тестване на връзката
app.get('/test', (req, res) => {
  res.send('MySQL connection is working!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

