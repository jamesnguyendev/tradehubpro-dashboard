"use server";

import axios from "axios";

export const DeleteMaster = async (id: number) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/masters`, { data: { id } });
  } catch (error) {
    console.error("Error delete masters:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to delete masters");
    }
    throw new Error("Failed to delete masters");
  }
};
