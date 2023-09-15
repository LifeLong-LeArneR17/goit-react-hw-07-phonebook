import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { async } from "q";

axios.defaults.baseURL = "https://65046298c8869921ae24f6ff.mockapi.io/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (data, thunkAPI) => {
    try {
      const { data } = await axios.get("contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const  addContact = createAsyncThunk(
    "contacts/addContact",
    async(contact, thunkAPI) => {
        try {
            const { data } = await axios.post("contacts", contact);
            return data;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const  deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async(contactID, thunkAPI) => {
        try {
            const { data } = await axios.delete(`/contacts/${contactID}`);
            return data;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
