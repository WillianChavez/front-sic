import { http_client } from "@/plugins/http_client";

const url = '/api/v1/catalogo/tipo-servicio'

const getAll = async (params = {}) => await http_client(url, params, 'get')


export default {
  getAll
}