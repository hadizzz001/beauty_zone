"use client"
// components/AddressForm.js
import React, { useState } from 'react';
import AutocompleteComponent from './Autocomplete';

function AddressForm({ onAddressData }) {
    const [address, setAddress] = useState({
        suburb: '',
        country: '',
        state: '',
        postcode: '',
        street: '',
    });

    const handleAddressSelect = (selectedAddress) => {
        setAddress({
            suburb: selectedAddress.suburb || '',
            country: selectedAddress.country || '',
            state: selectedAddress.state || '',
            postcode: selectedAddress.postcode || '',
            street: selectedAddress.street || ''
        });
        if (onAddressData) {  // Check if onAddressData is defined before using it
            onAddressData(selectedAddress);
        }
    }

    return (
        <>
           
            <AutocompleteComponent onAddressSelect={handleAddressSelect} />

            <p className="form-row form-row-wide address-field wfacp-form-control-wrapper wfacp-col-left-half wfacp_field_required validate-required" hidden>
                <label htmlFor="suburb" className="wfacp-form-control-label">
                    Street&nbsp;<abbr className="required" title="required">*</abbr>
                </label>
                <span className="woocommerce-input-wrapper">
                    <input type="text" className="input-text wfacp-form-control" name="street" id="street" placeholder="Street *" value={address.street} readOnly />
                </span>
            </p>
            <p className="form-row form-row-wide address-field wfacp-form-control-wrapper wfacp-col-left-half wfacp_field_required validate-required">
                <label htmlFor="suburb" className="wfacp-form-control-label">
                    Suburb&nbsp;<abbr className="required" title="required"></abbr>
                </label>
                <span className="woocommerce-input-wrapper">
                    <input type="text" className="input-text wfacp-form-control" name="suburb" id="suburb" placeholder="Suburb" value={address.suburb} readOnly />
                </span>
            </p>

            <p className="form-row form-row-wide address-field wfacp-form-control-wrapper wfacp-col-left-third wfacp_field_required validate-required">
                <label htmlFor="country" className="wfacp-form-control-label">
                    Country&nbsp;<abbr className="required" title="required">*</abbr>
                </label>
                <span className="woocommerce-input-wrapper">
                    <input type="text" className="input-text wfacp-form-control" name="country" id="country" placeholder="Country" value={address.country} readOnly />
                </span>
            </p>

            <p className="form-row form-row-wide address-field wfacp-form-control-wrapper wfacp-col-left-third wfacp_field_required validate-required">
                <label htmlFor="state" className="wfacp-form-control-label">
                    State&nbsp;<abbr className="required" title="required">*</abbr>
                </label>
                <span className="woocommerce-input-wrapper">
                    <input type="text" className="input-text wfacp-form-control" name="state" id="state" placeholder="State" value={address.state} readOnly />
                </span>
            </p>

            <p className="form-row form-row-wide address-field wfacp-form-control-wrapper wfacp-col-left-third wfacp_field_required validate-required">
                <label htmlFor="postcode" className="wfacp-form-control-label">
                    Postcode&nbsp;<abbr className="required" title="required">*</abbr>
                </label>
                <span className="woocommerce-input-wrapper">
                    <input type="text" className="input-text wfacp-form-control" name="postcode" id="postcode" placeholder="Postcode" value={address.postcode} readOnly />
                </span>
            </p>
        </>
    );
}

export default AddressForm;


