# 📊 Instrucciones para Cargar y Verificar Datos en Supabase

## 🎯 Paso 1: Cargar los 20 Perfiles de Ejemplo

### A. Abrir Supabase SQL Editor

1. Ve a [https://app.supabase.com](https://app.supabase.com)
2. Selecciona tu proyecto
3. En el menú lateral izquierdo, haz clic en **SQL Editor** 📝

### B. Ejecutar el Script de Inserción

1. Haz clic en **"New Query"** (Nueva consulta)
2. Abre el archivo **`supabase-insert-demo-data.sql`** (en la raíz del proyecto)
3. **Copia TODO el contenido** del archivo
4. **Pega** en el editor SQL de Supabase
5. Haz clic en **"Run"** o presiona **Ctrl + Enter** (Cmd + Enter en Mac)

### C. ¿Qué verás?

Si todo sale bien, verás:

✅ **Éxito**: Mensaje que dice "Success. No rows returned"
✅ En la parte inferior verás 3 tablas de resultados:
   - **Tabla 1**: Conteo por tipo de animal
   - **Tabla 2**: Los 5 perfiles más recientes
   - **Tabla 3**: Total de tributos

**Ejemplo de resultado:**
```
animal_type | total
------------|------
perro       |   8
gato        |   7
ave         |   3
roedor      |   2
reptil      |   1
```

## 🔍 Paso 2: Verificar que los Datos se Cargaron

### Opción A: En Supabase (Interfaz Visual)

1. Ve a **"Table Editor"** en el menú lateral
2. Selecciona la tabla **`animal_profiles`**
3. Deberías ver **20 filas** con todos los perfiles

### Opción B: Con SQL (Más Detallado)

1. En **SQL Editor**, crea una **Nueva consulta**
2. Abre el archivo **`supabase-verify-database.sql`**
3. Copia y pega las consultas que quieras ejecutar
4. Presiona **Run**

**Consultas útiles para verificar:**

```sql
-- Ver cuántos perfiles hay
SELECT COUNT(*) as total_perfiles FROM animal_profiles;
```

Debería devolver: **20**

```sql
-- Ver todos los nombres
SELECT name, animal_type, breed FROM animal_profiles ORDER BY name;
```

Deberías ver: Max, Luna, Rocky, Coco, Bella, Charlie, etc.

## 🧪 Paso 3: Probar la Búsqueda

### A. Buscar por Nombre

```sql
-- Buscar "Max"
SELECT name, animal_type, breed, epitaph
FROM animal_profiles
WHERE LOWER(name) LIKE LOWER('%Max%');
```

**Resultado esperado**: 1 fila con Max (Golden Retriever)

### B. Buscar en la Historia

```sql
-- Buscar la palabra "alegre"
SELECT name, animal_type, story
FROM animal_profiles
WHERE LOWER(story) LIKE LOWER('%alegre%');
```

**Resultado esperado**: Varios perfiles que mencionen "alegre" en su historia

### C. Buscar con Texto Completo (Avanzado)

```sql
-- Buscar perfiles relacionados con "amor" y "familia"
SELECT
  name,
  animal_type,
  ts_rank(
    to_tsvector('spanish', name || ' ' || COALESCE(breed, '') || ' ' || story),
    plainto_tsquery('spanish', 'amor familia')
  ) as relevancia
FROM animal_profiles
WHERE to_tsvector('spanish', name || ' ' || COALESCE(breed, '') || ' ' || story)
  @@ plainto_tsquery('spanish', 'amor familia')
ORDER BY relevancia DESC;
```

**Resultado esperado**: Perfiles ordenados por relevancia

## 🌍 Paso 4: Probar Búsqueda Geoespacial

### Buscar perfiles cerca de Madrid

```sql
SELECT
  name,
  animal_type,
  ROUND(
    ST_Distance(
      location,
      ST_SetSRID(ST_MakePoint(-3.7038, 40.4168), 4326)::geography
    ) / 1000
  ) as distancia_km
FROM animal_profiles
WHERE ST_DWithin(
  location,
  ST_SetSRID(ST_MakePoint(-3.7038, 40.4168), 4326)::geography,
  500000  -- 500km
)
ORDER BY distancia_km;
```

**Resultado esperado**: Max (0 km), Luna (~500 km), etc.

## 🎨 Paso 5: Ver los Datos en la Aplicación

1. Asegúrate de que tu servidor esté corriendo:
```bash
bun run dev
```

2. Abre [http://localhost:3001](http://localhost:3001)

3. Ve a **"Explorar Mapa"**

4. **¡Deberías ver los 20 marcadores en el mapa mundial! 🎉**

### Probar la Búsqueda en la App:

1. En la página del mapa, escribe en el buscador:
   - "Max" → Debería encontrar 1 resultado
   - "Golden" → Debería encontrar 1 resultado
   - "alegre" → Debería encontrar varios resultados

2. Usa los filtros de tipo de animal:
   - Haz clic en "🐕 Perros" → Debería mostrar 8 marcadores
   - Haz clic en "🐈 Gatos" → Debería mostrar 7 marcadores

## 📊 Estadísticas que Deberías Ver

```sql
SELECT
  (SELECT COUNT(*) FROM users) as usuarios,
  (SELECT COUNT(*) FROM animal_profiles) as perfiles,
  (SELECT COUNT(*) FROM tributes) as tributos;
```

**Resultado esperado:**
```
usuarios | perfiles | tributos
---------|----------|----------
   1     |    20    |    6
```

## 🚨 Solución de Problemas

### ❌ Error: "permission denied for table animal_profiles"

**Solución**: Las políticas RLS no permiten la inserción anónima.

**Opción 1** - Deshabilitar RLS temporalmente:
```sql
ALTER TABLE animal_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
-- Ejecuta el script de inserción
-- Luego vuelve a habilitar:
ALTER TABLE animal_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

**Opción 2** - Ejecutar en el SQL Editor (recomendado):
El SQL Editor se ejecuta con privilegios de administrador.

### ❌ Error: "duplicate key value violates unique constraint"

**Solución**: Los datos ya existen. Puedes:

**Opción 1** - Borrar todo y reinsertar:
```sql
DELETE FROM tributes;
DELETE FROM animal_profiles;
DELETE FROM users;
-- Ahora ejecuta el script de inserción nuevamente
```

**Opción 2** - El script usa `ON CONFLICT DO NOTHING`, así que es seguro ejecutarlo múltiples veces.

### ❌ Los marcadores no aparecen en el mapa

**Verificar**:

1. ¿Los datos están en la base de datos?
```sql
SELECT COUNT(*) FROM animal_profiles;
```

2. ¿Las variables de entorno están configuradas?
   - Revisa `.env.local`
   - Reinicia el servidor (`bun run dev`)

3. Abre la consola del navegador (F12):
   - ¿Hay errores de red?
   - ¿Hay errores de Supabase?

## ✅ Verificación Final

Ejecuta esta consulta para un resumen completo:

```sql
SELECT
  'Total Usuarios' as metrica,
  COUNT(*)::text as valor
FROM users

UNION ALL

SELECT
  'Total Perfiles',
  COUNT(*)::text
FROM animal_profiles

UNION ALL

SELECT
  'Total Tributos',
  COUNT(*)::text
FROM tributes

UNION ALL

SELECT
  'Perros',
  COUNT(*)::text
FROM animal_profiles
WHERE animal_type = 'perro'

UNION ALL

SELECT
  'Gatos',
  COUNT(*)::text
FROM animal_profiles
WHERE animal_type = 'gato'

UNION ALL

SELECT
  'Aves',
  COUNT(*)::text
FROM animal_profiles
WHERE animal_type = 'ave';
```

**Si todo está correcto deberías ver:**
```
metrica          | valor
-----------------|-------
Total Usuarios   | 1
Total Perfiles   | 20
Total Tributos   | 6
Perros          | 8
Gatos           | 7
Aves            | 3
```

## 🎉 ¡Éxito!

Si ves los 20 perfiles en el mapa y la búsqueda funciona, **¡has configurado Supabase correctamente!** 🎊

### Próximos pasos sugeridos:

1. **Crear tu primer perfil real** desde la app (`/create`)
2. **Explorar las funciones SQL** avanzadas
3. **Configurar autenticación** para usuarios reales
4. **Integrar Stripe** para suscripciones

---

**¿Necesitas ayuda?** Revisa:
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Guía completa
- [README.md](./README.md) - Documentación del proyecto
- Console del navegador - Errores en tiempo real
