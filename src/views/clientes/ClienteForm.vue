<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-2 pa-sm-4" rounded="lg">
        <v-card-title primary-title class="d-flex justify-space-between blueGrayPrincipal--text">
          {{ !$route.query.id ? 'Crear' : 'Editar' }} Cliente
        </v-card-title>
        <v-card-text>

          <v-text-field v-model="form.nombre" label="Nombre" :error-messages="nombreErrors"
            @blur="$v.form.nombre.$touch()" required></v-text-field>

          <v-text-field v-model="form.dui" label="DUI" :error-messages="duisErrors" @blur="$v.form.dui.$touch()"
            required></v-text-field>

          <v-text-field v-model="form.email" label="Correo electrónico" :error-messages="emailErrors"
            @blur="$v.form.email.$touch()" required></v-text-field>


        </v-card-text>

        <v-row>
          <v-col class="m-5" cols="12" md="12">
            <v-btn color="bluePrincipal" class="white--text ma-1" rounded @click="save(true)"
              :small="$vuetify.breakpoint.xs" :loading="loading_navigate">
              <v-icon left>mdi-content-save</v-icon>
              {{ !$route.query.id ? 'Crear' : 'Editar' }}
            </v-btn>
            <v-btn :to="{ name: 'clientes' }" rounded :small="$vuetify.breakpoint.xs">
              <v-icon left>mdi-arrow-left</v-icon>
              Regresar al listado
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import AppSearchList from "../../components/AppSearchList";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "ClienteForm",
  components: { AppSearchList },
  data: () => ({
    form: {
      nombre: null,
      dui: null,
      email: null,
    },
    editMode: false,
    loading: false,
    loading_navigate: false,
  }),

  computed: {
    nombreErrors() {
      const errors = []
      if (!this.$v.form.nombre.$dirty) return errors
      !this.$v.form.nombre.required && errors.push('Nombre es requerido')
      return errors
    },


    duisErrors() {
      const errors = []
      if (!this.$v.form.dui.$dirty) return errors
      !this.$v.form.dui.required && errors.push('DUI es requerido')
      return errors
    },


    emailErrors() {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.required && errors.push('Correo electrónico es requerido')
      return errors
    },
  },

  validations: {
    form: {
      nombre: { required },
      dui: { required },
      email: { required, email },
    },
  },


  methods: {
    ...mapActions("utils", ["getMenu"]),
    formClean() {
      this.$v.$reset()
      this.form = {
        nombre: null,
        dui: null,
        email: null,
      }
    },

    async save(redirect) {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.loading_navigate = true
      try {

        if (this.$route.query.id) {
          await this.services.cliente.updateCliente(this.$route.query.id, this.form)
        } else {
          await this.services.cliente.storeCliente(this.form)
        }

        this.formClean()
        if (redirect) this.$router.push({ name: "clientes" })
      } catch (error) {
        console.log(error)

      } finally {
        this.loading_navigate = false
      }
    },


    async getCliente(id) {
      this.loading = true;
      const response = await this.services.cliente.getCliente(id)
      this.loading = false;
      return response.data
    },
  },



  async created() {
    const id = this.$route.query.id
    if (id) {
      this.editMode = true
      const cliente = await this.getCliente(id)
      this.form = {
        nombre: cliente.nombre,
        dui: cliente.dui,
        email: cliente.email,
      }

    } else {
      this.formClean()
      this.editMode = false
    }
  },
};
</script>
