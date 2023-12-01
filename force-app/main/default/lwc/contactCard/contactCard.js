import { LightningElement, api, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.MobilePhone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import STREET_FIELD from '@salesforce/schema/Contact.MailingStreet';
import CITY_FIELD from '@salesforce/schema/Contact.MailingCity';
import STATE_FIELD from '@salesforce/schema/Contact.MailingState';
import ZIP_FIELD from '@salesforce/schema/Contact.MailingPostalCode';
import COUNTRY_FIELD from '@salesforce/schema/Contact.MailingCountry';
import PHOTO_URL_FIELD from '@salesforce/schema/Contact.Contact_Photo_URL__c';
import DEFAULT_PIC from '@salesforce/resourceUrl/defaultContactPhoto';

const fields = [NAME_FIELD, PHONE_FIELD, EMAIL_FIELD, STREET_FIELD, CITY_FIELD, STATE_FIELD, ZIP_FIELD, COUNTRY_FIELD, PHOTO_URL_FIELD];

export default class contactInfo extends LightningElement {
    @api recordId;

    @wire(getRecord, {recordId: '$recordId', fields})
    contact;

    get name() {
        return getFieldValue(this.contact.data, NAME_FIELD);
    }

    get phone() {
        return getFieldValue(this.contact.data, PHONE_FIELD);
    }

    get email() {
        return getFieldValue(this.contact.data, EMAIL_FIELD);
    }
    
    get street() {
        return getFieldValue(this.contact.data, STREET_FIELD);
    }

    get city() {
        return getFieldValue(this.contact.data, CITY_FIELD);
    }

    get state() {
        return getFieldValue(this.contact.data, STATE_FIELD);
    }

    get zipCode() {
        return getFieldValue(this.contact.data, ZIP_FIELD);
    }

    get country() {
        return getFieldValue(this.contact.data, COUNTRY_FIELD)
    }

    get cityState() {
        const cityState = [this.city, this.state];
        return cityState.filter(value => value !== null && value !== "").join(', ');
    }

    get fullAddress() {
        const addressParts = [this.street, this.city, this.state, this.zipCode, this.country];

        // Filter out null or empty values
        const validAddressParts = addressParts.filter(value => value !== null && value !== "");

        // If all address parts are valid, join them; otherwise, return an empty string
        return validAddressParts.length === addressParts.length ? validAddressParts.join(', ') : '';
    }


    get photoUrl() {
        const photoUrl = getFieldValue(this.contact.data, PHOTO_URL_FIELD);
        return !photoUrl ? DEFAULT_PIC :getFieldValue(this.contact.data, PHOTO_URL_FIELD);
    }
}