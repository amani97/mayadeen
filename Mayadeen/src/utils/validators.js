import * as Yup from "yup";
import { useI18n } from "vue-i18n";

export function useValidator() {
    const { t } = useI18n();
    const isRequired = Yup.string().required(t("validation.required"));
    const isArrayRequired = Yup.array().min(1, t("validation.required"));
    const isEmailOptional = Yup.string().email(t("validation.email"));
    const isMin = (e) =>
        Yup.string()
            .required(t("validation.required"))
            .min(e, t("validation.min", [e]));
    const isEmail = Yup.string()
        .email(t("validation.email"))
        .required(t("validation.required"));
    const isPassword = Yup.string()
        .required(t("validation.required"))
        .min(6, t("validation.min", ["6"]));
    const isNumber = Yup.number()
        .typeError(t("validation.number"))
        .required(t("validation.required"));

    const isSimilar = (refKey) =>
        Yup.string()
            .required(t("validation.required"))
            .oneOf([Yup.ref(refKey)], t("validation.similar"));

    return {
        isRequired,
        isEmail,
        isPassword,
        isEmailOptional,
        isSimilar,
        isNumber,
        isArrayRequired,
        isMin,
    };
}
