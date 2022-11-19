import { restClient } from "./config";

export const getCondominium = async () => {
  try {
    const response = await restClient.get('/condominium/get');
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const addCondominium = async (body) => {
  try {
    const response = await restClient.post('/condominium/add', body);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const deleteCondominiums = async (ids) => {
  try {
    const response = await restClient.post('/condominium/delete', { ids });
    return response;
  } catch (e) {
    console.log(e);
  }
}