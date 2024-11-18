<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-row>
      <!-- Columna principal: Barra de búsqueda y dropdown -->
      <v-col cols="8">
        <v-card class="pa-2 pa-sm-4" rounded="lg">
          <v-card-title primary-title class="d-flex justify-space-between blueGrayPrincipal--text">
            Gestión de Servicios
          </v-card-title>
          <v-card-text>
            <!-- Barra de búsqueda -->
            <v-row>
              <v-col cols="10">
                <v-text-field v-model="search" label="Buscar servicio" prepend-inner-icon="mdi-magnify"
                  :disabled="editar" @input="filterServicios"></v-text-field>
              </v-col>
              <v-col cols="2" class="d-flex align-center justify-center">
                <v-btn icon @click="clearSearch" color="red">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <!-- Dropdown de servicios -->
            <v-menu v-if="filteredServicios.length > 0 && search.length > 0" open-on-click
              :close-on-content-click="false" :nudge-width="200" transition="scale-transition" offset-y>
              <template #activator="{ on, attrs }">
                <v-list dense class="bordered">
                  <v-list-item v-for="servicio in filteredServicios" :key="servicio.nombre"
                    @click="agregarServicio(servicio)">
                    <v-list-item-content>
                      <v-list-item-title>{{ servicio.nombre }}</v-list-item-title>
                      <v-list-item-subtitle>
                        Precio: ${{ servicio.precio_base }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </template>
            </v-menu>

            <!-- Tabla de productos seleccionados -->
            <v-data-table :headers="tableHeaders" :items="selectedServicios" class="elevation-1 mt-4">
              <template #item.acciones="{ item }">
                <v-btn icon @click="eliminarServicio(item)" :disabled="editar">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Columna derecha: Resumen de ventas -->
      <v-col cols="4">
        <v-card class="pa-2" outlined>
          <v-card-title>Resumen de Venta</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">Total:</v-col>
              <v-col cols="6" class="text-right">${{ total }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="6">Artículos:</v-col>
              <v-col cols="6" class="text-right">{{ totalArticulos }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="cantidadPago" label="Cantidad con la que paga ($)" prepend-inner-icon="mdi-cash"
                  :disabled="editar" @input="calcularCambio"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-autocomplete v-model="selectedCliente" :items="clientes" item-text="nombre" item-value="id"
                  :disabled="editar" label="Seleccionar Cliente" prepend-inner-icon="mdi-account"></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">Cambio:</v-col>
              <v-col cols="6" class="text-right">${{ cambio }}</v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>

            <v-btn color="bluePrincipal" class="white--text ma-1" rounded @click="guardarVenta" :disabled="editar">
              <v-icon left>mdi-content-save</v-icon>
              Guardar Venta
            </v-btn>
            <v-btn rounded :to="{ name: 'ventas' }">
              <v-icon left>mdi-arrow-left</v-icon>
              Regresar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Precio Base", value: "precio_base" },
      { text: "Acciones", value: "acciones", sortable: false },
    ],
    tableHeaders: [
      { text: "Nombre", value: "nombre" },
      { text: "Precio", value: "precio_base" },
      { text: "Cantidad", value: "cantidad" },
      { text: "Acciones", value: "acciones", sortable: false },
    ],
    servicios: [
      { nombre: "Servicio A", precio_base: 10 },
      { nombre: "Servicio B", precio_base: 20 },
    ],
    selectedServicios: [],
    filteredServicios: [],
    clientes: [],
    selectedCliente: null,
    total: 0,
    totalArticulos: 0,
    cantidadPago: 0,
    editar: false,
    cambio: 0,
  }),
  methods: {
    async filterServicios() {
      if (!this.search) {
        this.filteredServicios = [];
      } else {
        const coincidencias = await this.services.servicio.getServicios({
          nombre: this.search,
        });

        this.filteredServicios = coincidencias.data;
      }
    },
    agregarServicio(item) {
      const existingItem = this.selectedServicios.find(
        (s) => s.nombre === item.nombre
      );
      if (existingItem) {
        existingItem.cantidad++;
      } else {
        this.selectedServicios.push({ ...item, cantidad: 1 });
      }
      this.actualizarResumen();
    },
    eliminarServicio(item) {
      this.selectedServicios = this.selectedServicios.filter(
        (s) => s.nombre !== item.nombre
      );
      this.actualizarResumen();
    },
    actualizarResumen() {
      this.total = this.selectedServicios.reduce(
        (sum, s) => sum + s.precio_base * s.cantidad,
        0
      );
      this.totalArticulos = this.selectedServicios.reduce(
        (sum, s) => sum + s.cantidad,
        0
      );
    },
    calcularCambio() {
      this.cambio = this.cantidadPago - this.total;
    },
    clearSearch() {
      this.search = ""; // Limpia el campo de búsqueda
      this.filteredServicios = []; // Limpia las coincidencias
    },
    async guardarVenta() {

      const venta = {
        id_cliente: this.selectedCliente,
        detalle: {
          total: this.total,
          cambio: this.cambio,
          cantidad_servicios: this.totalArticulos,
          cantidad_pagada: this.cantidadPago,
        },
        servicios: this.selectedServicios.map((s) => ({
          id_servicio: s.id,
          cantidad: s.cantidad,
          subtotal: s.precio_base * s.cantidad,
        })),
      };

      if (venta.detalle.cambio < 0) {
        this.temporalAlert({
          show: true,
          message: "La cantidad pagada no puede ser menor al total",
          type: "error",
        });
        return;
      }


      if (venta.detalle.cantidad_servicios === 0) {
        this.temporalAlert({
          show: true,
          message: "No se puede realizar una venta sin servicios",
          type: "error",
        });
        return;
      }

      if (venta.detalle.cantidad_pagada <= 0) {
        this.temporalAlert({
          show: true,
          message: "La cantidad pagada no puede ser menor o igual a 0",
          type: "error",
        });
        return;
      }

      try {
        await this.services.venta.createVenta(venta);
        this.$router.push({ name: "ventas" });

      } catch (error) {

        console.error(error);

        this.temporalAlert({
          show: true,
          message: "Error al guardar la venta" + error,
          type: "error",

        });
      }
    },
    async obtenerClientes() {
      const response = await this.services.cliente.getClientes({
        page: this.page,
        per_page: this.per_page
      })
      this.clientes = response.data;
    },
  },
  async created() {

    await this.obtenerClientes();
    const id = this.$route.query.id;
    if (id) {
      this.editar = true;
      const response = await this.services.venta.getVenta(id);

      const venta = response.data;


      this.selectedServicios = venta.ServicioVenta.map((s) => ({
        ...s.Servicio,
        cantidad: s.cantidad,
        nombre: s.Servicio.nombre,
        precio_base: s.subtotal / s.cantidad,
      }));


      this.total = venta.DetalleVenta[0].total;
      this.totalArticulos = venta.DetalleVenta[0].cantidad_servicios;
      this.cantidadPago = venta.DetalleVenta[0].cantidad_pagada;
      this.cambio = venta.DetalleVenta[0].cambio;

      if (venta.id_cliente) {
        this.selectedCliente = this.clientes.find((c) => c.id === venta.id_cliente);
      }



    }




  },


};
</script>

<style scoped>
.v-card-text {
  max-height: 500px;
  overflow-y: auto;
}
</style>
