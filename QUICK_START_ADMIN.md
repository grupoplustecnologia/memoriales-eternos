## 🛡️ Panel de Administración

### Acceso Rápido

**Credenciales Demo:**
```
Email:       demo@memorias-eternas.local
Contraseña:  Demo123!
```

**URL:** `http://localhost:3000/admin`

### Cómo Acceder

1. **Opción 1 - Desde la Navbar:**
   - Haz clic en tu avatar/nombre en la navbar
   - Selecciona "🛡️ Panel Admin" del dropdown

2. **Opción 2 - URL Directa:**
   - Ve a `http://localhost:3000/admin`

3. **Opción 3 - Después de Login:**
   - Inicia sesión con las credenciales demo
   - El enlace al panel aparecerá en el dropdown

### Características

✅ **Dashboard de Estadísticas**
- Total de usuarios
- Usuarios activos
- Premium/Pro
- Suspendidos

✅ **Búsqueda y Filtros**
- Buscar por email o nombre
- Filtrar por rol (Admin, Pro, Premium, Moderador, Básico)

✅ **Gestión de Usuarios**
- Ver información completa de cada usuario
- Editar rol (cambiar de admin, pro, premium, etc.)
- Suspender/Activar usuarios
- Eliminar usuarios

✅ **Visualización Profesional**
- Tabla responsive
- Badges de color por rol
- Indicadores de estado
- Modal de edición de rol

### Usuarios Demo Disponibles

| Email | Nombre | Rol |
|-------|--------|-----|
| demo@memorias-eternas.local | Demo Admin | Admin |
| user@example.com | Usuario Premium | Premium |
| basic@example.com | Usuario Básico | Básico |
| moderator@example.com | Moderador | Moderador |
| pro@example.com | Usuario Pro | Pro |

### Funciones Principales

1. **Editar Rol**: Cambiar el rol de un usuario a cualquier nivel
2. **Suspender**: Desactivar acceso de un usuario
3. **Activar**: Reactivar un usuario suspendido
4. **Eliminar**: Remover usuario del sistema
5. **Filtrar**: Buscar usuarios específicos rápidamente

### Próximas Implementaciones

- [ ] Integración con Supabase para persistencia
- [ ] Audit logs detallados
- [ ] Gráficas de estadísticas
- [ ] Exportar reportes
- [ ] Gestión de suscripciones
- [ ] Notificaciones de eventos

### Referencia de Roles

**Admin** - Acceso completo al sistema
- 12 permisos

**Pro** - Usuario Premium Plus
- 8 permisos (editar/eliminar cualquier memorial)

**Premium** - Usuario con suscripción mensual/anual
- 6 permisos (invitar colaboradores)

**Moderador** - Moderación de contenido
- 3 permisos (moderar, gestionar tributos)

**Básico** - Usuario gratuito
- 3 permisos (crear, editar propios, eliminar propios)
