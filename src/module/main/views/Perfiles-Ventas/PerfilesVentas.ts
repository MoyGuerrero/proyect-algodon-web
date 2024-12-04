
import ButtonCustom from "@/components/ButtonCustom.vue";
import CustomInput from "@/components/CustomInput.vue";
import TableCustom from "@/components/TableCustom.vue";
import TextAreaCustom from "@/components/TextAreaCustom.vue";
import { useForm } from "vee-validate";
import { computed, defineComponent } from "vue";



export default defineComponent({
  components: {
    CustomInput,
    ButtonCustom,
    TableCustom,
    TextAreaCustom
  },
  setup() {
    const { defineField, errors } = useForm({
      initialValues: {
        descripcion: "",
        estatus: "",
        fechaCreacion: new Date().toISOString().split("T")[0],
        fechaActualizacion: new Date().toISOString().split("T")[0],
      }
    });

    const [descripcion, descripcionAttrs] = defineField('descripcion');
    const [estatus, estatusAttrs] = defineField('estatus');
    const [fechaCreacion, fechaCreacionAttrs] = defineField('fechaCreacion');
    const [fechaActualizacion, fechaActualizacionAttrs] = defineField('fechaActualizacion');

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


      theadPerfiles: computed(() => ['ID', 'Descripción', 'Estatus', 'Fecha Creación']),
      theadDetalles: computed(() => ['ID Clasificación', 'Descripción', 'Clave', 'Diferencial']),
    }
  }
});
