import { useForm } from "vee-validate";
import { computed, defineComponent, onMounted, ref } from "vue";

import ButtonCustom from "@/components/ButtonCustom.vue";
import CustomInput from "@/components/CustomInput.vue";
import TableCustom from "@/components/TableCustom.vue";
import TextAreaCustom from "@/components/TextAreaCustom.vue";
import LoadingCustom from "@/components/LoadingCustom.vue";

import { perfilVentas } from "../../actions/perfilesventas.action";
import type { TBody } from "../../interfaces";
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  components: {
    CustomInput,
    ButtonCustom,
    TableCustom,
    TextAreaCustom,
    LoadingCustom
  },
  setup() {
    const isLoading = ref<boolean>(true);
    const Detalles = ref<TBody[]>([]);
    const perfiles = ref<TBody[]>([]);

    const date = new Date();

    const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
    const actionOption = ref<boolean>(false)
    const { defineField, errors } = useForm({
      initialValues: {
        descripcion: "",
        estatus: "",
        fechaCreacion: now,
        fechaActualizacion: now,
      }
    });

    const [descripcion, descripcionAttrs] = defineField('descripcion');
    const [estatus, estatusAttrs] = defineField('estatus');
    const [fechaCreacion, fechaCreacionAttrs] = defineField('fechaCreacion');
    const [fechaActualizacion, fechaActualizacionAttrs] = defineField('fechaActualizacion');

    onMounted(async () => {
      const response = await perfilVentas(0);

      if (!response.ok) return;
      isLoading.value = false;

      perfiles.value = response.perfil2.map(per => {
        return {
          id: per.idperfilenc === 0 ? uuidv4() : per.idperfilenc,
          texto1: per.descripcion,
          texto2: per.estatus,
          texto3: per.fechacreacion.toString().replace('T', ' ').split('.')[0]
        }
      });

      Detalles.value = response.perfil1.map(det => {
        return {
          id: det.idclasificacion,
          texto1: det.descripcion,
          texto2: det.clave,
          texto3: det.diferencial
        }
      });

    });

    return {
      descripcion,
      descripcionAttrs,
      estatus,
      estatusAttrs,
      fechaCreacion,
      fechaCreacionAttrs,
      fechaActualizacion,
      fechaActualizacionAttrs,
      errors,
      isLoading,
      Detalles,
      perfiles,
      actionOption,
      theadPerfiles: computed(() => ['ID', 'Descripción', 'Estatus', 'Fecha Creación']),
      theadDetalles: computed(() => ['ID Clasificación', 'Descripción', 'Clave', 'Diferencial']),
    }
  }
});
