import axios from 'axios'

const API_URL = "https://znsvlpicrvbgxicnzrda.supabase.co/rest/v1/registrations";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc3ZscGljcnZiZ3hpY256cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQzMzAsImV4cCI6MjA2NTE5MDMzMH0.3p4-awE53GsuXdMefxqnuIAqOYN2K7S3UHDWuD2E1Fc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
}

export const registrationsAPI = {
  async fetchAll() {
    const res = await axios.get(API_URL, { headers })
    return res.data
  },
  async create(data) {
    const res = await axios.post(API_URL, data, { headers })
    return res.data
  },
  async update(id, data) {
    const res = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers })
    return res.data
  },
  async delete(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
  },
}
