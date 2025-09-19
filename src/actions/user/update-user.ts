"use server";

import axios from "axios";

import { AddUserPayload } from "./add-user";

export const updateUser = async (payload: AddUserPayload) => {
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/followers`, payload);
    return res.data;
  } catch (error) {
    console.error("Error update follower:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to update follower");
    }
    throw new Error("Failed to update follower");
  }
};
