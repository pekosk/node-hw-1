const fs = require('fs/promises')
const path = require('path')
const { randomUUID } = require('crypto')
const ct = require('./db/contacts.json')

const readContent = async () => {
    const content = await fs.readFile(path.join(__dirname, 'db', 'contacts.json'), 'utf8',)
    const result = JSON.parse(content)
    return result
}

async function listContacts() {
    return await readContent()
}

async function getContactById(contactId) {
    const contacts = await readContent()
    const [contact] = contacts.filter(contact => contact.id === contactId)
    return contact
}

async function removeContact(contactId) {
    const contact = await getContactById(contactId);
    const contactsList = await listContacts();
    const newContactsList = contactsList.filter(contact => contact.id !== contactId);
    await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'), JSON.stringify(newContactsList, null, 2),
    )
    return contact
}

async function addContact(name, email, phone) {
    const contacts = await readContent()
    const newContact = { id: randomUUID(), name, email, phone }
    contacts.push(newContact)
    await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'), JSON.stringify(contacts, null, 2),
    )
    return newContact
}

module.exports = { listContacts, getContactById, removeContact, addContact }