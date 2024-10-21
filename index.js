const express = require('express');
const path = require('path');

const app = express();  // Инициализираме приложението
const PORT = process.env.PORT || 5001;

// Middleware за обработка на JSON заявки
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs');

// Главна страница
app.get('/', (req, res) => res.render('pages/index'));

// API за постове
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }
  res.status(201).send({ message: 'Post created', post: { title, content } });
});

// Запускане на сървъра
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
