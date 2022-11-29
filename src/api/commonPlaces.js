import { restClient } from "./config";

export const getCommonPlacesByCondominium = async (condominiumId) => {
  try {
    console.log(condominiumId);
    const response = await restClient.get(
      '/common-places/get-by-condominium',
      {
        params: { condominiumId }
      });
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const addCommonPlaces = async (body) => {
  try {
    const response = await restClient.post('/common-places/add', body);
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