import { restClient } from "./config";

export const getOwners = async () => {
  try {
    const response = await restClient.get('/owners/get');
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const addOwners = async (body) => {
  try {
    const response = await restClient.post('/owners/add', body);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const deleteOwners = async (ids) => {
  try {
    const response = await restClient.post('/owners/delete', { ids });
    return response;
  } catch (e) {
    console.log(e);
  }
}