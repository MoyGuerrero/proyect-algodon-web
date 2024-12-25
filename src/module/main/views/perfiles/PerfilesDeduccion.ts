/* eslint-disable @typescript-eslint/no-unused-vars */
import ButtonCustom from "@/components/ButtonCustom.vue";
import CustomInput from "@/components/CustomInput.vue";
import LoadingCustom from "@/components/LoadingCustom.vue";
import TableCustom from "@/components/TableCustom.vue";
import TableWithSlot from "@/components/TableWithSlot.vue";
import { useForm } from "vee-validate";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { AddPerfilDeduccionDet, AddPerfilDeduccionEnc, getPMVENC } from "../../actions";
import { useToast } from "vue-toastification";
import type { TBody } from "../../interfaces";
import type { PMVENC } from "../../interfaces/PMVENC.interface";
import { v4 as uuidv4 } from 'uuid';
import { getPerfilesDeducciones } from "../../actions/getPerfilDet.action";
interface PerfilDet {
  id: string,
  idperfildet: number,
  idperfilenc: number,
  rango1: number,
  rango2: number,
  castigo: number
}


export default defineComponent({
  components: {
    CustomInput,
    ButtonCustom,
    TableCustom,
    TableWithSlot,
    LoadingCustom
  },
  setup() {
    const route = useRoute();
    const inputID = ref<HTMLInputElement | null>(null)
    const name = ref<string>('')
    const texto = ref<string>('Cargando.....')
    const isLoading = ref<boolean>(true);
    const perfilesEnc = ref<TBody[]>([]);
    const perfilesDet = ref<PerfilDet[]>([]);
    const datosPerfilesEnc = ref<PMVENC[]>([]);


    const date = new Date();

    const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;

    const toast = useToast();
    const { defineField, handleSubmit, errors, setValues } = useForm({
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
      const response = await AddPerfilDeduccionEnc(newValues);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      if (perfilesDet.value.length > 0) {

        await saveDet(response.id);
      }

      await load(name.value)
      selectedRow(response.id)
    });

    const addRow = () => {

      if (perfilesDet.value.length > 0) {

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
          idperfilenc: 0,
          rango1: 0.0,
          rango2: 0.0,
          castigo: 0.0
        });

      }
    }

    const removeRow = (id: string) => {
      perfilesDet.value = perfilesDet.value.filter(pd => pd.id !== id)
    }

    const selectedRow = async (id: number) => {

      const { idestatus, fechacreacion, fechaactualizacion, estatus, ...params } = datosPerfilesEnc.value.filter(pc => pc.idperfilenc === id)[0];
      setValues({
        ...params,
        idestatus: estatus.toUpperCase(),
        fechacreacion: fechacreacion.toString().split('.')[0],
        fechaactualizacion: fechaactualizacion.toString().split('.')[0]
      });

      const res = await getPerfilesDeducciones(id);

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

    }

    const saveDet = async (idBD: number) => {
      const newValues = perfilesDet.value.map(p => {
        const { id, ...params } = p;
        return {
          ...params,
          idperfilenc: idBD
        }
      });
      const response = await AddPerfilDeduccionDet(newValues);

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
      isLoading,
      perfilesEnc,
      cabecera: computed(() => ['ID', 'Descripción', 'Estatus', 'Fecha Creación']),
      cabeceradet: computed(() => ['Rango 1', 'Rango 2', 'Cartigo', 'Acción']),
      perfilesDet,
      inputID,
      addRow,
      removeRow,
      selectedRow,
      valores,
      onSubmit,
    }
  }
});
