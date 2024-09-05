import type { App } from "vue";
import InlineSvg from "vue-inline-svg";

export function initInlineSvg(app: App<Element>) {
    app.component("inline-svg", InlineSvg);
}