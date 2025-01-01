/* eslint-disable @typescript-eslint/no-unused-vars */
import ButtonCustom from "@/components/ButtonCustom.vue";
import CustomInput from "@/components/CustomInput.vue";
import LoadingCustom from "@/components/LoadingCustom.vue";
import TableCustom from "@/components/TableCustom.vue";
import TableWithSlot from "@/components/TableWithSlot.vue";
import ModalConfirmation from "../../components/ModalConfirmation.vue";
import * as XLSX from 'xlsx'

import { useForm } from "vee-validate";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { AddPerfilDeduccionDet, AddPerfilDeduccionEnc, AddPerfilUHNK, DeletePerfil, getPMVENC } from "../../actions";
import { useToast } from "vue-toastification";

import type { TBody } from "../../interfaces";
import type { PMVENC } from "../../interfaces/PMVENC.interface";
import { v4 as uuidv4 } from 'uuid';
import { getPerfilesDeducciones } from "../../actions/getPerfilDet.action";
import type { number } from "yup";

interface PerfilDet {
  id: string,
  idperfildet: number,
  idperfilenc: number,
  rango1: number,
  rango2: number,
  castigo: number,
  lenghtNDS?: number
}

interface Excel {
  r1: number,
  r2: number,
  l: number,
  c: number
}


export default defineComponent({
  components: {
    CustomInput,
    ButtonCustom,
    TableCustom,
    TableWithSlot,
    LoadingCustom,
    ModalConfirmation
  },
  setup() {
    const route = useRoute();
    const inputID = ref<HTMLInputElement | null>(null)
    const name = ref<string>('')
    const idRow = ref<string>('')
    const texto = ref<string>('Cargando.....')
    const isLoading = ref<boolean>(true);
    const perfilesEnc = ref<TBody[]>([]);
    const perfilesDet = ref<PerfilDet[]>([]);
    const datosPerfilesEnc = ref<PMVENC[]>([]);
    const position = ref<number>(0);
    const open = ref<boolean>(false);
    const cabecera = ref<string[]>(['Rango 1', 'Rango 2', 'Cartigo']);
    const inputFile = ref<HTMLInputElement | null>(null);

    const date = new Date();

    const now = `${date.getFullYear()}-${(date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}T${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;

    const toast = useToast();
    const { defineField, handleSubmit, errors, setValues, handleReset } = useForm({
      initialValues: {
        idperfilenc: 0,
        descripcion: '',
        idestatus: '',
        fechacreacion: now,
        fechaactualizacion: now
      }
    });

    const [idperfilenc, idperfilencAttrs] = defineField("idperfilenc");
    const [descripcion, descripcionAttrs] = defineField("descripcion");
    const [idestatus, idestatusAttrs] = defineField("idestatus");
    const [fechacreacion, fechacreacionAttrs] = defineField("fechacreacion");
    const [fechaactualizacion, fechaactualizacionAttrs] = defineField("fechaactualizacion");

    onMounted(async () => {
      name.value = route.fullPath.split('/')[route.fullPath.split('/').length - 1];
      const exist = cabecera.value.some(c => c == 'LenghtNDS');

      if (exist) {
        cabecera.value = cabecera.value.filter(c => c !== 'LenghtNDS')
      }
      if (name.value.includes('perfil-uhml')) {
        cabecera.value = [...cabecera.value, 'LenghtNDS']
      }
      await load(name.value);
    });

    const load = async (path: string) => {
      datosPerfilesEnc.value = [];
      if (path.includes('perfil-micros')) {
        // alert('Hello Word')
        const response = await getPMVENC(0);

        if (!response.ok) {
          toast.error(response.message);
          return;
        }

        datosPerfilesEnc.value = response.datos;
        perfilesEnc.value = response.datos.map(p => {
          return {
            id: p.idperfilenc,
            texto1: p.descripcion,
            texto2: p.estatus,
            texto3: `${p.fechacreacion.toString().replace('T', ' ').split('.')[0]} ${getAMorPM(p.fechacreacion.toString())}`
          }
        });
        isLoading.value = false;
        return;
      }

      if (path.includes('perfil-resistencia')) {
        const response = await getPMVENC(1);

        if (!response.ok) {
          toast.error(response.message);
          return;
        }

        datosPerfilesEnc.value = response.datos;

        perfilesEnc.value = response.datos.map(p => {
          return {
            id: p.idperfilenc,
            texto1: p.descripcion,
            texto2: p.estatus,
            texto3: `${p.fechacreacion.toString().replace('T', ' ').split('.')[0]} ${getAMorPM(p.fechacreacion.toString())}`
          }
        });
        isLoading.value = false;
        return;
      }

      if (path.includes('perfil-uniformidad')) {
        const response = await getPMVENC(2);

        if (!response.ok) {
          toast.error(response.message);
          return;
        }

        datosPerfilesEnc.value = response.datos;

        perfilesEnc.value = response.datos.map(p => {
          return {
            id: p.idperfilenc,
            texto1: p.descripcion,
            texto2: p.estatus,
            texto3: `${p.fechacreacion.toString().replace('T', ' ').split('.')[0]} ${getAMorPM(p.fechacreacion.toString())}`
          }
        });
        isLoading.value = false;
        return;
      }

      if (path.includes('perfil-uhml')) {
        const response = await getPMVENC(3);

        if (!response.ok) {
          toast.error(response.message);
          return;
        }

        datosPerfilesEnc.value = response.datos;

        perfilesEnc.value = response.datos.map(p => {
          return {
            id: p.idperfilenc,
            texto1: p.descripcion,
            texto2: p.estatus,
            texto3: `${p.fechacreacion.toString().replace('T', ' ').split('.')[0]} ${getAMorPM(p.fechacreacion.toString())}`
          }
        });
        isLoading.value = false;
        return;
      }
    }

    watch(() => route.fullPath, async (newName) => {
      isLoading.value = true;
      const path = newName.split('/')[newName.split('/').length - 1];
      name.value = path;
      const exist = cabecera.value.some(c => c == 'LenghtNDS');

      if (exist) {
        cabecera.value = cabecera.value.filter(c => c !== 'LenghtNDS');
      }
      if (name.value.includes('perfil-uhml')) {
        cabecera.value = [...cabecera.value, 'LenghtNDS']
      }
      resetForm();
      await load(name.value)
      isLoading.value = false;
    });

    const getAMorPM = (date: string): string => {
      const now = new Date(date);
      const hour = now.getHours();

      const period = hour >= 12 ? 'PM' : 'AM';
      return period;
    }

    const onSubmit = handleSubmit(async values => {

      const newValues = {
        ...values,
        idestatus: values.idestatus.includes('ACTIVO') ? 1 : 0
      }

      position.value = getPosition(name.value);
      const response = await AddPerfilDeduccionEnc(newValues, position.value);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      if (perfilesDet.value.length > 0) {

        await saveDet(response.id, position.value);
      }

      await load(name.value);
      selectedRow(response.id);
      toast.success(response.message);
    });

    const addRow = () => {
      if (idperfilenc.value === 0) {
        toast.info("Favor de seleccionar un perfil o crear uno.");
        return;
      }

      if (!name.value.includes('perfil-uhml')) {
        perfilesDet.value.push({
          id: uuidv4(),
          idperfildet: 0,
          idperfilenc: idperfilenc.value,
          rango1: 0.0,
          rango2: 0.0,
          castigo: 0.0
        });
      } else {
        perfilesDet.value.push({
          id: uuidv4(),
          idperfildet: 0,
          idperfilenc: idperfilenc.value,
          rango1: 0.0,
          rango2: 0.0,
          castigo: 0.0,
          lenghtNDS: 0.0
        });
      }
    }

    const removeRow = (id: string) => {
      open.value = true;
      idRow.value = id;
    };

    const selectedRow = async (id: number) => {
      position.value = getPosition(name.value)

      const { idestatus, fechacreacion, fechaactualizacion, estatus, ...params } = datosPerfilesEnc.value.filter(pc => pc.idperfilenc === id)[0];
      setValues({
        ...params,
        idestatus: estatus.toUpperCase(),
        fechacreacion: fechacreacion.toString().split('.')[0],
        fechaactualizacion: fechaactualizacion.toString().split('.')[0]
      });


      const res = await getPerfilesDeducciones(id, position.value);

      if (!res.ok) {
        toast.error(res.message)
        return;
      }

      perfilesDet.value = res.datos.map(d => {
        return {
          id: uuidv4(),
          ...d
        }
      });

    }

    const valores = (e: Event, value: string, posicion: number) => {

      if (perfilesDet.value[posicion] && value == 'rango1') {
        perfilesDet.value[posicion][value] = parseFloat((e.target as HTMLInputElement).value);
      }
      if (perfilesDet.value[posicion] && value == 'rango2') {
        perfilesDet.value[posicion][value] = parseFloat((e.target as HTMLInputElement).value);
      }
      if (perfilesDet.value[posicion] && value == 'castigo') {
        perfilesDet.value[posicion][value] = parseFloat((e.target as HTMLInputElement).value);
      }
      if (perfilesDet.value[posicion] && value == 'lenghtNDS') {
        perfilesDet.value[posicion][value] = parseFloat((e.target as HTMLInputElement).value);
      }

    }

    const saveDet = async (idBD: number, p: number) => {
      const newValues = perfilesDet.value.map(p => {
        const { id, ...params } = p;
        return {
          ...params,
          idperfilenc: idBD,
        }
      });

      if (p === 3) {
        const response = await AddPerfilUHNK(newValues);
      } else {
        const response = await AddPerfilDeduccionDet(newValues, p);

      }

    }

    const resetForm = () => {
      handleReset();
      perfilesDet.value = [];
    }


    const getPosition = (path: string): number => {
      let position = 0;
      switch (path) {
        case 'perfil-micros': {
          position = 0;
          break;
        }
        case 'perfil-resistencia': {
          position = 1;
          break;
        }
        case 'perfil-uniformidad': {
          position = 2;
          break;
        }
        case 'perfil-uhml': {
          position = 3;
          break;
        }
      }
      return position;
    }

    const deletePerfil = async () => {
      isLoading.value = true;
      const selected = perfilesDet.value.filter(pd => pd.id === idRow.value);
      const { idperfildet, ...params } = selected[0];

      const response = await DeletePerfil(position.value, idperfildet);
      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      perfilesDet.value = perfilesDet.value.filter(pd => pd.id !== idRow.value)
      toast.success(response.message);
      open.value = false;
      isLoading.value = false;
    }

    const cargarArchivo = () => idperfilenc.value > 0 ? inputFile.value?.click() : toast.info("Favor de seleccionar o crear un perfil para cargar los detalles.");
    // const cargarArchivo = () => inputFile.value?.click();
    const onChangeFile = (e: Event) => {
      isLoading.value = true;
      const target = (e.target as HTMLInputElement)
      const validateExtension = ['xltx', 'xlsx']
      if (!target.files) return;

      const extension = target.files[0].name.split('.').pop()?.toLowerCase();

      if (extension && !validateExtension.includes(extension)) {
        toast.error("El archivo seleccionado no es compatible, favor de cargar un excel.");
        return;
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result;

        if (!(result instanceof ArrayBuffer)) return;

        const data = new Uint8Array(result);

        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        perfilesDet.value = (jsonData.slice(1) as Excel[][]).map((d: Excel[]) => {
          const [R1, R2, L, C] = d;
          return {
            id: uuidv4(),
            idperfildet: 0,
            idperfilenc: idperfilenc.value,
            rango1: R1 == undefined ? 0 : Number(R1),
            rango2: R2 == undefined ? 0 : Number(R2),
            castigo: C == undefined ? 0 : Number(C),
            lenghtNDS: L == undefined ? 0 : Number(L)
          }
        })


      }
      reader.readAsArrayBuffer(target.files[0])
      toast.success('Cargado con éxito.')
      isLoading.value = false;
    }

    return {
      idperfilenc,
      idperfilencAttrs,
      descripcion,
      descripcionAttrs,
      idestatus,
      idestatusAttrs,
      fechacreacion,
      fechacreacionAttrs,
      fechaactualizacion,
      fechaactualizacionAttrs,
      errors,
      texto,
      open,
      isLoading,
      perfilesEnc,
      cabecera: computed(() => ['ID', 'Descripción', 'Estatus', 'Fecha Creación']),
      cabeceradet: computed(() => [...cabecera.value, 'Acción']),
      perfilesDet,
      inputID,
      addRow,
      removeRow,
      selectedRow,
      valores,
      resetForm,
      onSubmit,
      deletePerfil,
      cargarArchivo,
      onChangeFile,
      inputFile
    }
  }
});
