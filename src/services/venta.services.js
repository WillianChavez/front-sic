import {http_client} from "../plugins/http_client";


const getVentas = async (queryParams = {}) => await http_client('/api/v1/ventas', queryParams, 'get')
const getVenta = async (id) => await http_client(`/api/v1/ventas/${id}`, {}, 'get')
const createVenta = async (body) => await http_client('/api/v1/ventas', body, 'post')
const getReporte = async (queryParams = {}) => await http_client('/api/v1/ventas/reporte', queryParams, 'get')

export default {
    getVentas,
    getVenta,
    createVenta,
    getReporte

}