import { isProduction } from "../utils/helpers";
import axios from "axios";

export const BASE_URL = isProduction ? 'http://ruta-productiva' : `http://localhost:${process.env.REACT_APP_API_PORT}`;

export const restClient = axios.create({
  baseURL: BASE_URL
})