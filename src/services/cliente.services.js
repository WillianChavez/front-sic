import { http_client } from '@/plugins/http_client'

const url = '/api/v1/clientes'

const getClientes = async (params = {}) => await http_client(url, params, 'get')
const getCliente = async (id) => await http_client(`${url}/${id}`, {}, 'get')
const storeCliente = async (body) => await http_client(url, body, 'post')
const updateCliente = async (id, body) =>
  await http_client(`${url}/${id}`, body, 'put')
const deleteCliente = async (id) =>
  await http_client(`${url}/${id}`, {}, 'delete')

export default {
  getClientes,
  storeCliente,
  updateCliente,
  deleteCliente,
  getCliente,
}
