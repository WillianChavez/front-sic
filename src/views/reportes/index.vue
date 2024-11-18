<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="text-h6">Servicios más Solicitados</span>
          </v-card-title>
          <v-card-text>
            <apexchart type="pie" :options="pieOptions" :series="pieData" ref="pie"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="text-h6">Reporte de Ventas Mensuales</span>
          </v-card-title>
          <v-card-text>
            <apexchart type="bar" :options="chartOptions" :series="chartData" ref="chart"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      // Opciones para la gráfica de barras
      chartOptions: {
        chart: {
          id: "ventas-mensuales",
        },
        xaxis: {
          categories: [
          ],
        },
        title: {
          text: "Ventas Mensuales",
          align: "center",
        },
      },
      chartData: [
        {
          name: "Total Ventas",
          data: [],
        },
      ],

      // Opciones para la gráfica de pastel
      pieOptions: {
        labels: [],
        title: {
          text: "Distribución de Servicios",
          align: "center",
        },
      },
      pieData: [],
    };
  },

  async created() {
    const response = await this.services.venta.getReporte();
    const data = response.data;

    this.$refs.chart.updateOptions({
      xaxis: {
        categories: Object.keys(data.ventasMensuales),
      },
    });

    this.$refs.chart.updateSeries([
      {
        data: Object.values(data.ventasMensuales),
      },
    ]);

    this.$refs.pie.updateOptions({
      labels: Object.keys(data.servicios),
    });

    this.$refs.pie.updateSeries(Object.values(data.servicios));


  },
};
</script>

<style scoped></style>
