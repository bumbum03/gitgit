import type { App } from "vue";
import VueApexCharts from "vue3-apexcharts";

export function initApexCharts(app: App<Element>) {
    app.use(VueApexCharts);
}