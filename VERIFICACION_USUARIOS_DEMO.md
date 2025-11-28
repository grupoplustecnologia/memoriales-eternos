# Verificación de Usuarios Demo

Ejecuta este script para validar que los 3 usuarios demo están correctamente configurados:

```bash
# En la consola del navegador (F12):

// Verificar usuarios en localStorage
console.log('=== VERIFICACIÓN DE USUARIOS DEMO ===\n');

// Simular verificación de auth
const mockAuth = {
  'huella@memorias-eternas.local': {
    id: 'demo-user-001',
    name: 'Huella Eterna',
    plan: 'huella-eterna',
    stars: 4,
    memoriales: ['demo-profile-001', 'demo-profile-002', 'demo-profile-003']
  },
  'cielo@memorias-eternas.local': {
    id: 'demo-user-002',
    name: 'Cielo de Estrellas',
    plan: 'cielo-estrellas',
    stars: 10,
    memoriales: ['demo-profile-004', 'demo-profile-005', 'demo-profile-006']
  },
  'santuario@memorias-eternas.local': {
    id: 'demo-user-003',
    name: 'Santuario Premium',
    plan: 'santuario-premium',
    stars: 30,
    memoriales: ['demo-profile-007', 'demo-profile-008', 'demo-profile-009']
  }
};

// Mostrar información
Object.entries(mockAuth).forEach(([email, user]) => {
  console.log(`✅ ${user.name}`);
  console.log(`   Email: ${email}`);
  console.log(`   Plan: ${user.plan}`);
  console.log(`   Estrellas: ${user.stars}⭐`);
  console.log(`   Memoriales: ${user.memoriales.length}`);
  console.log('');
});

console.log('=== CREDENCIALES DE ACCESO ===\n');
console.log('1. Huella Eterna (Gratuito)');
console.log('   Email: huella@memorias-eternas.local');
console.log('   Password: Demo123!\n');

console.log('2. Cielo de Estrellas (Premium)');
console.log('   Email: cielo@memorias-eternas.local');
console.log('   Password: Demo123!\n');

console.log('3. Santuario Premium (Premium+)');
console.log('   Email: santuario@memorias-eternas.local');
console.log('   Password: Demo123!\n');
```

## Checklist de Verificación

Después de iniciar la app, verifica lo siguiente:

### ✅ Autenticación
- [ ] Puedo iniciar sesión con huella@memorias-eternas.local
- [ ] Puedo iniciar sesión con cielo@memorias-eternas.local
- [ ] Puedo iniciar sesión con santuario@memorias-eternas.local
- [ ] Las credenciales son Demo123! para todos

### ✅ Huella Eterna (Gratuito)
- [ ] Tiene 4 estrellas
- [ ] Tiene 3 memoriales en el mapa
- [ ] No puede acceder a momentos especiales
- [ ] No puede ver dashboard de estadísticas
- [ ] Recibe 0 misiones de ejemplo

### ✅ Cielo de Estrellas (Premium)
- [ ] Tiene 10 estrellas
- [ ] Tiene 3 memoriales en el mapa
- [ ] Puede crear tributos ilimitados
- [ ] Puede ver 3 momentos especiales
- [ ] Recibe 2 misiones completadas de ejemplo

### ✅ Santuario Premium (Premium+)
- [ ] Tiene 30 estrellas
- [ ] Tiene 3 memoriales en el mapa
- [ ] Puede ver dashboard con estadísticas
- [ ] Puede crear tributos ilimitados
- [ ] Puede acceder a todos los 6 momentos especiales
- [ ] Tiene 5 de 6 misiones completadas

### ✅ Interacción Entre Usuarios
- [ ] Veo los 9 memoriales en el mapa (3 por usuario)
- [ ] Puedo dejar tributos en perfiles de otros usuarios
- [ ] Mis estrellas se descuentan cuando dejo tributo
- [ ] El otro usuario recibe el tributo

### ✅ Planes
- [ ] Puedo ver página /plans
- [ ] Los 3 planes se muestran correctamente
- [ ] Toggle pago único / suscripción funciona
- [ ] Tabla comparativa muestra diferencias

### ✅ Tienda de Estrellas
- [ ] Puedo ver 3 paquetes de estrellas
- [ ] Los precios son 1€, 2€, 5€
- [ ] Los descuentos se muestran: 0%, 17%, 34%

## Notas

- Si los datos no cargan, limpia localStorage: 
  ```
  localStorage.clear()
  ```
  
- Recarga la página para reinicializar

- Los usuarios se cargan automáticamente en `/src/lib/auth.ts`

- Los memoriales se cargan desde `/src/data/mockData.ts`

- Los tributos de ejemplo se cargan en `/src/data/mockData.ts`
