export function resHasError(status) {
    return status >= 400 && status <= 500;
}

import { i18nUtil } from "../i18n";

const { t } = i18nUtil;

export const saudiCity = [
    { name: t("Riyadh"), latLng: [24.7136, 46.6753] },
    { name: t("Medina"), latLng: [24.47, 39.61] },
    { name: t("Ad Dammam"), latLng: [26.4333, 50.1] },
    { name: t("Tabuk"), latLng: [28.3972, 36.5789] },
    // { name: t("Jeddah"), latLng: [21.5433, 39.1728] },
    { name: t("Arar"), latLng: [30.9833, 41.0167] },
    { name: t("Najran"), latLng: [17.293, 44.756] },
    { name: t("Mecca"), latLng: [21.4225, 39.8233] },
    { name: t("Jazan"), latLng: [16.8892, 42.5611] },
    { name: t("qassim"), latLng: [25.4823, 42.5224] },
    { name: t("hael"), latLng: [27.52, 41.67] },
    // { name: t("jawf"), latLng: [16.47, 45.31] },
    { name: t("asir"), latLng: [19.0, 43.0] },

    { name: t("ahsa"), latLng: [25.23, 49.36] },
];
