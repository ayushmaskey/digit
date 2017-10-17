import { Contacts } from '../../api/contacts/contacts';
import { _ } from 'meteor/underscore';

const contactsSeed = [
  { First: 'Philip', Last: 'Johnson', Address: '1680 East-West', Phone: '808-956-3489', Email: 'johnson@hawaii.edu' },
  { First: 'Henri', Last: 'Casanova', Address: '1680 East-West Rd', Phone: '808-956-2649', Email: 'henric@hawaii.edu' },
  { First: 'Kim', Last: 'Binsted', Address: '1680 East-West Rd', Phone: '808-956-6107', Email: 'binsted@hawaii.edu' },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Contacts.find().count() === 0) {
  _.each(contactsSeed, function seedStuffs(stuff) {
    Contacts.insert(stuff);
  });
}
