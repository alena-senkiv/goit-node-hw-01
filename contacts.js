const path = require('path');
const fs = require('fs/promises');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  const newContactsList = [...contacts, newContact];
  await updateContacts(newContactsList);
  return newContactsList;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
}

async function updateContacts(contacts) {
  const updateContacts = await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts)
  );
  return updateContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
