import { Template } from 'meteor/templating';
import { Contact } from '../../api/contacts/contacts.js';

Template.Home_Page.helpers({

  /**
   * @returns {*} All of the Contact documents.
   */
  contactList() {
    return Contact.find();
  },
});
