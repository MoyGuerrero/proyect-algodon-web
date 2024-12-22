
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import CustomInput from '@/components/CustomInput.vue';
import TextAreaCustom from '@/components/TextAreaCustom.vue';
import ButtonCustom from '@/components/ButtonCustom.vue';
import TableCustom from '@/components/TableCustom.vue';
import { addClase, getClases } from '../../actions';
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
    const { defineField, handleSubmit, errors, handleReset, setValues } = useForm({
      initialValues: {
        idclasesenc: 0,
        idclasificacion: 0,
        clave: '',
        Descripcion: ''
      }
    });
    const openModal = ref<boolean>(false);
    const toast = useToast();
    const datos = ref<TBody[]>([]);
    const getDatos = ref<Datos[]>([]);

    const [idclasesenc, idclasesencAttrs] = defineField('idclasesenc');
    const [idclasificacion, idclasificacionAttrs] = defineField('idclasificacion');
    const [clave, claveAttrs] = defineField('clave');
    const [Descripcion, DescripcionAttrs] = defineField('Descripcion');

    onMounted(async () => {
      await loadClass();
    });

    const loadClass = async () => {
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
    }

    const onSubmit = handleSubmit(async values => {
      const response = await addClase(values);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }


      toast.success(response.message);
      handleReset();
      await loadClass();
    });

    const selectClass = (idclase: number) => {

      const dataSelect = getDatos.value.filter(c => c.idclasesenc === idclase);

      const { descripcion, ...params } = dataSelect[0];

      setValues({
        ...params,
        Descripcion: descripcion
      });



      console.log('Desde el padre');

    }

    watch(() => props.open, (newOpen) => {
      openModal.value = newOpen;
    })
    return {
      idclasesenc,
      idclasesencAttrs,
      idclasificacion,
      idclasificacionAttrs,
      clave,
      claveAttrs,
      Descripcion,
      DescripcionAttrs,
      errors,
      openModal,
      text: props.tipo,
      datos,


      thead: computed(() => ['ID Clasificacion', 'Grade', 'Descripción', 'Acción']),
      selectClass,
      onSubmit,
    }
  }
});
