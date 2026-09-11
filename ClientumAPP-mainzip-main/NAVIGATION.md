# Navegación público/privada — Clientum OS

## Principio de separación

Clientum OS mantiene dos entornos dentro de la misma aplicación:

- **Sitio público:** contenido comercial, productos, industrias, recursos y
  formularios. No requiere autenticación.
- **Suite privada:** dashboard CRM y módulos operativos. Solo se renderiza
  cuando existe una sesión activa.

La URL canónica del entorno privado es `/app`. La URL `/` es la entrada
canónica del sitio público.

## Rutas de entorno

| URL | Entorno | Comportamiento |
| --- | --- | --- |
| `/` | Público | Carga el sitio Clientum |
| `/#/producto/*` | Público | Páginas de producto |
| `/#/industrias/*` | Público | Landings por industria |
| `/#/precios`, `/#/servicios`, `/#/casos` | Público | Secciones comerciales |
| `/#/recursos`, `/#/academia`, `/#/contacto` | Público | Recursos y contacto |
| `/app` y `/app/*` | Privado | Carga el dashboard autenticado |
| `/dashboard/*`, `/crm/*`, `/erp/*` | Privado (alias) | Se normaliza a `/app` |

Las páginas públicas usan el hash para navegar entre secciones sin perder la
entrada `/`. Los aliases privados se mantienen por compatibilidad con enlaces
existentes, pero el dashboard siempre navega a `/app`.

## Flujo de navegación

### Visitante sin sesión

```text
GET /
  ↓
Sitio público
  ↓
Iniciar Sesión / Ingresar al CRM
  ↓
Modal de autenticación
  ↓
Sesión válida
  ↓
/app
```

Un visitante que intenta abrir `/app` directamente nunca recibe el shell
privado: el guard de ruta lo devuelve a `/` y elimina la URL privada del
historial.

### Usuario autenticado

```text
GET /
  ↓
Sitio público + botón persistente “Ir al Dashboard”
  ↓
/app
  ↓
Dashboard CRM
  ↓
“Volver al sitio público”
  ↓
/
```

El botón **Ir al Dashboard** aparece en el CTA principal, en el menú móvil y
como acceso persistente en el sitio público para que una sesión activa no quede
oculta después de recorrer una página comercial.

## Protección del dashboard

`src/components/auth/ProtectedRoute.tsx` centraliza la decisión de renderizar
el shell privado. `src/lib/navigation.ts` define los aliases y detecta las
rutas privadas. `App.tsx` sincroniza `pushState`/`popstate` con el estado de
entorno:

1. Una ruta privada con sesión activa muestra el dashboard.
2. Una ruta privada sin sesión muestra el sitio público.
3. Una ruta pública siempre muestra el sitio público, aunque exista un flag
   antiguo en `sessionStorage`.
4. `/dashboard`, `/crm` y `/erp` se canonicalizan a `/app` cuando se entra al
   área privada.

La autenticación de la aplicación es la autoridad para el renderizado del
cliente. Los endpoints privados del servidor deben continuar validando la
sesión de forma independiente.

## Estructura del sitio público

El antiguo componente monolítico se encuentra dividido en piezas enfocadas:

- `PublicSite.tsx`: orquestación de rutas públicas y modales.
- `PublicNavbar.tsx`: navegación desktop y composición de menús.
- `PublicSearchDialog.tsx`: búsqueda rápida y resultados.
- `PublicSessionBanner.tsx`: acceso persistente para sesiones activas.
- `PublicFooter.tsx`: sitemap y acciones de conversión.
- Páginas específicas: `PublicHome`, `PublicProductPage`,
  `PublicPricingPage`, `PublicResourcesPage`, `PublicContactPage` y demás
  landings.

Los datos de búsqueda viven en `publicNavData.ts` para mantener el componente
visual separado del contenido indexable.

## Añadir una página pública

1. Agregar el path a `PublicRoutePath` en `src/components/public/publicRoutes.ts`.
2. Crear una vista enfocada en `src/components/public/`.
3. Añadir el caso correspondiente en `PublicSite.tsx`.
4. Enlazarla desde `PublicNavbar`, `PublicFooter` o `publicNavData` cuando
   corresponda.

## Añadir una sección privada

1. Agregar el tab y su tipo en `src/types.ts`.
2. Crear el módulo en la carpeta funcional correspondiente.
3. Añadir su renderizado en `MainContent` de `App.tsx`.
4. Añadir la entrada de navegación en `Sidebar.tsx`.
5. Validar permisos dentro del módulo y validar sesión en el endpoint que use.

## Reglas para cambios futuros

- Usar `enterApp()` para pasar al dashboard; no cambiar solo el flag visual.
- Usar `openPublicSite()` para volver al sitio público.
- No leer una URL privada y renderizar datos privados antes de validar sesión.
- Usar rutas relativas para las llamadas al backend del mismo proyecto.
- Mantener cada página o diálogo público en un archivo independiente cuando
  supere una responsabilidad clara.