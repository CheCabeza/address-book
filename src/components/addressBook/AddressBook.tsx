import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import { getNames } from 'country-list';
import { VscNewFile } from 'react-icons/vsc';
import { RiDeleteBinFill, RiEditBoxFill } from 'react-icons/ri';
import useLocalStorage from '../../utils/useLocalStorage';
import './AddressBook.scss';
import 'react-dropdown/style.css';

export default function AddressBook() {
  const [myBook, newAddress, deleteAddress, updateAddress] = useLocalStorage('newBook', []);
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const countries = getNames();

  function addAddress() {
    newAddress({
      id: myBook.length,
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      country: countryValue,
    });

    setFirstNameValue('');
    setLastNameValue('');
    setEmailValue('');
    setCountryValue('');
  }

  return (
    <section className="addressBook">
      <div className="addressBook__newAddress">
        <input type="text" placeholder="First Name" className="newFirstName-input" onChange={(event) => setFirstNameValue(event.target.value)} value={firstNameValue} />
        <input type="text" placeholder="Last Name" className="newLastName-input" onChange={(event) => setLastNameValue(event.target.value)} value={lastNameValue} />
        <input type="text" placeholder="Email" className="newEmail-input" onChange={(event) => setEmailValue(event.target.value)} value={emailValue} />
        <Dropdown options={countries} onChange={(event) => setCountryValue(event.value)} value={countryValue} placeholder="Country" />
        <VscNewFile size="40px" className="newAddress-button" onClick={() => addAddress()} />
      </div>
      <ul className="storedBook__list">
        {
            myBook.length
              ? myBook.map((Address: any) => (

                <div key={Address.name} className="address-info">
                  <input
                    className="first-name"
                    key={Address.index}
                    contentEditable="false"
                    value={Address.firstName}
                    readOnly
                  />
                  <input
                    className="last-name"
                    key={Address.index}
                    contentEditable="false"
                    value={Address.lastName}
                    readOnly
                  />
                  <input
                    className="email"
                    key={Address.index}
                    contentEditable="false"
                    value={Address.email}
                    readOnly
                  />
                  <input
                    className="country"
                    key={Address.index}
                    contentEditable="false"
                    value={Address.country}
                    readOnly
                  />
                  <RiEditBoxFill key={`update-btn${Address.id}`} size="40px" className="update-btn" onClick={() => { updateAddress(Address); }} />
                  <RiDeleteBinFill key={`delete-btn${Address.id}`} size="40px" className="trash-btn" onClick={() => { deleteAddress(Address); }} />
                </div>

              ))
              : null
            }

      </ul>
    </section>

  );
}
