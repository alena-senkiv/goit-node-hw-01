const path = require('path');
const fs = require('fs/promises');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch {
    throw new Error('Contacts list error');
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    if (!newContact) {
      return null;
    }
    const newContactsList = [...contacts, newContact];
    await updateContacts(newContactsList);
    return newContactsList;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx === -1) {
      return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return removeContact;
  } catch (error) {
    throw error;
  }
}

async function updateContacts(contacts) {
  try {
    const updateContacts = await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts)
    );
    return updateContacts;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
