import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Contact, ContactsSchema } from '../../api/contacts/contacts.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';
const createContext = ContactsSchema.namedContext('Edit_Contact_Schema_Page');

Tracker.autorun(function () {
  console.log('autorum', createContext.isValid(), createContext.invalidKeys());
});

Template.Edit_Contact_Page.onCreated(function onCreated() {
  this.subscribe('ContactPublish');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = createContext;
});

Template.Edit_Contact_Page.helpers({
  contactDataField(fieldName) {
    const contactData = Contact.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return contactData && contactData[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
});

Template.Edit_Contact_Page.events({
  'submit .edit-contact-data-form'(event, instance) {
    event.preventDefault();
    const first = event.target.First.value;
    const last = event.target.Last.value;
    const address = event.target.Address.value;
    const phone = event.target.Telephone.value;
    const email = event.target.Email.value;

    const newContactData = { first, last, address, phone, email };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    const cleanData = ContactsSchema.clean(newContactData);
    // Determine validity.
    instance.context.validate(cleanData);
    if (instance.context.isValid()) {
      Contact.update(FlowRouter.getParam('_id'), { $set: cleanData });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Home_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

