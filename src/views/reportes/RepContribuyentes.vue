
<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <main>
      <h1>Reportes Financieros</h1>
      <h2>Libro de ventas a contribuyentes</h2>

      <!-- // filtros de busqueda, por Fecha -->
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
          <template v-slot:item.correlativo="{ item }">
            <v-chip color="primary" dark>{{ item.correlativo }}</v-chip>
          </template>
          <template v-slot:item.nrc="{ item }">
            <v-chip color="primary" dark>{{ item.nrc }}</v-chip>
          </template>
          <template v-slot:item.nombre="{ item }">
            <v-chip color="primary" dark>{{ item.nombre }}</v-chip>
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
          <template v-slot:item.debitoFiscal="{ item }">
            <v-chip color="primary" dark>{{ item.debitoFiscal }}</v-chip>
          </template>
          <template v-slot:item.ivaRetenido="{ item }">
            <v-chip color="primary" dark>{{ item.ivaRetenido }}</v-chip>
          </template>
          <template v-slot:item.totalVentas="{ item }">
            <v-chip color="primary" dark>{{ item.totalVentas }}</v-chip>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">No hay Información. Presione para recargar</v-btn>
          </template>

          <template v-slot:footer>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{ totalExentas }}</td>
            <td>{{ totalNoSujetas }}</td>
            <td>{{ totalGravadasLocales }}</td>
            <td>{{ totalDebitoFiscal }}</td>
            <td>{{ totalIvaRetenido }}</td>
            <td>{{ totalTotalVentas }}</td>
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

    // encabezados: Nº, Fecha, No. correlativo, NRC, Nombre del contribuyente, Exentas, No Sujetas, Gravadas locales, Débito fiscal, Iva retenido, total de ventas
    headers: [
      { text: 'Nº', value: 'numero' },
      { text: 'Fecha', value: 'fecha' },
      { text: 'No. correlativo', value: 'correlativo' },
      { text: 'NRC', value: 'nrc' },
      { text: 'Nombre del contribuyente', value: 'nombre' },
      { text: 'Exentas', value: 'exentas' },
      { text: 'No Sujetas', value: 'noSujetas' },
      { text: 'Gravadas locales', value: 'gravadasLocales' },
      { text: 'Débito fiscal', value: 'debitoFiscal' },
      { text: 'Iva retenido', value: 'ivaRetenido' },
      { text: 'Total de ventas', value: 'totalVentas' },
    ],
  }),
};
</script>
