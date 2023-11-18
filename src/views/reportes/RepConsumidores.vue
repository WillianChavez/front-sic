
<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <main>
      <h1>Reportes Financieros</h1>
      <h2>Libro de ventas a consumidores finales</h2>

      <!-- // filtros de busqueda, por Fecha solo mes -->
      <v-card class="mt-6">
        <v-card-title style="width: 290px;" >
          <v-menu offset-y ref="menu" transition="scale-transition" :close-on-content-click="false" max-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="search"
                append-icon="mdi-calendar"
                label="Buscar por fecha"
                v-bind="attrs"
                v-on="on"
                max-width="290px"
              ></v-text-field>
            </template>
            <v-date-picker v-model="search" type="month" @input="$refs.menu.save(search)"></v-date-picker>
          </v-menu>

        </v-card-title>
        <v-data-table :headers="headers" :items="items" :search="search" :loading="loading" class="elevation-1">
          <template v-slot:item.numero="{ item }">
            <v-chip color="primary" dark>{{ item.numero }}</v-chip>
          </template>
          <template v-slot:item.fecha="{ item }">
            <v-chip color="primary" dark>{{ item.fecha }}</v-chip>
          </template>
          <template v-slot:item.delNumero="{ item }">
            <v-chip color="primary" dark>{{ item.delNumero }}</v-chip>
          </template>
          <template v-slot:item.alNumero="{ item }">
            <v-chip color="primary" dark>{{ item.alNumero }}</v-chip>
          </template>
          <template v-slot:item.exentas="{ item }">
            <v-chip color="primary" dark>{{ item.exentas }}</v-chip>
          </template>
          <template v-slot:item.noSujetas="{ item }">
            <v-chip color="primary" dark>{{ item.noSujetas }}</v-chip>
          </template>
          <template v-slot:item.gravadasLocales="{ item }">
            <v-chip color="primary" dark>{{ item.gravadasLocales }}</v-chip>
          </template>
          <template v-slot:item.gravadasExportacion="{ item }">
            <v-chip color="primary" dark>{{ item.gravadasExportacion }}</v-chip>
          </template>
          <template v-slot:item.totalVentas="{ item }">
            <v-chip color="primary" dark>{{ item.totalVentas }}</v-chip>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">No hay datos nuevos. Click para recargar</v-btn>
          </template>

          <template v-slot:footer>
            <td>
              <strong>Total</strong>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <strong>{{ totalExentas }}</strong>
            </td>
            <td>
              <strong>{{ totalNoSujetas }}</strong>
            </td>
            <td>
              <strong>{{ totalGravadasLocales }}</strong>
            </td>
            <td>
              <strong>{{ totalGravadasExportacion }}</strong>
            </td>
            <td>
              <strong>{{ totalTotalVentas }}</strong>
            </td>
          </template>
        </v-data-table>
      </v-card>



    </main>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    options: [{ value: 10, text: '10' }, { value: 25, text: '25' }, { value: 50, text: '50' }],
    loading: false,
    search: '',

    // encabezados: Nº, Fecha, Del N., Al N, Exentas, No Sujetas, Gravadas Locales, Gravadas de exportación,  Total Ventas
    headers: [
      { text: 'Nº', value: 'numero' },
      { text: 'Fecha', value: 'fecha' },
      { text: 'Del N.', value: 'delNumero' },
      { text: 'Al N.', value: 'alNumero' },
      { text: 'Exentas', value: 'exentas' },
      { text: 'No Sujetas', value: 'noSujetas' },
      { text: 'Gravadas Locales', value: 'gravadasLocales' },
      { text: 'Gravadas de exportación', value: 'gravadasExportacion' },
      { text: 'Total Ventas', value: 'totalVentas' },
    ],
  })
};
</script>
