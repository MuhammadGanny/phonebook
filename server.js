const express = require('express')
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express()
const PORT =  process.env.PORT || 4000

app.use(express.json());
app.use(cors());
let phonebook = []


app.get('/api/phonebook', (req, res) => {
    res.json(phonebook);
});


app.post('/api/phonebook', (req, res) => {
    const { name, phone, email } = req.body;
    const newContact = {id: uuidv4(), name, phone, email };
    phonebook.push(newContact);
    res.json(newContact);
});

app.put('/api/phonebook/:id', (req, res) => {
    const contactIdToUpdate = req.params.id;
    const updatedData = req.body;
  
    const contactIndex = phonebook.findIndex((contact) => contact.id === contactIdToUpdate);
    if (contactIndex !== -1) {
      phonebook[contactIndex] = { ...phonebook[contactIndex], ...updatedData };
      res.json(phonebook[contactIndex]);
    } else {
      res.status(404).json({ error: 'Contact not found.' });
    }
});

  app.delete('/api/phonebook/:id', (req, res) => {
    const contactIdToDelete = req.params.id;
    const contactIndex = phonebook.findIndex((contact) => contact.id === contactIdToDelete);
    if (contactIndex !== -1) {
      const deletedContact = phonebook.splice(contactIndex, 1)[0];
      res.json(deletedContact);
    } else {
      res.status(404).json({ error: 'Contact not found.' });
    }
});

app.listen(PORT , () => console.log(`server has started on port: ${PORT}`))










//get post patch put delete 

// app.get('/',(req,res) => {
//     console.log("you have reached the home route ")
//     res.status(200).send({"message":"wow get"})
// })

// app.delete('/',(req,res) => {
//     console.log("delete kya karna hai!!!!")
//     res.status(200).send({"message":"wow delete"})
// })