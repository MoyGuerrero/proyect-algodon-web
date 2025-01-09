import { defineComponent } from "vue";
import { useForm } from "vee-validate";

import TextAreaCustom from "@/components/TextAreaCustom.vue";



export default defineComponent({
  components: {
    TextAreaCustom
  },
  setup() {

    const { defineField } = useForm();


    const [idRecibas, idRecibasAttrs] = defineField('idRecibas');
    const [zona, zonaAttrs] = defineField('zona');
    const [gin, ginAttrs] = defineField('gin');
    const [color, colorAttrs] = defineField('color');
    const [basura, basuraAttrs] = defineField('basura');
    const [temporada, temporadaAttrs] = defineField('temporada');
    const [observaciones, observacionesAttrs] = defineField('observaciones');
    return {
      idRecibas, idRecibasAttrs,
      zona, zonaAttrs,
      gin, ginAttrs,
      color, colorAttrs,
      basura, basuraAttrs,
      temporada, temporadaAttrs,
      observaciones, observacionesAttrs,
    }
  }
});
