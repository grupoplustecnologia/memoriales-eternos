# 👥 Usuarios Demo - Memorias Eternas

## 🚀 Instrucciones de Prueba

Los 3 usuarios demo están pre-cargados en el sistema. Cada uno tiene:
- ✅ Plan diferente
- ✅ Estrellas iniciales
- ✅ 3 memoriales de ejemplo
- ✅ Tributos cruzados entre usuarios
- ✅ Misiones completadas (según el plan)

---

## 👤 Usuario 1: Huella Eterna (Plan Gratuito)

```
Email:    huella@memorias-eternas.local
Password: Demo123!
Plan:     Huella Eterna (Gratuito)
Estrellas: 4 ⭐
```

### Memoriales:
1. **Lucas** - Labrador Retriever
   - Nacido: 2015-05-20 | Fallecido: 2023-10-15
   - Ubicación: Madrid, España
   - Historia: Compañero de aventuras durante 8 años

2. **Miau** - Gato Doméstico
   - Nacido: 2014-03-10 | Fallecido: 2024-01-08
   - Ubicación: Madrid, España
   - Historia: Gato que llegó como perdido hace 10 años

3. **Birdy** - Canario
   - Nacido: 2018-06-12 | Fallecido: 2023-09-30
   - Ubicación: Madrid, España
   - Historia: Cantaba cada mañana

### Funcionalidades Disponibles:
- ✅ Ver perfiles de otros usuarios
- ✅ Dejar tributos (flores, velas)
- ✅ Ver misiones (Sin acceso a momentos especiales)
- ✅ Comprar estrellas en tienda
- ❌ Acceso a Dashboard de estadísticas
- ❌ Momentos especiales

### Tributos Recibidos:
- Lucas: 2 tributos (flor, vela)
- Miau: 1 tributo (flor)

---

## ⭐ Usuario 2: Cielo de Estrellas (Plan Premium)

```
Email:    cielo@memorias-eternas.local
Password: Demo123!
Plan:     Cielo de Estrellas
Estrellas: 10 ⭐
```

### Memoriales:
1. **Rey** - Pastor Alemán
   - Nacido: 2012-09-14 | Fallecido: 2023-12-20
   - Ubicación: Londres, Reino Unido
   - Historia: Guardaespaldas y amigo fiel durante 11 años

2. **Princesa** - Gato Persa Blanco
   - Nacido: 2013-11-05 | Fallecido: 2024-02-14
   - Ubicación: Londres, Reino Unido
   - Historia: Elegancia pura, 11 años juntos

3. **Loro** - Loro Africano Gris
   - Nacido: 2008-04-20 | Fallecido: 2023-11-10
   - Ubicación: Londres, Reino Unido
   - Historia: Profesor de idiomas, 15 años

### Funcionalidades Disponibles:
- ✅ Ver perfiles de otros usuarios
- ✅ Dejar tributos ilimitados
- ✅ Ver misiones
- ✅ Comprar estrellas
- ✅ Acceso a 3 momentos especiales (Primer Día, Último Adiós, Su Historia)
- ❌ Dashboard de estadísticas (solo Santuario Premium)
- ❌ 3 momentos especiales adicionales

### Misiones Completadas:
- ✅ Vigilia Especial
- ✅ Comparte el Recuerdo

### Tributos Recibidos:
- Rey: 2 tributos
- Princesa: 1 tributo
- Loro: 1 tributo

---

## 👑 Usuario 3: Santuario Premium (Plan Premium+)

```
Email:    santuario@memorias-eternas.local
Password: Demo123!
Plan:     Santuario Premium
Estrellas: 30 ⭐
```

### Memoriales:
1. **Simba** - Husky Siberiano
   - Nacido: 2010-08-22 | Fallecido: 2023-08-05
   - Ubicación: San Francisco, USA
   - Historia: Rey de la familia con ojos azules hipnotizantes, 13 años

2. **Whiskers** - Gato Maine Coon
   - Nacido: 2011-02-14 | Fallecido: 2024-03-01
   - Ubicación: San Francisco, USA
   - Historia: Gigante gentil, 7 kg de amor puro, 12 años

3. **Kiwi** - Loro Guacamayo
   - Nacido: 2000-10-05 | Fallecido: 2023-07-20
   - Ubicación: San Francisco, USA
   - Historia: 23 años de sabiduría y compañía

### Funcionalidades Disponibles:
- ✅ Ver perfiles de otros usuarios
- ✅ Dejar tributos ilimitados
- ✅ Ver todas las misiones (6 disponibles)
- ✅ Comprar estrellas
- ✅ Acceso a todos los 6 momentos especiales
- ✅ **Dashboard Premium de Estadísticas**
  - Visitas totales
  - Visitas este mes
  - Tributos por tipo
  - Gráficos interactivos

### Misiones Completadas:
- ✅ Vigilia Especial
- ✅ Comparte el Recuerdo
- ✅ Una Foto Vale
- ✅ Tesoro de Recuerdos
- ✅ Primer Tributo

### Tributos Recibidos:
- Simba: 3 tributos
- Whiskers: 1 tributo
- Kiwi: 2 tributos

---

## 🔄 Flujo de Prueba Recomendado

### Paso 1: Explorar el Mapa Global
1. Inicia sesión con **Huella Eterna**
2. Dirígete a `/map` para ver los 9 memoriales distribuidos en el mapa
3. Haz clic en los marcadores para ver detalles

### Paso 2: Interactuar con Otros Perfiles
1. Mientras estés logueado como **Huella Eterna**
2. Haz clic en un memorial de **Cielo de Estrellas** o **Santuario Premium**
3. Lee su historia
4. Deja un tributo (flor o vela) usando tus estrellas
5. Verifica que se restaen de tu saldo

### Paso 3: Cambiar de Usuario
1. Cierra sesión (logout)
2. Inicia sesión con **Cielo de Estrellas**
3. Ve a `/user/subscription` para ver tu panel
4. Mira tu saldo de estrellas (10)
5. Verifica los tributos que recibiste

### Paso 4: Probar Dashboard (Santuario Premium)
1. Cierra sesión
2. Inicia sesión con **Santuario Premium**
3. Ve a `/user/subscription`
4. Desplázate hasta "Dashboard de Estadísticas"
5. Verifica:
   - 242 visitas totales
   - 45 visitas este mes
   - 87 tributos recibidos
   - 12 compartimientos

### Paso 5: Explorar Planes
1. Ve a `/plans`
2. Toggle entre "Pago Único" y "Suscripción"
3. Compara características de los 3 planes
4. Verifica la tabla comparativa

### Paso 6: Probar Tienda de Estrellas
1. Ve a `/user/subscription`
2. Desplázate a "Tienda de Estrellas"
3. Mira los 3 paquetes:
   - 20⭐ = €1 (sin descuento)
   - 60⭐ = €2 (17% descuento)
   - 200⭐ = €5 (34% descuento)

### Paso 7: Ver Misiones Emocionales
1. Desde `/user/subscription`, mira la sección "Misiones"
2. Verifica que **Santuario Premium** tiene 5 de 6 completadas
3. Intenta completar la 6ª misión
4. Observa cómo se suman las estrellas

### Paso 8: Momentos Especiales
1. Desde `/user/subscription`, desplázate a "Momentos Especiales"
2. Compara:
   - **Huella Eterna**: 0 momentos (bloqueados)
   - **Cielo de Estrellas**: 3 momentos (primeros 3)
   - **Santuario Premium**: 6 momentos (todos disponibles)

---

## 💡 Qué Probar en Cada Plan

### Huella Eterna (Gratuito)
```
✅ Crear memorial
✅ Subir fotos
✅ Ver map global
✅ Dejar tributos (con estrellas limitadas)
✅ Ver misiones
❌ Momentos especiales (bloqueados)
❌ Dashboard de stats
```

### Cielo de Estrellas
```
✅ Todo lo anterior
✅ Tributos ilimitados
✅ 3 momentos especiales
✅ Más estrellas mensuales (10)
❌ Dashboard de stats
❌ 3 momentos especiales restantes
```

### Santuario Premium
```
✅ TODO desbloqueado
✅ Todos los 6 momentos especiales
✅ Dashboard con estadísticas
✅ 30 estrellas mensuales
✅ Máximas capacidades
```

---

## 🎯 Historias Cruzadas para Probar

**Escenario 1: Huella deja tributo a Rey**
- Huella inicia sesión
- Busca memorial de Rey en el mapa
- Deja un tributo con una estrella
- Verifica que Rey recibe el tributo (en su panel vería "Huella Eterna visitó")

**Escenario 2: Cielo valida a Santuario**
- Cielo inicia sesión
- Ve el memorial de Simba
- Deja múltiples tributos (tiene 10 estrellas)
- Verifica que Santuario Premium recibe los tributos

**Escenario 3: Santuario gasta estrellas**
- Santuario inicia sesión con 30 estrellas
- Deja tributos a los 3 memoriales de Cielo (3 estrellas)
- Deja tributo a uno de Lucas (1 estrella)
- Total gastado: 4 estrellas
- Saldo restante: 26 estrellas

---

## 🔐 Notas Importantes

- **Las estrellas son locales**: Se guardan en localStorage
- **Los tributos son mock**: No persisten en BD
- **Los perfiles están en mockData**: Se cargan del archivo
- **Las misiones se guardan**: En localStorage
- **Los planes son solo UI**: Sin validación real de BD

---

## 🚀 Para Funcionalidad Real (Próximas Fases)

Cuando implementes Supabase:
1. Migra los 3 usuarios a tabla `users`
2. Migra los 9 memoriales a tabla `animal_profiles`
3. Configura tributos en tabla `tributes`
4. Conecta estrellas a tabla de usuario

Los datos demo ya están estructurados correctamente.

---

## 📊 Estadísticas de Prueba

| Métrica | Huella | Cielo | Santuario |
|---------|--------|-------|-----------|
| Memoriales | 3 | 3 | 3 |
| Estrellas | 4 | 10 | 30 |
| Tributos Recibidos | 3 | 4 | 6 |
| Misiones Completadas | 0 | 2 | 5 |
| Momentos Desbloqueados | 0 | 3 | 6 |
| Dashboard | ❌ | ❌ | ✅ |

---

**¡Listos para explorar Memorias Eternas!** 🌟

Cada usuario demo está completamente configurado para mostrar las capacidades de cada plan.
