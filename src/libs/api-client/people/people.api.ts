import axiosClient from "../index";

export async function getPeople() {
  const { data } = await axiosClient.get('/people')
  return data
}

export async function addPerson(data: any) {
  return await axiosClient.post('/people', data)
}