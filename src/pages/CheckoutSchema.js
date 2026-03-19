import * as yup from "yup";

export const checkoutSchema = yup.object({
  fullName: yup.string().min(3, "Digite seu nome completo").required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  zipCode: yup.string().length(8, "CEP deve ter 8 dígitos").required("CEP é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
}).required();