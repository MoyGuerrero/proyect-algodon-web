
import CustomInput from '@/components/CustomInput.vue';
import { useForm } from 'vee-validate';
import { defineComponent } from 'vue';
import * as yup from 'yup';

const validationSchema = yup.object({
  grados: yup.string().required(),
  trashId: yup.string().required(),
  color: yup.string().required(),
  grade: yup.string().required(),
})

export default defineComponent({
  components: {
    CustomInput
  },
  setup() {
    const { defineField, errors } = useForm({ validationSchema });

    const [grados, gradosAttrs] = defineField('grados')
    const [trashId, trashIdAttrs] = defineField('trashId')
    const [color, colorAttrs] = defineField('color')
    const [grade, gradeAttrs] = defineField('grade')

    return {
      grados,
      gradosAttrs,
      trashId,
      trashIdAttrs,
      color,
      colorAttrs,
      grade,
      gradeAttrs,

      errors
    }
  }
});
