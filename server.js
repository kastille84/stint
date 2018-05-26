const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')

app.use(cors());
// Parser
app.use(express.json());
app.use(express.urlencoded({extented: false}));

const apiRoutes = require('./server/routes/api.js');
app.use('/api', apiRoutes);

//# 
app.use(express.static(path.join(__dirname +'/client', 'build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
//~#

const port = 5000;

app.listen(process.env.PORT || port, () => `Server running`);