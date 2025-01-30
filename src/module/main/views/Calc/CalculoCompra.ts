import ButtonCustom from "@/components/ButtonCustom.vue";
import TableWithSlot from "@/components/TableWithSlot.vue";
import { computed, defineComponent, ref } from "vue";


export default defineComponent({
  components: {
    ButtonCustom,
    TableWithSlot
  },
  setup() {

    const tabs = ref<string[]>(['Deducciones']);
    const cabecera = ref<string[]>(['ID Clase', 'Grade', 'Dif', 'Precio']);

    return {
      tabs,
      cabecera,

      thead: computed(() => ['Predio', 'BaleID', 'Mic', 'UHML', 'UI', 'Strength', 'SFI', 'Grade', 'Color Grade', 'Kilos compra', 'Libras compra', 'Quintales compra', 'Seleccionar'])
    }
  }
})
