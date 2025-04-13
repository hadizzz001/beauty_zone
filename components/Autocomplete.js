"use client"
// components/AutocompleteComponent.js
import { useEffect, useRef } from 'react';

function AutocompleteComponent({ onAddressSelect }) {
    const autocompleteRef = useRef(null);

    useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(
            autocompleteRef.current,
            { types: ['address'], componentRestrictions: { country: 'au' } }
        );

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            const address = {
                street: '',
                suburb: '',
                state: '',
                country: '',
                postcode: ''
            };

            place.address_components.forEach(component => {
                const types = component.types;
                if (types.includes("street_number")) {
                    address.street = `${component.long_name} `;
                }
                if (types.includes("route")) {
                    address.street += component.long_name;
                }
                if (types.includes("locality")) {
                    address.suburb = component.long_name;
                }
                if (types.includes("administrative_area_level_1")) {
                    address.state = component.short_name;
                }
                if (types.includes("country")) {
                    address.country = component.long_name;
                }
                if (types.includes("postal_code")) {
                    address.postcode = component.long_name;
                }
            });

            onAddressSelect(address);
        });
    }, [onAddressSelect]);

    return (
        <p className="form-row form-row-wide address-field wfacp-form-control-wrapper wfacp-col-left-half wfacp_field_required validate-required" >
            <label htmlFor="shipping_address_1" className="wfacp-form-control-label">
                Street address&nbsp;<abbr className="required" title="required">*</abbr>
            </label>
            <span className="woocommerce-input-wrapper">
                <input
                    ref={autocompleteRef}
                    type="text"
                    className="input-text wfacp-form-control"  
                />
            </span>
            <span className="wfacp_inline_error" data-key="shipping_address_1_field"></span>
        </p>
    );
}

export default AutocompleteComponent;

