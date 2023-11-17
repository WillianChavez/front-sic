<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-2 pa-sm-4" rounded="lg">
        <v-card-title primary-title class="d-flex justify-space-between blueGrayMinsal--text">
          Compra
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.fecha_emision" label="Fecha de emisión" :error-messages="fechaEmisionErrors"
                @blur="$v.form.fecha_emision.$touch()" required></v-text-field>
              <v-text-field v-model="form.descripcion" label="Descripción" :error-messages="descripcionErrors"
                @blur="$v.form.descripcion.$touch()" required></v-text-field>
              <v-text-field v-model="form.numero_documento_cff" label="Número de documento"
                :error-messages="numeroDocumentoCffErrors" @blur="$v.form.numero_documento_cff.$touch()"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.persona.nombre" label="Nombre" :error-messages="nombreErrors"
                @blur="$v.form.persona.nombre.$touch()" required></v-text-field>
              <v-select v-model="form.id_cuenta_contable" :items="cuentas" item-text="nombre" item-value="id"
                label="Cuenta contable" :error-messages="cuentaContableErrors" @blur="$v.form.id_cuenta_contable.$touch()"
                required></v-select>
              <v-text-field v-model="form.persona.nrc" label="NRC" @blur="$v.form.persona.nrc.$touch()"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <!-- tipo contribuyente, numero de documento ccf, nit -->
              <v-select v-model="form.id_tipo_contribuyente" :items="tipoContribuyentes" item-text="nombre"
                item-value="id" label="Tipo de contribuyente"></v-select>
              <v-select v-model="form.id_cuenta_contrapartida" :items="cuentas" item-text="nombre" item-value="id"
                label="Cuenta contrapartida" :error-messages="cuentaContrapartidaErrors"
                @blur="$v.form.id_cuenta_contrapartida.$touch()" required></v-select>
              <v-text-field v-model="form.persona.nit" label="NIT" :error-messages="nitErrors"
                @blur="$v.form.persona.nit.$touch()" required></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <h1 class="text-h6 blueGrayMinsal--text">Detalle de compra</h1>
        <v-card-actions>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0" cols="12" md="8">
              <v-card class="pa-2 pa-sm-4" rounded="lg">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-text-field v-model="form.detalleCompra.gravado_interno" label="Gravado interno"
                        @blur="$v.form.detalleCompra.gravado_interno.$touch()" required></v-text-field>
                      <v-text-field v-model="form.detalleCompra.exento_interno" label="Exento interno"
                        @blur="$v.form.detalleCompra.exento_interno.$touch()" required></v-text-field>
                      <v-text-field v-model="form.detalleCompra.exento_importacion" label="Exento importación"
                        @blur="$v.form.detalleCompra.exento_importacion.$touch()" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field v-model="form.detalleCompra.compras_sujeto_excluido" label="Compras sujeto excluido"
                        :error-messages="comprasSujetoExluidoErrors"
                        @blur="$v.form.detalleCompra.compras_sujeto_excluido.$touch()" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col class="pa-5 rounded bgMinsal px-5" cols="12" md="4">
              <v-text-field v-model="form.detalleCompra.anticipo_uno_porciento_retenido" label="Anticipo 1% retenido"
                @blur="$v.form.detalleCompra.anticipo_uno_porciento_retenido.$touch()" required></v-text-field>

              <v-text-field v-model="form.detalleCompra.iva_credito_fiscal" label="IVA crédito fiscal"
                @blur="$v.form.detalleCompra.iva_credito_fiscal.$touch()" required></v-text-field>

              <v-text-field v-model="form.detalleCompra.total" label="Total" @blur="$v.form.detalleCompra.total.$touch()"
                required></v-text-field>
            </v-col>
          </v-row>
        </v-card-actions>

        <v-row>
          <v-col class="m-5" cols="12" md="12">
            <v-btn color="blueMinsal" class="white--text ma-1" rounded @click="savePath(true)"
              :small="$vuetify.breakpoint.xs" :loading="loading_navigate">
              <v-icon left>mdi-content-save</v-icon>
              {{ !$route.params.id ? 'Crear' : 'Editar' }}
            </v-btn>
            <v-btn :to="{ name: 'compras' }" rounded :small="$vuetify.breakpoint.xs">
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
import { required, decimal, helpers } from "vuelidate/lib/validators";

export default {
  name: "pathForm",
  components: { AppSearchList },
  data: () => ({
    form: {
      fecha_emision: null,
      descripcion: null,
      numero_documento_cff: null,
      es_sujeto_excluido: false,
      id_tipo_contribuyente: null,
      id_cuenta_contable: null,
      id_cuenta_contrapartida: null,
      persona: {
        nit: null,
        nombre: null,
        nrc: null,
      },
      detalleCompra: {
        gravado_interno: null,
        exento_interno: null,
        exento_importacion: null,
        compras_sujeto_excluido: null,
        anticipo_uno_porciento_retenido: null,
      }

    },
    loading: false,
    loading_navigate: false,
    cuentas: [],
    tipoContribuyentes: [],
  }),

  created() {
    this.getCuentas()
    this.getTipoContribuyentes()
  },

  computed: {
    fechaEmisionErrors() {
      const errors = []
      if (!this.$v.form.fecha_emision.$dirty) return errors
      !this.$v.form.fecha_emision.required && errors.push('Fecha de emisión es requerida')
      return errors
    },

    descripcionErrors() {
      const errors = []
      if (!this.$v.form.descripcion.$dirty) return errors
      !this.$v.form.descripcion.required && errors.push('Descripción es requerida')
      return errors
    },
    numeroDocumentoCffErrors() {
      const errors = []
      if (!this.$v.form.numero_documento_cff.$dirty) return errors
      !this.$v.form.numero_documento_cff.required && errors.push('Número de documento es requerido')
      return errors
    },
    nitErrors() {
      const errors = []
      if (!this.$v.form.persona.nit.$dirty) return errors
      !this.$v.form.persona.nit.required && errors.push('NIT es requerido')
      return errors
    },
    nombreErrors() {
      const errors = []
      if (!this.$v.form.persona.nombre.$dirty) return errors
      !this.$v.form.persona.nombre.required && errors.push('Nombre es requerido')
      return errors
    },

    comprasSujetoExluidoErrors() {
      const errors = []
      if (!this.$v.form.detalleCompra.compras_sujeto_excluido.$dirty) return errors
      !this.$v.form.detalleCompra.compras_sujeto_excluido.required && errors.push('Compras sujeto excluido es requerido')
      return errors
    },

    cuentaContableErrors() {
      const errors = []
      if (!this.$v.form.id_cuenta_contable.$dirty) return errors
      !this.$v.form.id_cuenta_contable.required && errors.push('Cuenta contable es requerida')
      return errors
    },

    cuentaContrapartidaErrors() {
      const errors = []
      if (!this.$v.form.id_cuenta_contrapartida.$dirty) return errors
      !this.$v.form.id_cuenta_contrapartida.required && errors.push('Cuenta contrapartida es requerida')
      return errors
    },
  },


  validations: {
    form: {
      fecha_emision: {
        required
      },
      descripcion: {
        required
      },
      id_cuenta_contable: {
        required
      },
      id_cuenta_contrapartida: {
        required
      },
      numero_documento_cff: {
        required
      },
      persona: {
        nombre: {
          required
        },
        nit: {
          required
        },
        nrc: {
        },
      },

      detalleCompra: {
        gravado_interno: {},
        exento_interno: {},
        exento_importacion: {},
        compras_sujeto_excluido: {
          required
        },
        anticipo_uno_porciento_retenido: {},
      },
    },
  },


  methods: {
    ...mapActions("utils", ["getMenu"]),
    formClean() {
      this.$v.$reset()
      this.form = {
        fecha_emision: null,
        descripcion: null,
        numero_documento_cff: null,
        es_sujeto_excluido: false,
        persona: {
          nit: null,
          nombre: null,
          nrc: null,
        },
        cuentas: [{
          id_cuenta: null,
          debe: null,
          haber: null,
        }],
        detalleCompra: {
          gravado_interno: null,
          exento_interno: null,
          exento_importacion: null,
          compras_sujeto_excluido: null,
          anticipo_uno_porciento_retenido: null,
        }
      }
    },

    async getCuentas() {
      const response = await this.services.cuenta.getCuentas({
        paginacion: false
      })
      this.cuentas = response.data
    },

    async getTipoContribuyentes() {
      const response = await this.services.catalogo.getTipoContribuyentes({
        paginacion: false
      })
      this.tipoContribuyentes = response.data
    },

  },
};
</script>
