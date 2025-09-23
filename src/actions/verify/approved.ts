import axios from "axios";

export async function handleApproved(id: string) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify/approved`, { id });
    return res.data;
  } catch (error) {
    console.error("Error fetching approved:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to fetch approved");
    }
    throw new Error("Failed to fetch approved");
  }
}
