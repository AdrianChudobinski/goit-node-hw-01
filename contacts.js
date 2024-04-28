const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading contacts file:', err);
      return;
    }
    try {
      const contacts = JSON.parse(data);
      console.table(contacts);
    } catch (error) {
      console.error('Error parsing contacts JSON:', error);
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading contacts file:', err);
      return;
    }
    try {
      const contacts = JSON.parse(data);
      const contact = contacts.find(contact => contact.id === contactId);
      if (contact) {
        console.table([contact]);
      } else {
        console.log('Contact not found.');
      }
    } catch (error) {
      console.error('Error parsing contacts JSON:', error);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading contacts file:', err);
      return;
    }
    try {
      let contacts = JSON.parse(data);
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      if (contacts.length === updatedContacts.length) {
        console.log('Contact not found.');
        return;
      }
      fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), err => {
        if (err) {
          console.error('Error writing contacts file:', err);
          return;
        }
        console.log('Contact removed successfully.');
      });
    } catch (error) {
      console.error('Error parsing contacts JSON:', error);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading contacts file:', err);
      return;
    }
    let contacts = [];
    if (!err) {
      try {
        contacts = JSON.parse(data);
      } catch (error) {
        console.error('Error parsing contacts JSON:', error);
        return;
      }
    }
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), err => {
      if (err) {
        console.error('Error writing contacts file:', err);
        return;
      }
      console.log('Contact added successfully.');
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
