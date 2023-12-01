import { LightningElement, api, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.MobilePhone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import STREET_FIELD from '@salesforce/schema/Contact.MailingStreet';
import CITY_FIELD from '@salesforce/schema/Contact.MailingCity';
import STATE_FIELD from '@salesforce/schema/Contact.MailingState';
import ZIP_FIELD from '@salesforce/schema/Contact.MailingPostalCode';
import COUNTRY_FIELD from '@salesforce/schema/Contact.MailingCountry';
import PHOTO_URL_FIELD from '@salesforce/schema/Contact.Contact_Photo_URL__c';
import DEFAULT_PIC from '@salesforce/resourceUrl/defaultContactPhoto';

const fields = [NAME_FIELD, TITLE_FIELD, PHONE_FIELD, EMAIL_FIELD, STREET_FIELD, CITY_FIELD, STATE_FIELD, ZIP_FIELD, COUNTRY_FIELD, PHOTO_URL_FIELD];

export default class contactInfo extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    contact;

    connectedCallback() {
        console.log('Record Id:', this.recordId);
    }

    handleContactChange() {
        console.log('Contact Data:', JSON.stringify(this.contact.data, null, 2));
    }

    get name() {
        const name = getFieldValue(this.contact.data, NAME_FIELD);
        console.log('Name:', name);
        return name;
    }

    get title() {
        const title = getFieldValue(this.contact.data, TITLE_FIELD);
        console.log('Title: ', title);
        return title;
    }

    get phone() {
        const phone = getFieldValue(this.contact.data, PHONE_FIELD);
        console.log('Phone:', phone);
        return phone;
    }

    get email() {
        const email = getFieldValue(this.contact.data, EMAIL_FIELD);
        console.log('Email:', email);
        return email;
    }

    get street() {
        const street = getFieldValue(this.contact.data, STREET_FIELD);
        console.log('Street:', street);
        return street;
    }

    get city() {
        const city = getFieldValue(this.contact.data, CITY_FIELD);
        console.log('City:', city);
        return city;
    }

    get state() {
        const state = getFieldValue(this.contact.data, STATE_FIELD);
        console.log('State:', state);
        return state;
    }

    get zipCode() {
        const zipCode = getFieldValue(this.contact.data, ZIP_FIELD);
        console.log('Zip Code:', zipCode);
        return zipCode;
    }

    get country() {
        const country = getFieldValue(this.contact.data, COUNTRY_FIELD);
        console.log('Country:', country);
        return country;
    }

    get cityState() {
        const cityState = [this.city, this.state];
        console.log('City State:', cityState);
        return cityState.filter(value => value !== null && value !== "").join(', ');
    }

    get fullAddress() {
        const addressParts = [this.street, this.city, this.state, this.zipCode, this.country];

        // Filter out null or empty values
        const validAddressParts = addressParts.filter(value => value !== null && value !== "");

        // If all address parts are valid, join them; otherwise, return an empty string
        const fullAddress = validAddressParts.length === addressParts.length ? validAddressParts.join(', ') : '';
        console.log('Full Address:', fullAddress);
        return fullAddress;
    }

    get photoUrl() {
        const photoUrl = getFieldValue(this.contact.data, PHOTO_URL_FIELD);
        console.log('Photo URL:', photoUrl);
        return !photoUrl ? DEFAULT_PIC : photoUrl;
    }
}
