import { Contact } from '../../api/contacts/contacts.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Contact', function publishContact() {
  return Contact.find();
});
