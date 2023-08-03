const express = require('express')
const app = express()
const PORT =  4000

app.use(express.json());

let phonebook = [
    {
      name: 'John Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
    },
    {
      name: 'Jane Smith',
      phone: '9876543210',
      email: 'jane.smith@example.com',
    },
];

app.get('/api/phonebook', (req, res) => {
    res.json(phonebook);
});


app.post('/api/phonebook', (req, res) => {
    const { name, phone, email } = req.body;
    const newContact = { name, phone, email };
    phonebook.push(newContact);
    res.json(newContact);
});

app.put('/api/phonebook/:phone', (req, res) => {
    const phoneToUpdate = req.params.phone;
    const updatedData = req.body;
  console.log(phoneToUpdate,req.params)
    const contactIndex = phonebook.findIndex((contact) => contact.phone === phoneToUpdate);
    console.log(contactIndex)
    if (contactIndex !== -1) {
      phonebook[contactIndex] = { ...phonebook[contactIndex], ...updatedData };
      res.json(phonebook[contactIndex]);
    } else {
      res.status(404).json({ error: 'Contact not found.' });
    }
});

app.delete('/api/phonebook/:phone', (req, res) => {
    const phoneToDelete = req.params.phone;
    const contactIndex = phonebook.findIndex((contact) => contact.phone === phoneToDelete);
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