import { defineComponent } from "vue";
import { useForm } from "vee-validate"
import * as yup from 'yup';

import CustomInput from "@/components/CustomInput.vue";


const validationSchema = yup.object({
  razonSocial: yup.string().required(),
  rfc: yup.string().required(),
  calle: yup.string().required(),
  numExt: yup.string().required(),
  colonia: yup.string().required(),
  cp: yup.string().required(),
  municipio: yup.string().required(),
  estado: yup.string().required(),
  pais: yup.string().required(),
  nombre: yup.string().required(),
  email: yup.string().required().email(),
  telefono: yup.string().required().min(10),
});


export default defineComponent({
  components: {
    CustomInput
  },
  setup() {

    const { defineField, errors, handleSubmit } = useForm({ validationSchema });


    const [razonSocial, razonSocialAttrs] = defineField('razonSocial');
    const [rfc, rfcAttrs] = defineField('rfc');
    const [calle, calleAttrs] = defineField('calle');
    const [numExt, numExtAttrs] = defineField('numExt');
    const [colonia, coloniaAttrs] = defineField('colonia');
    const [cp, cpAttrs] = defineField('cp');
    const [municipio, municipioAttrs] = defineField('municipio');
    const [estado, estadoAttrs] = defineField('estado');
    const [pais, paisAttrs] = defineField('pais');
    const [nombre, nombreAttrs] = defineField('nombre');
    const [email, emailAttrs] = defineField('email');
    const [telefono, telefonoAttrs] = defineField('telefono');


    const onSubmit = handleSubmit(values => {
      console.log(values);

    })

    return {
      razonSocial,
      razonSocialAttrs,
      rfc,
      rfcAttrs,
      calle,
      calleAttrs,
      numExt,
      numExtAttrs,
      colonia,
      coloniaAttrs,
      cp,
      cpAttrs,
      municipio,
      municipioAttrs,
      estado,
      estadoAttrs,
      pais,
      paisAttrs,
      nombre,
      nombreAttrs,
      email,
      emailAttrs,
      telefono,
      telefonoAttrs,

      errors,
      onSubmit,
    }
  }
});
