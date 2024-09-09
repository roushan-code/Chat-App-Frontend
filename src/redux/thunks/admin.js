import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../components/constants/config";
import axios from "axios";

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
    try {
      const config = {
        headers: {
            "Content-Type": "application/json",
          },
        withCredentials: true,
      };
  
      const { data } = await axios.post(
        `${server}/api/v1/admin/verify`,
        { secretKey },
        config
      );
      return data.message;
    } catch (error) {
        // console.log(error)
      throw error.response.data.message;
    }
  });
const getAdminDetails = createAsyncThunk("admin/getAdmin", async () => {
    try {
      const { data } = await axios.get(
        `${server}/api/v1/admin/`,
        {withCredentials: true}
      );
      return data.message;
    } catch (error) {
        // console.log(error)
      throw error.response.data.message;
    }
  });
const adminLogout = createAsyncThunk("admin/logout", async () => {
    try {
      const { data } = await axios.get(
        `${server}/api/v1/admin/logout`,
        {withCredentials: true}
      );
      return data.message;
    } catch (error) {
        // console.log(error)
      throw error.response.data.message;
    }
  });

export {adminLogin, getAdminDetails, adminLogout}