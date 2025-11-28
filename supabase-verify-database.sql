-- ========================================
-- SCRIPT DE VERIFICACIÓN DE BASE DE DATOS
-- Ejecuta estas consultas para ver qué hay en tu DB
-- ========================================

-- 1. VER CUÁNTOS PERFILES HAY EN TOTAL
SELECT COUNT(*) as total_perfiles FROM animal_profiles;

-- 2. VER PERFILES POR TIPO DE ANIMAL
SELECT
  animal_type as tipo,
  COUNT(*) as cantidad
FROM animal_profiles
GROUP BY animal_type
ORDER BY cantidad DESC;

-- 3. VER LOS 10 PERFILES MÁS RECIENTES
SELECT
  name as nombre,
  animal_type as tipo,
  breed as raza,
  TO_CHAR(death_date, 'DD/MM/YYYY') as fallecimiento,
  TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI') as creado
FROM animal_profiles
ORDER BY created_at DESC
LIMIT 10;

-- 4. VER TODOS LOS PERFILES CON SU UBICACIÓN
SELECT
  name as nombre,
  animal_type as tipo,
  latitude as lat,
  longitude as lng,
  epitaph as epitafio
FROM animal_profiles
ORDER BY name;

-- 5. BUSCAR PERFILES POR NOMBRE (ejemplo: buscar "Max")
SELECT
  name,
  animal_type,
  breed,
  epitaph
FROM animal_profiles
WHERE LOWER(name) LIKE LOWER('%Max%');

-- 6. BUSCAR POR TIPO ESPECÍFICO (ejemplo: solo gatos)
SELECT
  name,
  breed,
  epitaph
FROM animal_profiles
WHERE animal_type = 'gato'
ORDER BY name;

-- 7. BUSCAR EN LA HISTORIA (ejemplo: buscar "amor")
SELECT
  name,
  animal_type,
  story
FROM animal_profiles
WHERE LOWER(story) LIKE LOWER('%amor%');

-- 8. PROBAR LA BÚSQUEDA DE TEXTO COMPLETO
-- Buscar perfiles que contengan "alegre" o "cariñoso"
SELECT
  name,
  animal_type,
  ts_rank(
    to_tsvector('spanish', name || ' ' || COALESCE(breed, '') || ' ' || story),
    plainto_tsquery('spanish', 'alegre cariñoso')
  ) as relevancia,
  epitaph
FROM animal_profiles
WHERE to_tsvector('spanish', name || ' ' || COALESCE(breed, '') || ' ' || story)
  @@ plainto_tsquery('spanish', 'alegre cariñoso')
ORDER BY relevancia DESC;

-- 9. VER TRIBUTOS Y SUS PERFILES
SELECT
  ap.name as memorial,
  t.visitor_name as visitante,
  t.tribute_type as tipo_tributo,
  t.message as mensaje,
  TO_CHAR(t.created_at, 'DD/MM/YYYY') as fecha
FROM tributes t
JOIN animal_profiles ap ON t.profile_id = ap.id
ORDER BY t.created_at DESC;

-- 10. CONTAR TRIBUTOS POR PERFIL
SELECT
  ap.name as memorial,
  COUNT(t.id) as total_tributos
FROM animal_profiles ap
LEFT JOIN tributes t ON ap.id = t.profile_id
GROUP BY ap.name
ORDER BY total_tributos DESC;

-- 11. BUSCAR PERFILES CERCA DE UNA UBICACIÓN
-- Ejemplo: Perfiles a menos de 100km de Madrid (40.4168, -3.7038)
SELECT
  name,
  animal_type,
  latitude,
  longitude,
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
  100000  -- 100km en metros
)
ORDER BY distancia_km;

-- 12. VER TODOS LOS USUARIOS
SELECT
  name,
  email,
  subscription_tier,
  subscription_status,
  TO_CHAR(created_at, 'DD/MM/YYYY') as fecha_registro
FROM users;

-- 13. ESTADÍSTICAS GENERALES
SELECT
  (SELECT COUNT(*) FROM users) as total_usuarios,
  (SELECT COUNT(*) FROM animal_profiles) as total_perfiles,
  (SELECT COUNT(*) FROM tributes) as total_tributos,
  (SELECT COUNT(*) FROM animal_profiles WHERE animal_type = 'perro') as perros,
  (SELECT COUNT(*) FROM animal_profiles WHERE animal_type = 'gato') as gatos,
  (SELECT COUNT(*) FROM animal_profiles WHERE animal_type = 'ave') as aves;

-- 14. LIMPIAR TODOS LOS DATOS (¡USAR CON CUIDADO!)
-- Descomenta solo si quieres borrar todo y empezar de nuevo
/*
DELETE FROM tributes;
DELETE FROM animal_profiles;
DELETE FROM users;
*/

-- ========================================
-- CONSULTAS PARA DEBUGGING
-- ========================================

-- Ver el esquema de la tabla animal_profiles
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'animal_profiles'
ORDER BY ordinal_position;

-- Ver políticas RLS activas
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename IN ('animal_profiles', 'tributes', 'users');
