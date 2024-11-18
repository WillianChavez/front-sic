<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md11 lg10>
      <v-card class="pa-4" rounded="lg">
        <v-card-title primary-title class="d-flex justify-space-between blueGrayPrincipal--text">
          Tipo de Servicios
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader v-if="loading"></v-skeleton-loader>
          <v-data-table :headers="headers" :items="tiposServicios" item-key="id" class="elevation-0 border-1"
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
              <v-btn icon small @click="edit(item.id)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon small @click="deleteCuenta(item.id)" v-if="!item.requerido">
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
              <v-pagination v-model="page" @input="getTiposServicios" :length="totalPages"></v-pagination>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    tiposServicios: [{ id: 1, nombre: 'prueba' }],
    options: [{ value: 10, text: '10' }, { value: 25, text: '25' }, { value: 50, text: '50' }],
    loading: false,
    headers: [
      {
        text: "Identificador",
        align: "start",
        value: "id",
      },
      {
        text: "Nombre",
        align: "start",
        value: "nombre",
      },
    ],
    page: 1,
    per_page: 10,
    total_rows: 0,
    modal: false,
    editMode: false,
    modalTitle: "",
    form: {
      nombre: null,
    },
  }),

  validations: {
    form: {
      nombre: {
        required
      },
    }
  },

  methods: {
    ...mapActions("utils", ["getMenu"]),

    async getTiposServicios() {
      this.loading = true;
      const response = await this.services.tiposervicio.getAll()
      console.log(response)
      this.tiposServicios = response.data;
      this.loading = false;
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total_rows / this.per_page)
    },
    nombreErrors() {
      const errors = []
      if (!this.$v.form.nombre.$dirty) return errors
      !this.$v.form.nombre.required && errors.push('Nombre es obligatorio')
      return errors
    },
  },
  watch: {
    per_page() {
      this.page = 1;
      this.getTiposServicios()
    }
  },
  async created() {
    await this.getTiposServicios()
  },
};
</script>
