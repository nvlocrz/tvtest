# TV Latam – Addon para Stremio / Nuvio

Canales en vivo de Latinoamérica, España e internacionales.

## Instalación rápida (local)

```bash
cd tv-latam-stremio
npm install
npm start
```

Luego abre en el navegador:
```
http://localhost:7000/manifest.json
```

Copia esa URL e instálala en **Stremio** o en **Nuvio → Addons** (no en Plugins).

## Desplegar online (recomendado)

### Opción A – Railway / Render / Fly.io
1. Sube esta carpeta a un repositorio de GitHub.
2. Conecta el repo en Railway o Render.
3. El comando de inicio es: `npm start`
4. Usa la URL que te den + `/manifest.json`

### Opción B – Glitch
1. New Project → Import from GitHub
2. Cuando arranque, la URL será algo como:
   `https://tu-proyecto.glitch.me/manifest.json`

## URL de instalación

Una vez desplegado:
```
https://TU-DOMINIO/manifest.json
```

En Nuvio: **Ajustes → Addons → Agregar addon** → pega la URL.

## Características
- ~140+ canales de respaldo
- Auto-actualización desde listas públicas (México, Argentina, Colombia, Chile, Perú, España)
- Filtro por género y búsqueda
- Compatible con Stremio y Nuvio
