import ButtonCustom from "@/components/ButtonCustom.vue";
import CustomInput from "@/components/CustomInput.vue";
import TableCustom from "@/components/TableCustom.vue";
import TextAreaCustom from "@/components/TextAreaCustom.vue";
import { useForm } from "vee-validate";
import { computed, defineComponent, onMounted, ref } from "vue";
import type { TBody } from "../../interfaces";
import { agregarUnidadVenta, getUnidadVenta } from "../../actions";
import { useToast } from "vue-toastification";
import LoadingCustom from "@/components/LoadingCustom.vue";
import * as yup from 'yup';

const validationSchema = yup.object({
  idperfilenc: yup.number() || yup.string(),
  descripcion: yup.string(),
  valorunidad: yup.string().required(),
  idestatus: yup.string().required().oneOf(['ACTIVO', 'INACTIVO']),
  fechacreacion: yup.string(),
  fechaactualizacion: yup.string(),
});

export default defineComponent({
  components: {
    CustomInput,
    TextAreaCustom,
    ButtonCustom,
    TableCustom,
    LoadingCustom
  },
  setup() {
    enum Estatus {
      ACTIVO = 1,
      INACTIVO = 0
    }

    const toast = useToast();
    const body = ref<TBody[]>([]);
    const isLoading = ref<boolean>(true);

    const textLoading = ref<string>("Cargando....")

    const date = new Date();

    const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;

    const { defineField, errors, handleSubmit, resetForm } = useForm({
      validationSchema, initialValues: {
        idperfilenc: 0,
        descripcion: '',
        valorunidad: 0.0,
        idestatus: '',
        fechacreacion: now,
        fechaactualizacion: now,
      }
    });

    const [idperfilenc, idperfilencAttrs] = defineField('idperfilenc');
    const [descripcion, descripcionAttrs] = defineField('descripcion');
    const [valorunidad, valorunidadAttrs] = defineField('valorunidad');
    const [idestatus, idestatusAttrs] = defineField('idestatus');
    const [fechacreacion, fechacreacionAttrs] = defineField('fechacreacion');
    const [fechaactualizacion, fechaactualizacionAttrs] = defineField('fechaactualizacion');


    onMounted(() => {
      valueInitial();
    });

    const valueInitial = async () => {
      const response = await getUnidadVenta();

      if (!response.ok) {
        toast.error(response.message)
        return;
      }

      body.value = response.datos.map(uv => {
        return {
          id: uv.idperfilenc,
          texto1: uv.descripcion,
          texto2: uv.valorunidad,
          texto3: uv.estatus,
          texto4: `${uv.fechacreacion.toString().replace("T", " ").split('.')[0]} ${getAMorPM(uv.fechacreacion.toString().replace("T", " ").split('.')[0])}`
        }
      });
      isLoading.value = false;
    }

    const onSubmit = handleSubmit(async values => {
      isLoading.value = true;
      textLoading.value = "Guardando...."

      const newValues = {
        idperfilenc: values.idperfilenc,
        descripcion: values.descripcion,
        valorunidad: values.valorunidad,
        idestatus: "ACTIVO" === values.idestatus ? Estatus.ACTIVO : Estatus.INACTIVO,
        fechacreacion: values.fechacreacion,
        fechaactualizacion: values.fechaactualizacion
      }
      const response = await agregarUnidadVenta(newValues);

      if (!response.ok) {
        toast.error(response.message);
        isLoading.value = false;
        return;
      }
      toast.success(response.message);

      valueInitial();
      resetForm();
    })


    const getAMorPM = (date: string): string => {
      const now = new Date(date);
      const hour = now.getHours();

      const period = hour >= 12 ? 'PM' : 'AM';
      return period;
    }


    return {
      idperfilenc,
      idperfilencAttrs,
      descripcion,
      descripcionAttrs,
      valorunidad,
      valorunidadAttrs,
      idestatus,
      idestatusAttrs,
      fechacreacion,
      fechacreacionAttrs,
      fechaactualizacion,
      fechaactualizacionAttrs,
      errors,
      body,
      isLoading,
      textLoading,

      cabecera: computed(() => ['ID', 'Descripción', 'Valor', 'Estatus', 'Fecha Creación']),
      onSubmit
    }
  }
});
