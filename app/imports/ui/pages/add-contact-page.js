import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Contact, ContactsSchema } from '../../api/contacts/contacts.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';
const createContext = ContactsSchema.namedContext('Add_Contact_Page');

Tracker.autorun(function () {
  console.log('autorum', createContext.isValid(), createContext.invalidKeys());
});



Template.Add_Contact_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = createContext;
});

Template.Add_Contact_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
});


Template.Add_Contact_Page.events({
  'submit .contact-data'(event, instance) {
    event.preventDefault();

    const first = event.target.First.value;
    const last = event.target.Last.value;
    const address = event.target.Address.value;
    const phone = event.target.Telephone.value;
    const email = event.target.Email.value;
    

    const newContactData = { first, last, address, phone, email };
    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that newContactData reflects what will be inserted.
    const cleanData = ContactsSchema.clean(newContactData);
    // Determine validity.
    instance.context.validate(cleanData);
    if (instance.context.isValid()) {
      Contact.insert(cleanData);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});