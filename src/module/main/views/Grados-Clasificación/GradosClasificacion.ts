
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
import { addGC, DeleteGradosClasif, dowloadGC, getClases } from '../../actions';
import { useToast } from 'vue-toastification';
import * as XLSX from 'xlsx'

const valores: string[] = [];

interface JSONDATA {
  gradocolor: string,
  trashid: number,
  descripcion: string,
  idclase: number
}

interface GC {
  Idgradosclasificacion: number,
  gradocolor: string,
  trashId: number,
  descripcion: string,
  idclase: number | string
}

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
    const isVisibleModal = ref<boolean>(false);
    const datos = ref<DatosGrados[]>([])
    const isLoading = ref<boolean>(true);
    const grades = ref<Grade[]>([]);
    const textLoading = ref<string>('');
    const inputFile = ref<HTMLInputElement | null>(null);
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

    const cargarArchivo = () => inputFile.value?.click();

    const onChangeFile = (e: Event) => {
      isLoading.value = true;
      const target = (e.target as HTMLInputElement)
      const validateExtension = ['xltx', 'xlsx']
      const arrayValues = [];
      if (!target.files) return;

      const extension = target.files[0].name.split('.').pop()?.toLowerCase();

      if (extension && !validateExtension.includes(extension)) {
        toast.error("El archivo seleccionado no es compatible, favor de cargar un excel.");
        return;
      }
      const reader = new FileReader();

      reader.onload = async (e) => {

        const response = await DeleteGradosClasif();

        if (!response.ok) {
          toast.error(response.message)
          return;
        }
        const result = e.target?.result;

        if (!(result instanceof ArrayBuffer)) return;

        const data = new Uint8Array(result);

        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData: JSONDATA[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        for (let i = 0; i < jsonData.slice(1).length; i++) {
          const [gradocolor, trashid, descripcion, idclase] = jsonData.slice(1)[i];
          // console.log(gradocolor, trashid, descripcion, idclase);
          const values: GC = {
            Idgradosclasificacion: 0,
            gradocolor: gradocolor === undefined ? '' : gradocolor.toString(),
            trashId: trashid === undefined ? 0 : Number(trashid),
            descripcion: descripcion === undefined ? '' : descripcion.toString(),
            idclase: idclase === undefined ? '' : Number(idclase)
          }

          arrayValues.push(values);

          await addGC(values)
        }

        toast.success('Datos guardados con éxito.')
        isLoading.value = false;
        await carga();
      }
      reader.readAsArrayBuffer(target.files[0])
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
      inputFile,
      dowload,
      onSubmit,
      edit,
      cargarArchivo,
      onChangeFile
    }
  }
});
