
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import CustomInput from '@/components/CustomInput.vue';
import TextAreaCustom from '@/components/TextAreaCustom.vue';
import ButtonCustom from '@/components/ButtonCustom.vue';
import TableCustom from '@/components/TableCustom.vue';
import { getClases } from '../../actions';
import { useToast } from 'vue-toastification';
import type { TBody } from '../../interfaces/TableCustom.interface';
import type { Datos } from '../../interfaces/clases.interface';


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
    const toast = useToast();
    const datos = ref<TBody[]>([]);
    const getDatos = ref<Datos[]>([]);

    const [id_Clasificacion, id_ClasificacionAttrs] = defineField('id_clasificacion');
    const [grade, gradeAttrs] = defineField('grade');
    const [descripcion, descripcionAttrs] = defineField('descripcion');

    onMounted(async () => {
      const data = await getClases();

      if (!data.ok) {
        toast.error(data.message);
        return;
      }
      getDatos.value = data.datos;
      datos.value = data.datos.map(dato => {
        return {
          id: dato.idclasificacion,
          texto1: dato.clave,
          texto2: dato.descripcion,
        }
      });
    });

    const selectClass = (clase: TBody) => {
      console.log(clase);
      console.log('Desde el padre');

    }

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
      datos,


      thead: computed(() => ['ID Clasificacion', 'Grade', 'Descripción', 'Acción']),
      selectClass
    }
  }
});
