import { authAPi } from "@/api/authApi";



export const dowloadGC = async () => {

  try {
    const response = await authAPi.get('/catalogos/descargar_plantilla_gc', {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'plantilla_carga_gradosclasif.xltx');
    document.body.appendChild(link);
    link.click();


    document.body.removeChild(link);

  } catch (error) {
    console.log(error);

  }
}
