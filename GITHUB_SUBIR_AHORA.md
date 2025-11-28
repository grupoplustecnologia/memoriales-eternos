# 🚀 SCRIPT PARA SUBIR A GITHUB

## INSTRUCCIONES RÁPIDAS

### PASO 1: Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre: `cementerio-virtual-animales`
3. Descripción: `Virtual cemetery for pets - Next.js + Mapbox + PostgreSQL`
4. Selecciona: Public
5. NO inicialices con README, .gitignore, o license
6. Click: "Create repository"

**Copiar la URL que GitHub te da** (ejemplo: `https://github.com/tuuser/cementerio-virtual-animales.git`)

---

### PASO 2: Ejecutar comando de configuración inicial

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
# Reemplaza con TUS datos
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

Ejemplo:
```powershell
git config --global user.name "Juan Pérez"
git config --global user.email "juan.perez@example.com"
```

---

### PASO 3: Ejecutar ESTOS comandos EN ORDEN

```powershell
# 1. Inicializar repositorio
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer commit inicial
git commit -m "Initial commit: Forever Pet Friend v1.0.0 - Production Ready"

# 4. Renombrar rama a main
git branch -M main

# 5. Agregar URL remota (REEMPLAZA con tu URL)
git remote add origin https://github.com/TU_USUARIO/cementerio-virtual-animales.git

# 6. Hacer push a GitHub
git push -u origin main
```

---

## 🎯 RESUMEN RÁPIDO

| Paso | Comando | Descripción |
|------|---------|-------------|
| 1 | `git init` | Inicializa repositorio local |
| 2 | `git add .` | Agrega todos los archivos |
| 3 | `git commit -m "..."` | Crea primer commit |
| 4 | `git branch -M main` | Usa rama main |
| 5 | `git remote add origin [URL]` | Conecta con GitHub |
| 6 | `git push -u origin main` | Sube a GitHub |

---

## ⚠️ PROBLEMAS COMUNES

### "fatal: not a git repository"
**Solución**: Asegúrate de estar en la carpeta del proyecto:
```powershell
cd "C:\Users\Anon\Desktop\PLUS TECNOLOGIA\proyectoparamascotas\cementerio-virtual-animales"
```

### "error: failed to push some refs"
**Solución**: El repositorio remoto no es vacío o hay conflictos:
```powershell
git push -u origin main --force
```

### "fatal: 'origin' does not appear to be a 'git' repository"
**Solución**: Verifica que agregaste bien el remote:
```powershell
git remote -v
```

### Pide usuario/contraseña
**Solución**: Usa un Personal Access Token en lugar de contraseña:
1. Ve a https://github.com/settings/tokens
2. Click: "Generate new token (classic)"
3. Dale permiso a `repo`
4. Copia el token
5. En PowerShell, usa el token en lugar de contraseña

---

## ✅ VERIFICAR QUE TODO SUBIÓ

Después de hacer push, verifica:

1. Ve a https://github.com/tuuser/cementerio-virtual-animales
2. Deberías ver:
   - ✅ Carpetas: src/, public/, prisma/
   - ✅ Archivos: package.json, tsconfig.json, next.config.js
   - ✅ Documentos: RESUMEN_EJECUTIVO.md, TEST_REPORT_COMPLETO.md, etc.
   - ✅ .gitignore presente
   - ✅ NO debería haber .env.local

---

## 🎉 ¡LISTO!

Una vez verificado en GitHub, tu repositorio está listo para:
- ✅ Compartir con otros developers
- ✅ Configurar CI/CD (GitHub Actions)
- ✅ Colaboración en equipo
- ✅ Desplegar a producción

---

**Próximos pasos opcionales**:
1. Agregar descripción al repositorio
2. Agregar tópicos (topics): react, nextjs, typescript, mapbox
3. Activar GitHub Pages (si quieres)
4. Configurar ramas protegidas
5. Agregar GitHub Actions (CI/CD)
