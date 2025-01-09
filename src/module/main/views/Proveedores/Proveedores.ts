import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useForm } from "vee-validate"
import debounce from 'lodash/debounce';
import * as yup from 'yup';

import CustomInput from "@/components/CustomInput.vue";
import { useRoute } from "vue-router";
import ModalView from "../../components/ModalView.vue";
import ButtonCustom from "@/components/ButtonCustom.vue";
import LoadingCustom from "@/components/LoadingCustom.vue";
import { addClient, getClientes } from "../../actions";
import { useToast } from "vue-toastification";
import type { TBody } from "../../interfaces";

export interface Clientes {
  idcliente: number;
  nombre: string;
  rfc: string;
  calle: string;
  numext: string;
  colonia: string;
  codigopostal: string;
  municipio: string;
  estado: string;
  pais: string;
  nombrecontacto: string;
  mail: string;
  telefono: string;
}


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
    const ClientAndProveedor = ref<TBody[]>([]);
    const userSelect = ref<Clientes[]>([]);

    const toast = useToast();

    const { defineField, errors, handleSubmit, resetForm, setValues } = useForm({
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
        const responseClient = await addClient(values, 'agregar_cliente');
        if (!responseClient.ok) {
          toast.error(responseClient.message);
          isLoading.value = false;
          return;
        }

        toast.success(responseClient.message);
        resetForm();
      } else {
        const responseClient = await addClient(values, 'agregar_proveedor');
        if (!responseClient.ok) {
          toast.error(responseClient.message);
          isLoading.value = false;
          return;
        }

        toast.success(responseClient.message);
        resetForm();
      }
      isLoading.value = false;

    })

    onMounted(async () => {
      name.value = route.fullPath.split('/')[route.fullPath.split('/').length - 1];

      if (name.value.includes('clientes')) {
        await loadData(-1, 'f', 'getClientes');
      } else {
        await loadData(-1, 'f', 'getProveedor');
      }
    });

    watch(() => route.fullPath, async (newName) => {
      isLoading.value = true;
      const path = newName.split('/')[newName.split('/').length - 1];
      name.value = path;
      resetForm();
      ClientAndProveedor.value.length = 0;
      if (name.value.includes('clientes')) {
        await loadData(-1, 'f', 'getClientes');
      } else {
        await loadData(-1, 'f', 'getProveedor');
      }
      isLoading.value = false;
    });

    const loadData = async (idcliente: number = -1, nombre: string = 'f', endpoint: string) => {
      const response = await getClientes(idcliente, nombre, endpoint);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }
      userSelect.value = response.datos;
      ClientAndProveedor.value = response.datos.map(d => {
        return {
          id: d.idcliente,
          texto1: d.nombre,
          texto2: d.rfc,
          texto3: d.calle,
          texto4: d.numext,
          texto5: d.colonia,
          texto6: d.codigopostal,
          texto7: d.municipio,
          texto8: d.estado,
          texto9: d.pais,
          texto10: d.nombrecontacto,
          texto11: d.mail,
          texto12: d.telefono,
        }
      });
    }

    const onDebounce = (value: string) => {
      console.log(value);

      debouncedSearch(value)
    }

    const debouncedSearch = debounce(async (value: string) => {
      const id = value == '' ? -1 : 0;
      const word = value == '' ? 'f' : value;
      if (name.value.includes('clientes')) {
        await loadData(id, word, 'getClientes');
      } else {
        await loadData(id, word, 'getProveedor');

      }
    }, 500);


    const consultar = async () => {
      const endpoint = name.value.includes('clientes') ? 'getClientes' : 'getProveedor';
      await loadData(-1, 'f', endpoint);
      isOpenModal.value = true
    }

    const seleccionar = (id: number) => {
      const value = userSelect.value.filter(user => user.idcliente === id);
      console.log(value);

      setValues(value[0]);
      isOpenModal.value = false;

    }

    const reset = () => {
      resetForm();
    }

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
      ClientAndProveedor,
      cabecera: computed(() => ['Nombre', 'RFC', 'Calle', 'Num Ext', 'Colonia', 'Codigo Postal', 'Municipio', 'Estado', 'Pais', 'Nombre del contacto', 'Correo electronico', 'Telefono']),
      onSubmit,
      onDebounce,
      consultar,
      seleccionar,
      reset
    }
  }
});
