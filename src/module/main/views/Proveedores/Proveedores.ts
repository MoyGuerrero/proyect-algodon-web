import { defineComponent, onMounted, ref, watch } from "vue";
import { useForm } from "vee-validate"
import * as yup from 'yup';

import CustomInput from "@/components/CustomInput.vue";
import { useRoute } from "vue-router";
import ModalView from "../../components/ModalView.vue";
import ButtonCustom from "@/components/ButtonCustom.vue";
import LoadingCustom from "@/components/LoadingCustom.vue";
import { addClient } from "../../actions";
import { useToast } from "vue-toastification";


const validationSchema = yup.object({
  idcliente: yup.number(),
  nombre: yup.string().required(),
  rfc: yup.string().required(),
  calle: yup.string().required(),
  numext: yup.string().required(),
  colonia: yup.string().required(),
  codigopostal: yup.string().required(),
  municipio: yup.string().required(),
  estado: yup.string().required(),
  pais: yup.string().required(),
  nombrecontacto: yup.string().required(),
  mail: yup.string().required().email(),
  telefono: yup.string().required().min(10),
});


export default defineComponent({
  components: {
    CustomInput,
    ModalView,
    ButtonCustom,
    LoadingCustom
  },
  setup() {

    const route = useRoute();
    const name = ref<string>("");
    const isOpenModal = ref<boolean>(false);
    const isLoading = ref<boolean>(false);

    const toast = useToast();

    const { defineField, errors, handleSubmit, resetForm } = useForm({
      validationSchema, initialValues: {
        idcliente: 0,
        nombre: "",
        rfc: "",
        calle: "",
        numext: "",
        colonia: "",
        codigopostal: "",
        municipio: "",
        estado: "",
        pais: "",
        nombrecontacto: "",
        mail: "",
        telefono: "",
      }
    });


    const [idcliente, idclienteAttrs] = defineField('idcliente');
    const [nombre, nombreAttrs] = defineField('nombre');
    const [rfc, rfcAttrs] = defineField('rfc');
    const [calle, calleAttrs] = defineField('calle');
    const [numext, numextAttrs] = defineField('numext');
    const [colonia, coloniaAttrs] = defineField('colonia');
    const [codigopostal, codigopostalAttrs] = defineField('codigopostal');
    const [municipio, municipioAttrs] = defineField('municipio');
    const [estado, estadoAttrs] = defineField('estado');
    const [pais, paisAttrs] = defineField('pais');
    const [nombrecontacto, nombrecontactoAttrs] = defineField('nombrecontacto');
    const [mail, mailAttrs] = defineField('mail');
    const [telefono, telefonoAttrs] = defineField('telefono');


    const onSubmit = handleSubmit(async values => {
      isLoading.value = true;
      if (name.value.includes('clientes')) {
        const responseClient = await addClient(values);
        if (!responseClient.ok) {
          toast.error(responseClient.message);
          isLoading.value = false;
          return;
        }

        toast.success(responseClient.message);
        resetForm();
        isLoading.value = false;
        return;
      }


    })

    onMounted(() => {
      name.value = route.fullPath.split('/')[route.fullPath.split('/').length - 1];
    });

    watch(() => route.fullPath, (newName) => {
      const path = newName.split('/')[newName.split('/').length - 1];
      name.value = path;
      resetForm();
    });

    return {
      idcliente,
      idclienteAttrs,
      nombre,
      nombreAttrs,
      rfc,
      rfcAttrs,
      calle,
      calleAttrs,
      numext,
      numextAttrs,
      colonia,
      coloniaAttrs,
      codigopostal,
      codigopostalAttrs,
      municipio,
      municipioAttrs,
      estado,
      estadoAttrs,
      pais,
      paisAttrs,
      nombrecontacto,
      nombrecontactoAttrs,
      mail,
      mailAttrs,
      telefono,
      telefonoAttrs,

      errors,
      isOpenModal,
      name,
      isLoading,
      onSubmit,
    }
  }
});
