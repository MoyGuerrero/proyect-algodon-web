import { v4 as uuidv4 } from 'uuid';
import { onMounted, ref } from 'vue';
import type { Menu } from '../interfaces/menu.interface';



export const useSideBar = () => {


  const isVisibleAside = ref<boolean>(true);

  const menus = ref<Menu[]>([
    {
      id: uuidv4(),
      name: 'Catalogos',
      subpath: [
        { id: uuidv4(), name: 'Provededores', path: 'proveedores' },
        { id: uuidv4(), name: 'Clientes', path: 'clientes' },
        { id: uuidv4(), name: 'Grados Clasificación', path: 'grados-clasificacion' },
        { id: uuidv4(), name: 'Clases', path: 'clases' },
        { id: uuidv4(), name: 'Perfiles de venta', path: 'perfiles-venta' },
        { id: uuidv4(), name: 'Unidad para venta', path: 'unidad-venta' },
      ]
    },
    {
      id: uuidv4(), name: 'Comercialización', subpath: [
        { id: uuidv4(), name: 'Recibas', path: 'recibas' },
        { id: uuidv4(), name: 'Calculo compra', path: 'calculo-compra' },
        { id: uuidv4(), name: 'Adjuntar Factura', path: 'adjuntar-factura' },
      ]
    },
    {
      id: uuidv4(), name: 'Logistica', subpath: [
        { id: uuidv4(), name: 'Lotes', path: 'lote' },
        { id: uuidv4(), name: 'Orden de Embarques', path: 'orden-embarques' },
        { id: uuidv4(), name: 'Salidas', path: 'salidas' },
      ]
    },
    {
      id: uuidv4(), name: 'Reportes', subpath: [
        { id: uuidv4(), name: 'Inventario', path: 'inventario' },
        { id: uuidv4(), name: 'Consulta de clases', path: 'consulta-clases' },
        { id: uuidv4(), name: 'Reporte de productor', path: 'reporte-productor' },
      ]
    },
    {
      id: uuidv4(), name: 'Configuracion', subpath: [
        { id: uuidv4(), name: 'Configuración de empresa', path: 'configuracion-empresa' },
      ]
    },
  ]);


  const openOptions = (uuid: string) => {
    const list = document.getElementById('dropdown-example-' + uuid);

    list?.classList.toggle('hidden');
  }


  const getWidthResponsive = () => {
    isVisibleAside.value = window.innerWidth <= 639 ? true : false;
  }

  onMounted(() => {
    if (window.innerWidth <= 639) {
      isVisibleAside.value = true
    }

    window.addEventListener("resize", getWidthResponsive);
  });

  return {
    isVisibleAside,
    menus,
    openOptions
  }
}
