const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
// Parser
app.use(express.json());
app.use(express.urlencoded({extented: false}));

const apiRoutes = require('./server/routes/api.js');
app.use('/api', apiRoutes);

// app.get('/api/customers', (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];

//   res.json(customers);
// });

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);