# 🗄️ Configuración de Supabase para Memorias Eternas

Este documento te guiará a través del proceso de configuración de Supabase para el Cementerio Virtual de Animales.

## 📋 Prerrequisitos

- Una cuenta en [Supabase](https://supabase.com) (gratis)
- Node.js y Bun instalados

## 🚀 Pasos de Configuración

### 1. Crear un Proyecto en Supabase

1. Ve a [https://app.supabase.com](https://app.supabase.com)
2. Haz clic en "New Project"
3. Completa los detalles:
   - **Name**: Memorias Eternas (o el nombre que prefieras)
   - **Database Password**: Elige una contraseña segura (guárdala)
   - **Region**: Selecciona la región más cercana a tu ubicación
   - **Pricing Plan**: Free (para empezar)
4. Haz clic en "Create new project"

### 2. Ejecutar el Script SQL

1. En tu proyecto de Supabase, ve a la pestaña **SQL Editor** en el menú lateral
2. Haz clic en "New Query"
3. Copia todo el contenido del archivo `supabase-schema.sql`
4. Pégalo en el editor SQL
5. Haz clic en "Run" para ejecutar el script
6. Deberías ver un mensaje de éxito

Este script creará:
- ✅ 3 tablas: `users`, `animal_profiles`, `tributes`
- ✅ Extensión PostGIS para datos geoespaciales
- ✅ Índices para búsqueda rápida
- ✅ Políticas de seguridad (Row Level Security)
- ✅ Funciones para búsqueda y consultas geoespaciales

### 3. Configurar Variables de Entorno

1. En tu proyecto de Supabase, ve a **Settings** > **API**
2. Copia los siguientes valores:
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (clave pública para el cliente)

3. En tu proyecto local, crea un archivo `.env.local`:

```bash
cp .env.example .env.local
```

4. Edita `.env.local` y reemplaza con tus valores:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-aquí
```

### 4. (Opcional) Cargar Datos de Ejemplo

Si quieres poblar la base de datos con los perfiles de ejemplo:

1. Ve al **SQL Editor** en Supabase
2. Crea una nueva consulta
3. Ejecuta este script para crear un usuario de ejemplo:

```sql
-- Crear usuario de ejemplo
INSERT INTO users (id, email, name, subscription_tier)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'demo@memoriasneternas.com',
  'Usuario Demo',
  'premium-yearly'
);
```

4. Luego puedes insertar los perfiles manualmente o modificar el archivo `mockData.ts` para usar los hooks de Supabase

### 5. Verificar la Configuración

1. Reinicia tu servidor de desarrollo:
```bash
bun run dev
```

2. La aplicación ahora debería:
   - ✅ Conectarse a Supabase
   - ✅ Mostrar perfiles desde la base de datos (si los cargaste)
   - ✅ Permitir crear nuevos perfiles (necesitarás autenticación primero)

## 🔐 Configurar Autenticación (Opcional pero Recomendado)

Para permitir que los usuarios creen cuentas:

1. En Supabase, ve a **Authentication** > **Providers**
2. Habilita los métodos de autenticación que desees:
   - ✅ Email (recomendado)
   - ✅ Google OAuth
   - ✅ Facebook OAuth
   - Etc.

3. Para email, configura las plantillas de correo en **Authentication** > **Email Templates**

## 📊 Estructura de la Base de Datos

### Tabla: `users`
- Almacena información de usuarios
- Campos: id, email, name, subscription_tier, subscription_status

### Tabla: `animal_profiles`
- Almacena los perfiles de mascotas
- Campos: id, user_id, name, animal_type, breed, fechas, ubicación, foto, historia, epitafio
- Incluye campo `location` (GEOGRAPHY) para búsquedas geoespaciales

### Tabla: `tributes`
- Almacena tributos dejados en los perfiles
- Campos: id, profile_id, visitor_name, tribute_type, message

## 🔍 Funciones Personalizadas

### `search_profiles(search_query TEXT)`
Busca perfiles usando búsqueda de texto completo en español.

### `get_nearby_profiles(lat, lng, radius_km)`
Encuentra perfiles dentro de un radio específico de una ubicación.

## 🛡️ Seguridad (RLS)

Las políticas de Row Level Security están configuradas para:
- ✅ Todos pueden ver perfiles y tributos (público)
- ✅ Solo usuarios autenticados pueden crear perfiles
- ✅ Los usuarios solo pueden editar/eliminar sus propios perfiles
- ✅ Cualquiera puede dejar tributos
- ✅ Los dueños de perfiles pueden eliminar tributos

## 📚 Uso en el Código

### Ejemplo: Obtener todos los perfiles

```typescript
import { useProfiles } from '@/hooks/useProfiles';

function MyComponent() {
  const { profiles, loading, error } = useProfiles();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {profiles.map(profile => (
        <div key={profile.id}>{profile.name}</div>
      ))}
    </div>
  );
}
```

### Ejemplo: Crear un perfil

```typescript
const { createProfile } = useProfiles();

async function handleSubmit(data) {
  const result = await createProfile({
    userId: 'user-id-here',
    name: data.name,
    animalType: 'perro',
    // ... resto de campos
  });

  if (result.success) {
    console.log('Perfil creado!');
  } else {
    console.error('Error:', result.error);
  }
}
```

## 🆘 Solución de Problemas

### Error: "relation does not exist"
- Verifica que ejecutaste el script SQL completo
- Revisa que las tablas se crearon en el esquema `public`

### Error: "Invalid API key"
- Verifica que copiaste correctamente las claves de Supabase
- Asegúrate de usar la clave **Anon/Public**, no la Service Key

### Los perfiles no aparecen
- Verifica que las políticas RLS permiten lectura pública
- Comprueba que hay datos en la tabla `animal_profiles`

### Error de CORS
- Supabase debería manejar CORS automáticamente
- Si tienes problemas, verifica la configuración en **Settings** > **API**

## 📞 Soporte

Si tienes problemas:
1. Revisa la [documentación de Supabase](https://supabase.com/docs)
2. Verifica los logs en **Logs** > **Postgres Logs** en Supabase
3. Revisa la consola del navegador para errores

## 🎉 ¡Listo!

Tu base de datos está configurada y lista para usar. Ahora puedes:
- ✅ Almacenar perfiles permanentemente
- ✅ Buscar con texto completo
- ✅ Consultas geoespaciales
- ✅ Tributos en tiempo real
- ✅ Seguridad incorporada con RLS
