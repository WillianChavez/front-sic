<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md11 lg10>
      <v-card class="pa-4" rounded="lg">
        <v-card-title primary-title class="d-flex justify-space-between blueGrayPrincipal--text">
          Servicios
          <div>
            <v-btn rounded color="bluePrincipal" class="white--text ma-1" to="servicios/form">
              <v-icon left>mdi-plus</v-icon>
              Agregar
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader v-if="loading"></v-skeleton-loader>
          <v-data-table :headers="headers" :items="servicios" item-key="id" class="elevation-0 border-1"
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
            <template v-slot:[`item.accion`]="{ item }">
              <v-btn icon small :to="`/servicios/form?id=${item.id}`">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon small @click="deleteServicio(item.id)">
                <v-icon>mdi-delete</v-icon>
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
              <v-pagination v-model="page" @input="getServicios" :length="totalPages"></v-pagination>
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
    servicios: [{ nombre: "Servicio 1", tipo_servicio: { nombre: "Tipo 1" }, precio_base: 100, costo: 50, descripcion: "Descripcion 1", id: 1 }],
    headers: [
      {
        text: "Nombre",
        align: "start",
        value: "nombre",
      },
      {
        text: "Tipo de Servicio",
        align: "start",
        value: "tipo_servicio.nombre",
      },
      {
        text: "Precio Base",
        align: "start",
        value: "precio_base",
      },
      {
        text: "Costo",
        align: "start",
        value: "costo",
      },
      {
        text: "Descripción",
        align: "start",
        value: "descripcion",
      },
      { text: "Accion", value: "accion", sortable: false, width: "100" },
    ],

    page: 1,
    per_page: 10,
    total_rows: 0,
  }),


  methods: {
    ...mapActions("utils", ["getMenu"]),
    async getServicios() {
      this.loading = true;
      const response = await this.services.servicio.getServicios({
        page: this.page,
        per_page: this.per_page
      })
      const { page, per_page, total_rows } = this.getPaginationProperties(response)
      this.servicios = response.data;
      this.page = page;
      this.per_page = per_page;
      this.total_rows = total_rows;
      this.loading = false;
    },
    async deleteServicio(id) {
      const response = await this.services.servicio.deleteServicio(id)
      if (response.status === 200) {
        this.temporalAlert({
          show: true,
          message: 'Servicio eliminada con éxito',
          type: "success",
        });
        this.getServicios()
      }
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
      // this.getServicios()
    }
  },
  async created() {
    // this.getServicios()
  },
};
</script>
