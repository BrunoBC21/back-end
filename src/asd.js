const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const clienteRouter = require('./routes/clienteRouter');


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/beac', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.log('Database connection error:', err);
  });

app.use('/api/cliente', clienteRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});