import React, { useState } from 'react';
import useLocalStorage from '../../utils/useLocalStorage';

export default function AddressBook() {
  const [myBook, newAddress, deleteAddress, updateAddress] = useLocalStorage('newBook', []);
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [countryValue, setCountryValue] = useState('');

  function addAddress() {
    newAddress({
      id: myBook.length,
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      country: countryValue,
    });

    setFirstNameValue('');
  }

  return (
    <section className="addressBook">
      <div className="addressBook__newAddress">
        <input type="text" placeholder="First Name" className="newFirstName-input" onChange={(event) => setFirstNameValue(event.target.value)} value={firstNameValue} />
        <input type="text" placeholder="Last Name" className="newLastName-input" onChange={(event) => setLastNameValue(event.target.value)} value={lastNameValue} />
        <input type="text" placeholder="Email" className="newEmail-input" onChange={(event) => setEmailValue(event.target.value)} value={emailValue} />
        <input type="text" placeholder="Country" className="newCountry-input" onChange={(event) => setCountryValue(event.target.value)} value={countryValue} />
        <button type="button" data-testid="addAddress-button" className="newAddress-button" onClick={() => addAddress()}>Add</button>
      </div>
      <div className="addressBook__storedBook">
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
                  <button key={Address.id} type="button" className="update-btn" onClick={() => { updateAddress(Address); }}>
                    <p>update</p>
                  </button>
                  <button key={Address.id} type="button" className="trash-btn" onClick={() => { deleteAddress(Address); }}>
                    <p>delete</p>
                  </button>
                </div>

              ))
              : null
            }

        </ul>
      </div>
    </section>

  );
}
