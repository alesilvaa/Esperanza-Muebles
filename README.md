# Esperanza Muebles

Tienda digital para **Esperanza Muebles**, una carpintería y mueblería paraguaya dedicada a muebles de madera y hierro hechos a pedido.

El sitio permite explorar productos, preparar un pedido sin pago online y enviar la solicitud de cotización por WhatsApp.

## Funcionalidades

- Catálogo con búsqueda y filtros por categoría.
- Fichas de producto con medidas, materiales y características.
- Carrito persistente con cantidades y notas por producto.
- Checkout de cotización mediante WhatsApp.
- Formulario para muebles a medida.
- Diseño responsive y optimizado para dispositivos móviles.
- Configuración segura para ocultar datos comerciales todavía no confirmados.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase, previsto para catálogo y administración
- Vercel, previsto para producción

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

## Verificación

```bash
npm run lint
npm run build
```

## Configuración pendiente

Los datos comerciales que todavía necesitan confirmación están centralizados en `src/config/site.ts` y señalados con `TODO(cliente)`.

Antes de habilitar el cierre de pedidos se debe cargar el número oficial de WhatsApp en formato `595XXXXXXXXX`.
