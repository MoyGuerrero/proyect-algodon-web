
import ButtonCustom from '@/components/ButtonCustom.vue';
import CustomInput from '@/components/CustomInput.vue';
import { useForm } from 'vee-validate';
import { defineComponent, onMounted, ref } from 'vue';
import * as yup from 'yup';
import ModalViewWithSlots from '../../components/ModalViewWithSlots.vue';
import { useRouter } from 'vue-router';
import { getGradosClasificacion } from '../../actions/grados_clasificacion.action';
import type { DatosGrados } from '../../interfaces/grados_clasificacion.interface';
import TableCustom from '@/components/TableCustom.vue';
import LoadingCustom from '@/components/LoadingCustom.vue';

const validationSchema = yup.object({
  grados: yup.string().required(),
  trashId: yup.string().required(),
  color: yup.string().required(),
  grade: yup.string().required(),
})

export default defineComponent({
  components: {
    CustomInput,
    ButtonCustom,
    ModalViewWithSlots,
    TableCustom,
    LoadingCustom
  },
  setup() {
    const isVisibleModal = ref<boolean>(false)
    const datos = ref<DatosGrados[]>([])
    const isLoading = ref<boolean>(true);
    const { defineField, errors } = useForm({ validationSchema });

    const router = useRouter();

    const [grados, gradosAttrs] = defineField('grados');
    const [trashId, trashIdAttrs] = defineField('trashId');
    const [color, colorAttrs] = defineField('color');
    const [grade, gradeAttrs] = defineField('grade');


    onMounted(async () => {
      const data = await getGradosClasificacion();

      if (!data.ok) return;


      datos.value = data.datos;
      isLoading.value = false;

    });

    return {
      grados,
      gradosAttrs,
      trashId,
      trashIdAttrs,
      color,
      colorAttrs,
      grade,
      gradeAttrs,
      isVisibleModal,
      datos, //<--- Esta variable reactiva es el encargado de cargar los datos en la tabla.
      isLoading,
      errors,
      router
    }
  }
});
