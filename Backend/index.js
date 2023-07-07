const connectToMongo=require('./db');
const express = require('express');
connectToMongo();
const app = express();
const port = 5000;
var cors = require('cors')
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  // res.send('Hello World!')
})

// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

