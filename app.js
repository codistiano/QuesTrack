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

app.get('/newNote', (req, res) => {
    res.render('new')
})

app.get('/day/:number', (req, res) => {
    res.render('note')
})

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}, http://localhost:${port}`);
});




