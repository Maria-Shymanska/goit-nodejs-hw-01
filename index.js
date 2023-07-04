const argv = require('yargs').argv;

const contacts = require('./contacts');

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      // ...
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      // ... id
      const contact = await contacts.getContactById(id);
      console.table(contact);
      break;

    case 'add':
      // ... name email phone
      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break;

    case 'remove':
      // ... id
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
