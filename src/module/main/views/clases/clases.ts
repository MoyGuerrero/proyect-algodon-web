
import { computed, defineComponent, ref, watch } from 'vue';
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
  props: {
    open: {
      type: Boolean,
      required: true
    },
    tipo: {
      type: String,
      default: ""
    }
  },
  emits: ['click'],
  setup(props) {
    // defineEmits(['click']);
    const { defineField, errors } = useForm();
    const openModal = ref<boolean>(false);

    const [id_Clasificacion, id_ClasificacionAttrs] = defineField('id_clasificacion');
    const [grade, gradeAttrs] = defineField('grade');
    const [descripcion, descripcionAttrs] = defineField('descripcion');

    watch(() => props.open, (newOpen) => {
      openModal.value = newOpen;
    })
    return {
      id_Clasificacion,
      id_ClasificacionAttrs,
      grade,
      gradeAttrs,
      descripcion,
      descripcionAttrs,
      errors,
      openModal,
      text: props.tipo,


      thead: computed(() => ['ID Clasificacion', 'Grade', 'Descripción'])
    }
  }
});
