
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
import { addGC, dowloadGC, getClases } from '../../actions';
import { useToast } from 'vue-toastification';

const valores: string[] = [];

const validationSchema = yup.object({
  gradocolor: yup.string().required(),
  trashId: yup.string().required(),
  descripcion: yup.string(),
  idclase: yup.string(),
});


interface Grade {
  id: number,
  clave: string
}

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
    const grades = ref<Grade[]>([]);
    const textLoading = ref<string>('')
    const toast = useToast();

    const { defineField, errors, handleSubmit, setValues, handleReset } = useForm({
      validationSchema,
      initialValues: {
        Idgradosclasificacion: 0,
        gradocolor: "",
        trashId: 0,
        descripcion: '',
        idclase: '2',
      }
    });

    const router = useRouter();

    const [Idgradosclasificacion, IdgradosclasificacionAttrs] = defineField('Idgradosclasificacion');
    const [gradocolor, gradocolorAttrs] = defineField('gradocolor');
    const [trashId, trashIdAttrs] = defineField('trashId');
    const [descripcion, descripcionAttrs] = defineField('descripcion');
    const [idclase, idclaseAttrs] = defineField('idclase');


    onMounted(async () => {
      textLoading.value = 'Cargando....';
      await carga()
    });

    const carga = async () => {
      const data = await getGradosClasificacion();
      const clases = await getClases();

      if (!data.ok) return;

      if (!clases.ok) return;

      grades.value = clases.datos.map(c => {
        return {
          id: c.idclasesenc,
          clave: c.clave
        }
      });

      for (let i = 0; i < clases.datos.length; i++) {
        valores.push(clases.datos[i].clave)
      }

      datos.value = data.datos;
      isLoading.value = false;
    }

    const onSubmit = handleSubmit(async values => {
      textLoading.value = 'Guardando....';
      isLoading.value = true;
      const response = await addGC(values);
      if (!response.ok) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      await carga();
      handleReset();
    });


    const dowload = async () => {
      await dowloadGC("plantilla_carga_gradosclasif");
    }

    const edit = (id: number) => {
      const data = datos.value.filter(d => d.idgradosclasificacion === id);
      const { clave, trashid, ...params } = data[0];
      const getGrade = grades.value.filter(g => g.clave === clave);

      setValues({
        ...params,
        trashId: trashid,
        idclase: getGrade[0].id.toString()
      })

    }

    return {
      Idgradosclasificacion,
      IdgradosclasificacionAttrs,
      gradocolor,
      gradocolorAttrs,
      trashId,
      trashIdAttrs,
      descripcion,
      descripcionAttrs,
      idclase,
      idclaseAttrs,
      isVisibleModal,
      datos, //<--- Esta variable reactiva es el encargado de cargar los datos en la tabla.
      isLoading,
      errors,
      router,
      grades,
      textLoading,
      dowload,
      onSubmit,
      edit,
    }
  }
});
