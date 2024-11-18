<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md11 lg10>
      <v-card class="pa-4" rounded="lg">
        <v-card-title primary-title class="d-flex justify-space-between blueGrayPrincipal--text">
          Ventas
          <div>
            <v-btn rounded color="bluePrincipal" class="white--text ma-1" to="ventas/form">
              <v-icon left>mdi-plus</v-icon>
              Agregar
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader v-if="loading"></v-skeleton-loader>
          <v-data-table :headers="headers" :items="ventas" item-key="id" class="elevation-0 border-1"
            no-data-text="No hay datos" no-results-text="No hay resultados" disable-pagination hide-default-footer
            v-else>
            <template v-slot:[`item.mostrar`]="{ item }">
              <v-chip class="ma-2 white--text" color="bluePrincipal" small v-if="item.mostrar">
                Si
              </v-chip>
              <v-chip class="ma-2 white--text" color="red darken-1" v-else small>
                No
              </v-chip>
            </template>


            <!-- formatear fecha -->

            <template v-slot:[`item.fecha`]="{ item }">
              <span>{{ new Date(item.fecha).toLocaleDateString() }}</span>
            </template>

            <template v-slot:[`item.accion`]="{ item }">
              <v-btn icon small :to="`/ventas/form?id=${item.numero_factura}`">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <v-row class="mt-4">
            <v-col>
              <v-select :items="options" v-model.number="per_page" label="Cantidad por página"></v-select>
            </v-col>
            <v-col class="d-flex justify-center align-center">
              <p>Total registros {{ total_rows }}</p>
            </v-col>
            <v-col>
              <v-pagination v-model="page" @input="getVentas" :length="totalPages"></v-pagination>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    loading: false,
    ventas: [],
    headers: [
      {
        text: "N° Factura",
        align: "start",
        value: "numero_factura",
      },
      {
        text: "Cantidad de servicios",
        align: "start",
        value: "DetalleVenta[0].cantidad_servicios",
      },
      {
        text: "Total ($)",
        align: "start",
        value: "DetalleVenta[0].total",
      },
      {
        text: "Cliente",
        align: "start",
        value: "Cliente.nombre",
      },
      {
        text: "Fecha",
        align: "start",
        value: "fecha",
      },
      { text: "Acción", value: "accion", sortable: false, width: "100" },
    ],

    page: 1,
    per_page: 10,
    total_rows: 0,
    options: [{ value: 10, text: '10' }, { value: 25, text: '25' }, { value: 50, text: '50' }],
  }),


  methods: {
    ...mapActions("utils", ["getMenu"]),
    async getVentas() {
      this.loading = true;
      const response = await this.services.venta.getVentas({
        page: this.page,
        per_page: this.per_page
      })
      this.ventas = response.data;

      this.total_rows = this.ventas.length;


      this.loading = false;
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total_rows / this.per_page)
    },
  },
  watch: {
    per_page() {
      this.page = 1;
      this.getVentas()
    }
  },
  async created() {
    this.getVentas()
  },
};
</script>
