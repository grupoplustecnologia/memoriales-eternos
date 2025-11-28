# 🛡️ Panel de Admin - Memorias Eternas

## Descripción
El Panel de Admin es una interfaz completa para gestionar usuarios, roles, permisos y estado de la plataforma. Permite a los administradores:

- Ver estadísticas globales de usuarios
- Buscar y filtrar usuarios
- Cambiar roles y permisos de usuarios
- Suspender o activar usuarios
- Eliminar usuarios (excepto el admin actual)
- Monitorear suscripciones y estados

## 📋 Credenciales Demo

```
Email:       demo@memorias-eternas.local
Contraseña:  Demo123!
Rol:         Admin (acceso completo)
```

### Cómo acceder:
1. Ve a `http://localhost:3000/auth/login`
2. Ingresa las credenciales demo
3. Haz clic en "Panel Admin" en el dropdown de usuario
4. O accede directamente a `http://localhost:3000/admin`

## 👥 Usuarios Demo Incluidos

| Email | Nombre | Rol | Suscripción | Estado |
|-------|--------|-----|-------------|--------|
| demo@memorias-eternas.local | Demo Admin | admin | admin | ✅ Activo |
| user@example.com | Usuario Premium | premium | premium-yearly | ✅ Activo |
| basic@example.com | Usuario Básico | basic | free | ✅ Activo |
| moderator@example.com | Moderador | moderator | free | ✅ Activo |
| pro@example.com | Usuario Pro | pro | family | ✅ Activo |

## 🎯 Funcionalidades

### 1. Dashboard Estadístico
Muestra en tiempo real:
- **Total Usuarios**: Cantidad total de usuarios registrados
- **Activos**: Usuarios con estado "active"
- **Premium/Pro**: Usuarios con suscripción de pago
- **Suspendidos**: Usuarios con estado "suspended"

### 2. Búsqueda y Filtros
- **Búsqueda por texto**: Encuentra usuarios por email o nombre
- **Filtro por rol**: Filtra por admin, pro, premium, moderator, o básico
- Búsqueda en tiempo real sin necesidad de presionar un botón

### 3. Gestión de Usuarios

#### Ver Información
- Email
- Nombre
- Rol actual
- Tipo de suscripción
- Estado (activo, inactivo, suspendido)
- ID único

#### Editar Rol
1. Haz clic en "Editar" en el usuario
2. Selecciona el nuevo rol
3. Confirma el cambio
4. El rol se actualiza inmediatamente

**Roles disponibles:**
- **basic** (3 permisos): Crear memorial, editar propios, eliminar propios
- **premium** (6 permisos): Basic + gestionar tributos, invitar colaboradores, analítica
- **pro** (8 permisos): Premium + editar/eliminar cualquier memorial
- **moderator** (3 permisos): Moderar contenido, gestionar tributos, analítica
- **admin** (12 permisos): Acceso completo

#### Suspender/Activar
- Haz clic en "Suspender" para desactivar un usuario
- El usuario no podrá acceder a su cuenta
- Haz clic en "Activar" para reactivar

#### Eliminar
- Haz clic en "Eliminar" para remover usuario permanentemente
- No puedes eliminar tu propia cuenta
- Se pedirá confirmación

### 4. Indicadores Visuales

**Badges de Rol:**
- 🔴 Admin: Rojo
- 🟣 Pro: Púrpura
- 🔵 Premium: Azul
- 🟡 Moderador: Amarillo
- ⚪ Básico: Gris

**Badges de Estado:**
- ✅ Activo: Verde
- ⏸️ Inactivo: Gris
- 🚫 Suspendido: Rojo

## 🔐 Seguridad

### Restricciones Actuales
- Solo usuarios autenticados pueden acceder a `/admin`
- Para producción, implementar verificación de rol real

### Mejoras Futuras Recomendadas
1. Verificación de rol en backend
2. Audit logging de cambios
3. Autenticación de dos factores (2FA)
4. Rate limiting en operaciones sensibles
5. Encriptación de datos sensibles

## 📊 Estadísticas y Monitoreo

### Métricas Disponibles
- Total de usuarios
- Usuarios activos
- Usuarios premium/pro (pagos)
- Usuarios suspendidos
- Distribución por rol
- Distribución por suscripción

## 🚀 Próximas Mejoras

- [ ] Gráficas de tendencias de usuarios
- [ ] Exportar reportes (CSV/PDF)
- [ ] Actividad por usuario (logs)
- [ ] Gestión de suscripciones
- [ ] Notificaciones de eventos importantes
- [ ] Auditoría completa de cambios
- [ ] Control de permisos granular

## 📝 Notas de Desarrollo

### Datos Mock
Actualmente el sistema usa datos mock (en memoria). Cuando integres Supabase:

1. Actualizar `loadUsers()` en `/admin/page.tsx`:
```typescript
const { data } = await supabase
  .from('users')
  .select('*')
  .order('created_at', { ascending: false });
```

2. Actualizar `handleUpdateRole()` para Supabase:
```typescript
await supabase
  .from('users')
  .update({ role: newRole })
  .eq('id', targetUser.id);
```

3. Usar Supabase RLS para seguridad:
```sql
CREATE POLICY "Admins can manage users" 
ON users FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');
```

### Estructura de Archivos
```
src/
├── app/
│   └── admin/
│       └── page.tsx          # Panel Admin (este archivo)
├── components/
│   └── NavbarClient.tsx      # Enlace agregado al dropdown
├── types/
│   └── roles.ts              # Tipos de roles y permisos
└── lib/
    └── authorization.ts      # Lógica de autorización
```

## 🔗 Enlaces Relacionados

- **Creación de Rol y Permisos**: `ROLES_PERMISOS.md`
- **Autenticación Local**: `src/lib/auth.ts`
- **Auth Context**: `src/contexts/AuthContext.tsx`
- **Tipos de Roles**: `src/types/roles.ts`

## 📞 Soporte

Para preguntas o problemas con el panel admin:
1. Verifica que estés logueado como admin
2. Revisa la consola del navegador (F12 → Console)
3. Asegúrate de que las rutas estén accesibles en `http://localhost:3000/admin`
