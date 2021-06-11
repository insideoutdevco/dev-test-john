var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();
const port = config.port;
const tasksRouter = require('./routes/tasks');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.get('/tasks', function(request, response){
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/api', tasksRouter);



/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://52.16.45.178:${port}`)
});