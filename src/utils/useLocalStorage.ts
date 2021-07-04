/* eslint-disable no-console */
import { useState } from 'react';

interface IaddressBook {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    country: string,
}

export default function useLocalStorage(key: any, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const newAddress = (value: IaddressBook) => {
    try {
      setStoredValue([...storedValue, value]);
      window.localStorage.setItem(key, JSON.stringify([...storedValue, value]));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAddress = (address: IaddressBook) => {
    try {
      setStoredValue(storedValue.filter((element: IaddressBook) => element !== address));
      window.localStorage.setItem(key,
        JSON.stringify(storedValue.filter((element: IaddressBook) => element !== address)));
    } catch (error) {
      console.error(error);
    }
  };

  const updateAddress = (address: IaddressBook) => {
    try {
      const updateBook = [...storedValue.filter(
        (element: IaddressBook) => element.id !== address.id,
      ), address].sort((a, b) => (a.id - b.id));
      setStoredValue(updateBook);
      window.localStorage.setItem(key, JSON.stringify(updateBook));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, newAddress, deleteAddress, updateAddress];
}
