# Videos de Esperanza Muebles

Guardá aquí los videos optimizados para la web, preferentemente en formato MP4 o WebM.

Después actualizá `src/data/videos.ts`:

```ts
{
  id: "nombre-unico",
  title: "Título visible",
  description: "Descripción breve",
  src: "/videos/nombre-del-video.mp4",
  poster: "/videos/nombre-del-poster.webp",
  posterAlt: "Descripción accesible del poster",
  instagramUrl: "https://www.instagram.com/reel/.../",
}
```

Recomendaciones:

- Relación vertical 9:16.
- Duración breve.
- Poster comprimido en WebP o AVIF.
- Video sin reproducción automática con sonido.
- Evitar archivos excesivamente pesados.
