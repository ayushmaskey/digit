import { Contacts } from '../../api/contacts/contacts.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Contacts to pre-fill the Collection.
 * @type {*[]}
 */
const contactSeeds = [
  { first: 'philip', last: 'johnson', address: '1680 east-west rd', phone: '808-55-5555', email: 'johnson@hawaii.edu' },
  { first: 'henri', last: 'casanova', address: '1681 east-west rd', phone: '808-55-5556', email: 'henric@hawaii.edu' },
  { first: 'kim', last: 'binsted', address: '1682 east-west rd', phone: '808-55-5557', email: 'binsted@hawaii.edu' },
  { first: 'george', last: 'lee', address: '1683 east-west rd', phone: '808-55-5558', email: 'glee@hawaii.edu' },
];

/**s
 * Initialize the Contact collection if empty with seed data.
 */
if (Contacts.find().count() === 0) {
  _.each(contactSeeds, function seedContacts(contact) {
    Contacts.insert(contact);
  });
}
