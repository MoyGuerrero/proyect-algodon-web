
import { computed, defineComponent } from 'vue';
import { useForm } from 'vee-validate';
import CustomInput from '@/components/CustomInput.vue';
import TextAreaCustom from '@/components/TextAreaCustom.vue';
import ButtonCustom from '@/components/ButtonCustom.vue';
import TableCustom from '@/components/TableCustom.vue';


export default defineComponent({
  components: {
    CustomInput,
    TextAreaCustom,
    ButtonCustom,
    TableCustom
  },
  setup() {
    const { defineField, errors } = useForm();

    const [id_Clasificacion, id_ClasificacionAttrs] = defineField('id_clasificacion');
    const [grade, gradeAttrs] = defineField('grade');
    const [descripcion, descripcionAttrs] = defineField('descripcion');
    return {
      id_Clasificacion,
      id_ClasificacionAttrs,
      grade,
      gradeAttrs,
      descripcion,
      descripcionAttrs,
      errors,

      thead: computed(() => ['ID Clasificacion', 'Grade', 'Descripción'])
    }
  }
});
