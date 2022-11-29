import { restClient } from "./config";

export const getExpenses = async () => {
  try {
    const response = await restClient.get('/expenses/get');
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const getExpensesByCondominium = async (id) => {
  try {
    const response = await restClient.get('/expenses/get-by-rut', {
      params: {
        id
      }
    });
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const addExpense = async (body) => {
  try {
    const response = await restClient.post('/expenses/add', body);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const updateExpense = async (ids) => {
  try {
    const response = await restClient.post('/expenses/delete', { ids });
    return response;
  } catch (e) {
    console.log(e);
  }
}