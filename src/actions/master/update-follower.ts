"use server";

import axios from "axios";

import { MasterPayload } from "./add-master";

export const updateMaster = async (payload: MasterPayload) => {
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/masters`, payload);
    return res.data;
  } catch (error) {
    console.error("Error update masters:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to update masters");
    }
    throw new Error("Failed to update masters");
  }
};
