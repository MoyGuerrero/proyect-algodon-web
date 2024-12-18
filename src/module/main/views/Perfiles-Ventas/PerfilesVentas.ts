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
    const isLoading = ref<boolean>(true);
    const Detalles = ref<TBody[]>([]);
    const perfiles = ref<TBody[]>([]);
    const datosOriginales = ref<Data[]>([]);

    const date = new Date();

    const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
    const actionOption = ref<boolean>(false)
    const { defineField, errors, handleSubmit } = useForm({
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
      const response = await perfilVentas(0);

      if (!response.ok) return;
      isLoading.value = false;

      perfiles.value = response.perfil2.map(per => {
        return {
          id: per.idperfilenc === 0 ? uuidv4() : per.idperfilenc,
          texto1: per.descripcion,
          texto2: per.estatus,
          texto3: per.fechacreacion.toString().replace('T', ' ').split('.')[0],
          input: -1
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

    });

    const updateModal = (data: ModelUpdate) => {

      if (datosOriginales.value[data.index]) {
        datosOriginales.value[data.index]["diferencial"] = parseInt(data.value);
      }

    }

    const onSubmit = handleSubmit(async values => {
      console.log(values);
      const newValues = {
        ...values,
        idestatus: "ACTIVO" == values.idestatus ? 1 : 0,
      }
      console.log(newValues);
      saveDet(1)

    });


    const saveDet = (id: number) => {
      console.log({ id });

      if (id > 0) {
        const datosDetalles = datosOriginales.value.map(item => ({
          idperfildet: 0,
          idperfilenc: id,
          idclasesenc: item.idclasesenc,
          diferencial: item.diferencial,
        }));
        console.log(datosOriginales.value);
        console.log({ datosDetalles });
        addPerfilVentaDet(datosDetalles);
        return
      }


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
      updateModal,
      onSubmit,
      theadPerfiles: computed(() => ['ID', 'Descripción', 'Estatus', 'Fecha Creación']),
      theadDetalles: computed(() => ['ID Clasificación', 'Descripción', 'Clave', 'Diferencial']),
    }
  }
});
