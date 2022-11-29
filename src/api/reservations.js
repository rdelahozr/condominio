import { restClient } from "./config";

export const getReservations = async () => {
  try {
    const response = await restClient.get('/reservation/get');
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const getReservationsByCondominium = async (id) => {
  try {
    const response = await restClient.get('/reservation/get-by-rut', {
      params: {
        id
      }
    });
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const addReservation = async (body) => {
  try {
    const response = await restClient.post('/reservation/add', body);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const updateExpense = async (ids) => {
  try {
    const response = await restClient.post('/reservation/delete', { ids });
    return response;
  } catch (e) {
    console.log(e);
  }
}