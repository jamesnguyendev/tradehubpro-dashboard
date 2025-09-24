import axios from "axios";

export async function handleRejected(id: string) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify/rejected`, { id });
    return res.data;
  } catch (error) {
    console.error("Error fetching rejected:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to fetch rejected");
    }
    throw new Error("Failed to fetch rejected");
  }
}
