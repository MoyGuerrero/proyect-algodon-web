
import ButtonCustom from '@/components/ButtonCustom.vue';
import CustomInput from '@/components/CustomInput.vue';
import { useForm } from 'vee-validate';
import { defineComponent, ref } from 'vue';
import * as yup from 'yup';
import ModalViewWithSlots from '../../components/ModalViewWithSlots.vue';
import { useRouter } from 'vue-router';

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
    ModalViewWithSlots
  },
  setup() {
    const isVisibleModal = ref<boolean>(false)
    const { defineField, errors } = useForm({ validationSchema });

    const router = useRouter();

    const [grados, gradosAttrs] = defineField('grados');
    const [trashId, trashIdAttrs] = defineField('trashId');
    const [color, colorAttrs] = defineField('color');
    const [grade, gradeAttrs] = defineField('grade');

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

      errors,
      router
    }
  }
});
