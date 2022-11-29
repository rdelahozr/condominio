import { restClient } from "./config";

export const getUsers = async (condominium) => {
  try {
    const response = await restClient.get('/users/get', {
      params: {
        condominium
      }
    });
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const addUser = async (body) => {
  try {
    console.log({body})
    const response = await restClient.post('/users/add', body);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const login = async (body) => {
  try {
    const response = await restClient.post('/login', body);
    return response;
  } catch (e) {
    console.log(e);
  }
}