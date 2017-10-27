import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Contact = new Mongo.Collection('contact');

/**
 * Create the schema for Contact
 */
export const ContactsSchema = new SimpleSchema({
  first: {
    label: 'first',
    type: String,
    optional: false,
    max: 20,
  },
  last: {
    label: 'last',
    type: String,
    optional: false,
    max: 20,
  },
  address: {
    label: 'address',
    type: String,
    optional: false,
    max: 50,
  },
  phone: {
    label: 'phone',
    type: String,
    optional: false,
    max: 12,
    regEx: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
  },
  email: {
    label: 'email',
    type: String,
    optional: false,
    max: 30,
    regEx: SimpleSchema.RegEx.Email,
  },
});

Contact.attachSchema(ContactsSchema);
