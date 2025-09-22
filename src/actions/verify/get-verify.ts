"use server";

import axios from "axios";

export async function getVerifies() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/verify`);
    return res.data;
  } catch (error) {
    console.error("Error fetching verify:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to fetch verify");
    }
    throw new Error("Failed to fetch verify");
  }
}
