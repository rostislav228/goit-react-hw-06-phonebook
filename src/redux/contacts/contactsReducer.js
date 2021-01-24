import { combineReducers, createReducer } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  setFilter,
  setContact,
} from "./contactsAction";

const test = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const contactReducer = createReducer(test, {
  [addContact]: (state, { payload }) => [...state, payload],

  [deleteContact]: (state, { payload }) => {
    const newContactsArray = state.filter(({ id }) => id !== payload);
    return newContactsArray;
  },

  [setContact]: (_, { payload }) => payload,
});

const filterReducer = createReducer("", {
  [setFilter]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  contacts: contactReducer,
  filter: filterReducer,
});

export default contactsReducer;
