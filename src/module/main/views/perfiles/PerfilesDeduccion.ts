import CustomInput from "@/components/CustomInput.vue";
import { useForm } from "vee-validate";
import { defineComponent } from "vue";



export default defineComponent({
  components: {
    CustomInput
  },
  setup() {

    const { defineField, errors } = useForm();

    const [id, idAttrs] = defineField("id");
    const [descripcion, descripcionAttrs] = defineField("descripcion");
    const [estatus, estatusAttrs] = defineField("estatus");
    const [fechacreacion, fechacreacionAttrs] = defineField("fechacreacion");
    const [fechaactualizacion, fechaactualizacionAttrs] = defineField("fechaactualizacion");

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
    }
  }
});
