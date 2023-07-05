const fs = require('fs/promises');
const { nanoid } = require('nanoid');

const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

// TODO: задокументувати кожну функцію
async function listContacts() {
  // Повертає масив контактів.
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const allContacts = await listContacts();
    const result = allContacts.find(item => item.id === String(contactId));
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(item => item.id === String(contactId));
    if (index === -1) return null;

    const result = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  //  Повертає об'єкт доданого контакту.
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
