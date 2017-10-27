import { Contact } from '../../api/contacts/contacts.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Contact to pre-fill the Collection.
 * @type {*[]}
 */
const contactSeeds = [
  {
    first: 'Philip',
    last: 'Johnson',
    address: '1680 East-West Rd',
    phone: '808-555-5555',
    email: 'johnson@hawaii.edu',
  },
  {
    first: 'Henri',
    last: 'Casanova',
    address: '1680 East-West Rd',
    phone: '808-555-5556',
    email: 'henric@hawaii.edu',
  },
  {
    first: 'Kim',
    last: 'Binsted',
    address: '1680 East-West Rd',
    phone: '808-555-5557',
    email: 'binsted@hawaii.edu',
  },
  {
    first: 'George',
    last: 'Lee',
    address: '1680 East-West Rd',
    phone: '808-555-5558',
    email: 'glee@hawaii.edu',
  },
];

Contact._ensureIndex({ first: 1, last: 1 }, { unique: true });

/**
 * Initialize the Contact collection if empty with seed data.
 */
if (Contact.find().count() === 0) {
  _.each(contactSeeds, function seedContacts(contact) {
    Contact.insert(contact);
  });
}
