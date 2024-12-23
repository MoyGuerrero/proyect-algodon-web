import ButtonCustom from "@/components/ButtonCustom.vue";
import CustomInput from "@/components/CustomInput.vue";
import LoadingCustom from "@/components/LoadingCustom.vue";
import TableCustom from "@/components/TableCustom.vue";
import TableWithSlot from "@/components/TableWithSlot.vue";
import { useForm } from "vee-validate";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getPMVENC } from "../../actions";
import { useToast } from "vue-toastification";
import type { TBody } from "../../interfaces";



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
    const name = ref<string>('')
    const texto = ref<string>('Cargando.....')
    const isLoading = ref<boolean>(true);
    const perfilesEnc = ref<TBody[]>([])
    const toast = useToast();
    const { defineField, errors } = useForm();

    const [id, idAttrs] = defineField("id");
    const [descripcion, descripcionAttrs] = defineField("descripcion");
    const [estatus, estatusAttrs] = defineField("estatus");
    const [fechacreacion, fechacreacionAttrs] = defineField("fechacreacion");
    const [fechaactualizacion, fechaactualizacionAttrs] = defineField("fechaactualizacion");

    onMounted(async () => {
      name.value = route.fullPath.split('/')[route.fullPath.split('/').length - 1];
      await load(name.value);
    });

    const load = async (path: string) => {
      if (path.includes('perfil-micros')) {
        // alert('Hello Word')
        const response = await getPMVENC(0);

        if (!response.ok) {
          toast.error(response.message);
          return;
        }
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

    return {
      id,
      idAttrs,
      descripcion,
      descripcionAttrs,
      estatus,
      estatusAttrs,
      fechacreacion,
      fechacreacionAttrs,
      fechaactualizacion,
      fechaactualizacionAttrs,
      errors,
      texto,
      isLoading,
      perfilesEnc,
      cabecera: computed(() => ['ID', 'Descripción', 'Estatus', 'Fecha Creación']),
      cabeceradet: computed(() => ['Rango 1', 'Rango 2', 'Cartigo']),
      prueba: computed(() => [
        { id: 1, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
        { id: 2, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
        { id: 3, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
        { id: 4, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
        { id: 5, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
        { id: 6, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
        { id: 7, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
        { id: 8, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
        { id: 9, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
        { id: 10, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
        { id: 11, rango1: 2.60, rango2: 2.69, castigo: -12.00 },
      ])
    }
  }
});
