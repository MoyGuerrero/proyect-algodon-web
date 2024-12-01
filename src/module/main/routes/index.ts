import type { RouteRecordRaw } from "vue-router";





export const mainRoutes: RouteRecordRaw = {
  path: '/main',
  name: 'main',
  component: () => import('@/module/main/layout/MainLayout.vue'),
  children: [
    { path: 'proveedores', name: 'proveedores', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'clientes', name: 'clientes', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'grados-clasificacion', name: 'grados-clasificacion', component: () => import('@/module/main/views/Grados-Clasificación/GradosClasificacion.vue') },
    { path: 'clases', name: 'clases', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'perfiles-venta', name: 'perfiles-venta', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'unidad-venta', name: 'unidad-venta', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'recibas', name: 'recibas', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'calculo-compra', name: 'calculo-compra', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'adjuntar-factura', name: 'adjuntar-factura', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'lote', name: 'lote', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'orden-embarques', name: 'orden-embarques', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'salidas', name: 'salidas', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'inventario', name: 'inventario', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'consulta-clases', name: 'consulta-clases', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'reporte-productor', name: 'reporte-productor', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
    { path: 'configuracion-empresa', name: 'configuracion-empresa', component: () => import('@/module/main/views/Proveedores/ProveedoresView.vue') },
  ]
}
