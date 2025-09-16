import axios from "axios";

export interface MasterPayload {
  id: number;
  name: string;
  password: string;
  server: string;
  period: number;
  percent: number;
  balance: number;
}

export const addMaster = async (payload: MasterPayload) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/masters`, payload);
    return res.data;
  } catch (error) {
    console.error("Error adding masters:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to add masters");
    }
    throw new Error("Failed to add masters");
  }
};
