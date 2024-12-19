import { useForm } from "vee-validate";
import { computed, defineComponent, onMounted, ref } from "vue";

import ButtonCustom from "@/components/ButtonCustom.vue";
import CustomInput from "@/components/CustomInput.vue";
import TableCustom from "@/components/TableCustom.vue";
import TextAreaCustom from "@/components/TextAreaCustom.vue";
import LoadingCustom from "@/components/LoadingCustom.vue";

import { perfilVentas } from "../../actions/perfilesventas.action";
import type { Data, TBody } from "../../interfaces";
import { v4 as uuidv4 } from 'uuid';
import TableCustomWithInput from "@/components/TableCustomWithInput.vue";
import * as yup from 'yup';
import { addPerfilVentaDet } from "../../actions/AddPerfilVentaDet";
import { useToast } from "vue-toastification";
import { addPerfilVentaEnc } from "../../actions/AddPerfilVenta";

interface ModelUpdate {
  index: number;
  key: string;
  value: string;
}

const validationSchema = yup.object({
  idperfilenc: yup.number() || yup.string(),
  descripcion: yup.string(),
  idestatus: yup.string().required().oneOf(['ACTIVO', 'INACTIVO']),
  fechacreacion: yup.string(),
  fechaactualizacion: yup.string(),
});

export default defineComponent({
  components: {
    CustomInput,
    ButtonCustom,
    TableCustom,
    TableCustomWithInput,
    TextAreaCustom,
    LoadingCustom
  },
  setup() {
    const isLoading = ref<boolean>(false);
    const Detalles = ref<TBody[]>([]);
    const perfiles = ref<TBody[]>([]);
    const datosOriginales = ref<Data[]>([]);
    const toast = useToast();
    const textLoading = ref<string>("Cargando....");

    const date = new Date();

    const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
    const actionOption = ref<boolean>(false)
    const { defineField, errors, handleSubmit, handleReset, setValues } = useForm({
      validationSchema, initialValues: {
        idperfilenc: 0,
        descripcion: "",
        idestatus: "",
        fechacreacion: now,
        fechaactualizacion: now,
      }
    });
    const [idperfilenc, idperfilencAttrs] = defineField('idperfilenc');
    const [descripcion, descripcionAttrs] = defineField('descripcion');
    const [idestatus, idestatusAttrs] = defineField('idestatus');
    const [fechacreacion, fechacreacionAttrs] = defineField('fechacreacion');
    const [fechaactualizacion, fechaactualizacionAttrs] = defineField('fechaactualizacion');

    onMounted(async () => {
      await value(0);
      isLoading.value = false;
    });

    const value = async (id: number) => {

      if (id === 0) {
        const response = await perfilVentas(id);

        if (!response.ok) return;
        isLoading.value = false;

        perfiles.value = response.perfil2.map(per => {
          return {
            id: per.idperfilenc === 0 ? uuidv4() : per.idperfilenc,
            texto1: per.descripcion,
            texto2: per.estatus,
            texto3: per.fechacreacion.toString().replace('T', ' ').split('.')[0]
          }
        });

        datosOriginales.value = response.perfil1;

        Detalles.value = response.perfil1.map(det => {
          return {
            id: det.idclasificacion,
            texto1: det.descripcion,
            texto2: det.clave,
            texto3: det.diferencial
          }
        });
      } else {
        const response = await perfilVentas(id);

        if (!response.ok) return;
        isLoading.value = false;

        perfiles.value = response.perfil2.map(per => {
          return {
            id: per.idperfilenc === 0 ? uuidv4() : per.idperfilenc,
            texto1: per.descripcion,
            texto2: per.estatus,
            texto3: per.fechacreacion.toString().replace('T', ' ').split('.')[0]
          }
        });

        const handleFrom = response.perfil2.filter(p => p.idperfilenc === id);
        const values = handleFrom.map(hf => {
          return {
            idperfilenc: hf.idperfilenc,
            descripcion: hf.descripcion,
            idestatus: hf.estatus,
            fechacreacion: hf.fechacreacion.toString(),
            fechaactualizacion: hf.fechaactualizacion.toString()
          }
        });
        setValues(values[0]);


        datosOriginales.value = response.perfil1;

        Detalles.value = response.perfil1.map(det => {
          return {
            id: det.idclasificacion,
            texto1: det.descripcion,
            texto2: det.clave,
            texto3: det.diferencial
          }
        });
      }

    }

    const updateModal = (data: ModelUpdate) => {

      if (datosOriginales.value[data.index]) {
        datosOriginales.value[data.index]["diferencial"] = parseInt(data.value);
      }

    }

    const onSubmit = handleSubmit(async values => {
      isLoading.value = true;
      console.log('Inicio de guardado');

      textLoading.value = "Guardando....."
      const newValues = {
        ...values,
        idestatus: "ACTIVO" == values.idestatus ? 1 : 0,
      }

      const response = await addPerfilVentaEnc(newValues);

      if (!response.ok) {
        toast.error(response.message);
        isLoading.value = false;
        return;
      }
      await saveDet(response.id);
      await value(0);
      toast.success(response.message);
      // isLoading.value = false;
    });


    const saveDet = async (id: number) => {
      const datosDetalles = datosOriginales.value.map(item => ({
        idperfildet: item.idperfildet,
        idperfilenc: id,
        idclasesenc: item.idclasesenc,
        diferencial: item.diferencial,
      }));

      const response = await addPerfilVentaDet(datosDetalles);

      if (!response.ok) {
        return
      }
      isLoading.value = false;
      handleReset();
    }

    const getID = async (id: number) => {
      isLoading.value = true;
      await value(id);
      isLoading.value = false;
    }

    return {
      idperfilenc,
      idperfilencAttrs,
      descripcion,
      descripcionAttrs,
      idestatus,
      idestatusAttrs,
      fechacreacion,
      fechacreacionAttrs,
      fechaactualizacion,
      fechaactualizacionAttrs,
      errors,
      isLoading,
      Detalles,
      perfiles,
      actionOption,
      textLoading,
      updateModal,
      onSubmit,
      getID,
      theadPerfiles: computed(() => ['ID', 'Descripción', 'Estatus', 'Fecha Creación']),
      theadDetalles: computed(() => ['ID Clasificación', 'Descripción', 'Clave', 'Diferencial']),
    }
  }
});
