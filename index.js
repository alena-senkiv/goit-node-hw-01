const { program } = require('commander');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      try {
        const contacts = await listContacts();
        console.log(contacts);
      } catch (error) {
        console.error(error.message);
      }
      break;

    case 'get':
      try {
        const contact = await getContactById(id);
        if (!contact) {
          throw new Error(`Contact with id=${id} not found`);
        }
        console.log(contact);
      } catch (error) {
        console.error(error.message);
      }

      break;

    case 'add':
      try {
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
      } catch (error) {
        console.error(error.message);
      }
      break;

    case 'remove':
      try {
        const removedContact = await removeContact(id);
        if (!removedContact) {
          throw new Error(`Contact with id=${id} not found`);
        }
        console.log(removedContact);
      } catch (error) {
        console.error(error.message);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
