import express from 'express';
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the public folder as the static folder
app.use(express.static('public'));

// Define the routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});




