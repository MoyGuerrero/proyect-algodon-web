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
        { id: uuidv4(), name: 'Provededores', path: 'proveedores', children: [] },
        { id: uuidv4(), name: 'Clientes', path: 'clientes', children: [] },
        {
          id: uuidv4(),
          name: 'Grados Clasificación',
          path: 'grados-clasificacion',
          children: []
        },
        {
          id: uuidv4(), name: 'Perfiles de deducción', path: 'clases', children: [
            { id: uuidv4(), name: 'Perfil de micros', path: 'perfil-micros', children: [] },
            { id: uuidv4(), name: 'Perfil de resistencia', path: 'perfil-resistencia', children: [] },
            { id: uuidv4(), name: 'Perfil de uniformidad', path: 'perfil-uniformidad', children: [] },
            { id: uuidv4(), name: 'Perfil de UHML', path: 'perfil-uhml', children: [] },
          ]
        },
        { id: uuidv4(), name: 'Perfiles de venta', path: 'perfiles-venta', children: [] },
        { id: uuidv4(), name: 'Unidad para venta', path: 'unidad-venta', children: [] },
      ]
    },
    {
      id: uuidv4(), name: 'Comercialización', subpath: [
        { id: uuidv4(), name: 'Recibas', path: 'recibas', children: [] },
        { id: uuidv4(), name: 'Calculo compra', path: 'calculo-compra', children: [] },
        // { id: uuidv4(), name: 'Adjuntar Factura', path: 'adjuntar-factura', children: [] },
      ]
    },
    {
      id: uuidv4(), name: 'Logistica', subpath: [
        { id: uuidv4(), name: 'Lotes', path: 'lote', children: [] },
        { id: uuidv4(), name: 'Orden de Embarques', path: 'orden-embarques', children: [] },
        { id: uuidv4(), name: 'Salidas', path: 'salidas', children: [] },
      ]
    },
    {
      id: uuidv4(), name: 'Reportes', subpath: [
        { id: uuidv4(), name: 'Inventario', path: 'inventario', children: [] },
        { id: uuidv4(), name: 'Consulta de clases', path: 'consulta-clases', children: [] },
        { id: uuidv4(), name: 'Reporte de productor', path: 'reporte-productor', children: [] },
      ]
    },
    {
      id: uuidv4(), name: 'Configuracion', subpath: [
        { id: uuidv4(), name: 'Configuración de empresa', path: 'configuracion-empresa', children: [] },
      ]
    },
  ]);

  const openOptions = (uuid: string) => {
    const list = document.getElementById('dropdown-example-' + uuid);

    list?.classList.toggle('hidden');
  }

  const openOptions2 = (uuid: string) => {
    const list = document.getElementById('hijos_' + uuid);

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
    openOptions,
    openOptions2,
  }
}
