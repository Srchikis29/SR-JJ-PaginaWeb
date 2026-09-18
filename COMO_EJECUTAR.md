# Como ejecutar Mi Tienda

## Requisitos

- Node.js instalado.
- npm instalado.
- Terminal ubicada en la carpeta raiz del proyecto.

Comprobar las versiones:

```powershell
node --version
npm --version
```

## Instalacion

Desde la carpeta del proyecto, ejecutar:

```powershell
npm install
```

## Variables de entorno

El proyecto incluye `.env.example` como plantilla.

Para crear el archivo local `.env` en PowerShell:

```powershell
Copy-Item .env.example .env
```

La aplicacion puede ejecutarse con datos mock sin configurar un backend. Las variables disponibles son:

```env
VITE_API_URL=http://localhost:4000/api
VITE_PRODUCTS_ENDPOINT=
VITE_ORDERS_ENDPOINT=
```

No rellenar los endpoints de productos o pedidos hasta que el backend defina sus rutas reales.

## Modo desarrollo

Iniciar el servidor local:

```powershell
npm run dev
```

Vite mostrara una URL similar a:

```text
http://localhost:5173
```

Abrir esa URL en el navegador.

## Rutas principales

- `/` - Inicio
- `/catalogo` - Catalogo de productos
- `/producto/camisa-lino-natural` - Detalle de producto
- `/carrito` - Carrito de compras
- `/checkout` - Formulario de checkout
- `/contacto` - Informacion de contacto

## Verificaciones

Compilar la aplicacion para produccion:

```powershell
npm run build
```

Ejecutar el analizador de codigo:

```powershell
npm run lint
```

Previsualizar el build de produccion:

```powershell
npm run preview
```

## Flujo de prueba recomendado

1. Abrir `/catalogo`.
2. Buscar o filtrar un producto.
3. Abrir el detalle de un producto.
4. Seleccionar talla, color y cantidad.
5. Agregar el producto al carrito.
6. Abrir `/carrito` y modificar la cantidad.
7. Pulsar `Ir al checkout`.
8. Completar el formulario y comprobar las validaciones.

## Notas

- Actualmente los productos se cargan desde `src/mocks/products.mock.ts`.
- No hay pagos reales conectados.
- No se debe asumir que `VITE_API_URL` representa un backend disponible.
- Las llamadas a API solo deben activarse cuando existan endpoints reales configurados.
- Para detener el servidor de desarrollo, pulsar `Ctrl + C` en la terminal.
