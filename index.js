const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://OxanaErmolemko:webdevblog@react-blog-dc3o4.mongodb.net/test?retryWrites=true&w=majority',
        {useNewUrlParser: true}).then(()=> console.log('DB connected'))
                                .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('hello world')
});

app.listen(5000);