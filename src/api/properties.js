import { restClient } from "./config";

export const getPropertiesByCondominium = async (condominiumId) => {
  try {
    console.log(condominiumId);
    const response = await restClient.get(
      '/properties/get-by-condominium',
      {
        params: { condominiumId }
      });
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const addProperties = async (body) => {
  try {
    const response = await restClient.post('/properties/add', body);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const deleteProperties = async (ids) => {
  try {
    const response = await restClient.post('/properties/delete', { ids });
    return response;
  } catch (e) {
    console.log(e);
  }
}