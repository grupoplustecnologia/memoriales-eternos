-- Script para Cargar Datos de Ejemplo en Supabase
-- Ejecuta este script en: Supabase Dashboard > SQL Editor

-- ========================================
-- PASO 1: Crear usuario de demostración
-- ========================================

INSERT INTO users (id, email, name, subscription_tier, subscription_status)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'demo@memoriasneternas.com',
  'Usuario Demo',
  'premium-yearly',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- ========================================
-- PASO 2: Insertar 20 perfiles de animales
-- ========================================

-- 1. Max - Golden Retriever (Madrid, España)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph, gallery)
VALUES (
  '00000000-0000-0000-0000-000000000101',
  '00000000-0000-0000-0000-000000000001',
  'Max',
  'perro',
  'Golden Retriever',
  '2010-03-15',
  '2023-08-22',
  40.4168,
  -3.7038,
  'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
  'Max fue mi compañero fiel durante 13 años. Siempre alegre, siempre leal. Nos acompañó en cada aventura familiar y dejó huellas imborrables en nuestros corazones.',
  'El mejor amigo que pudimos tener. Te extrañamos cada día.',
  ARRAY['https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400']
) ON CONFLICT (id) DO NOTHING;

-- 2. Luna - Siamés (Barcelona, España)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000102',
  '00000000-0000-0000-0000-000000000001',
  'Luna',
  'gato',
  'Siamés',
  '2015-07-10',
  '2024-01-15',
  41.3851,
  2.1734,
  'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400',
  'Luna llegó a nuestras vidas como una pequeña bola de pelo. Su elegancia y personalidad única iluminaron nuestro hogar. Era independiente pero cariñosa, y siempre sabía cuándo necesitábamos su compañía.',
  'Nuestra pequeña reina, siempre en nuestros corazones.'
) ON CONFLICT (id) DO NOTHING;

-- 3. Rocky - Pastor Alemán (Londres, UK)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000103',
  '00000000-0000-0000-0000-000000000001',
  'Rocky',
  'perro',
  'Pastor Alemán',
  '2012-05-20',
  '2023-11-30',
  51.5074,
  -0.1278,
  'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
  'Rocky fue nuestro protector, nuestro guardián. Valiente y leal hasta el final. Cuidó de nuestra familia con amor incondicional y nos enseñó el verdadero significado de la lealtad.',
  'Un guerrero noble que descansa en paz.'
) ON CONFLICT (id) DO NOTHING;

-- 4. Coco - Loro Amazónico (Buenos Aires, Argentina)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000104',
  '00000000-0000-0000-0000-000000000001',
  'Coco',
  'ave',
  'Loro Amazónico',
  '2005-02-14',
  '2023-10-10',
  -34.6037,
  -58.3816,
  'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
  'Coco nos acompañó durante 18 maravillosos años. Su canto alegre llenaba la casa cada mañana. Era parlanchín, inteligente y un miembro más de la familia.',
  'Tu canto vivirá siempre en nuestros recuerdos.'
) ON CONFLICT (id) DO NOTHING;

-- 5. Bella - Persa (París, Francia)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000105',
  '00000000-0000-0000-0000-000000000001',
  'Bella',
  'gato',
  'Persa',
  '2016-09-05',
  '2024-03-20',
  48.8566,
  2.3522,
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400',
  'Bella era pura elegancia y dulzura. Su pelaje suave y sus ojos azules cautivaban a todos. Nos dio tanto amor y momentos de paz inolvidables.',
  'Descansa en paz, hermosa princesa.'
) ON CONFLICT (id) DO NOTHING;

-- 6. Charlie - Beagle (Nueva York, USA)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000106',
  '00000000-0000-0000-0000-000000000001',
  'Charlie',
  'perro',
  'Beagle',
  '2014-11-12',
  '2023-12-18',
  40.7128,
  -74.0060,
  'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400',
  'Charlie era pura energía y alegría. Amaba correr, jugar y, sobre todo, comer. Su curiosidad infinita nos hacía reír cada día. Fue un regalo en nuestras vidas.',
  'Corre libre, amigo fiel.'
) ON CONFLICT (id) DO NOTHING;

-- 7. Milo - Maine Coon (Tokio, Japón)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000107',
  '00000000-0000-0000-0000-000000000001',
  'Milo',
  'gato',
  'Maine Coon',
  '2013-08-22',
  '2024-02-14',
  35.6762,
  139.6503,
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
  'Milo era un gigante gentil. Su tamaño imponente contrastaba con su naturaleza dulce y tranquila. Le encantaba acurrucarse en el sofá y ronronear suavemente.',
  'Nuestro gigante de corazón tierno.'
) ON CONFLICT (id) DO NOTHING;

-- 8. Toby - Conejo Holandés (Berlín, Alemania)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000108',
  '00000000-0000-0000-0000-000000000001',
  'Toby',
  'roedor',
  'Conejo Holandés',
  '2020-04-10',
  '2024-01-05',
  52.5200,
  13.4050,
  'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400',
  'Toby era un conejo lleno de personalidad. Adoraba saltar por la casa y buscar zanahorias escondidas. Sus orejas largas y su nariz temblorosa nos alegraban cada día.',
  'Pequeño saltarín, siempre en nuestros recuerdos.'
) ON CONFLICT (id) DO NOTHING;

-- 9. Simba - Naranja Doméstico (Sídney, Australia)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000109',
  '00000000-0000-0000-0000-000000000001',
  'Simba',
  'gato',
  'Naranja Doméstico',
  '2014-06-15',
  '2023-09-22',
  -33.8688,
  151.2093,
  'https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400',
  'Simba vivió como un rey. Conquistó cada rincón de nuestro hogar y de nuestros corazones. Su ronroneo era como una melodía que nos acompañaba en las noches.',
  'Rey de nuestro castillo, príncipe de nuestros corazones.'
) ON CONFLICT (id) DO NOTHING;

-- 10. Duke - Labrador Negro (San Francisco, USA)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000110',
  '00000000-0000-0000-0000-000000000001',
  'Duke',
  'perro',
  'Labrador Negro',
  '2011-02-28',
  '2023-07-15',
  37.7749,
  -122.4194,
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
  'Duke era el alma de nuestra familia. Nadaba en el lago, corría por el parque y siempre nos recibía con alegría desbordante. Nos enseñó lo que significa el amor incondicional.',
  'Tu alegría ilumina nuestros días desde el cielo.'
) ON CONFLICT (id) DO NOTHING;

-- 11. Piolin - Canario (Ciudad de México, México)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000111',
  '00000000-0000-0000-0000-000000000001',
  'Piolin',
  'ave',
  'Canario',
  '2018-05-12',
  '2024-03-08',
  19.4326,
  -99.1332,
  'https://images.unsplash.com/photo-1580157730183-80dc8b7a59e5?w=400',
  'Piolin llenó nuestra casa con su hermoso canto cada mañana. Su plumaje amarillo brillante era como un rayo de sol. Pequeño pero con una gran presencia.',
  'Tu canción sigue sonando en nuestros corazones.'
) ON CONFLICT (id) DO NOTHING;

-- 12. Shadow - Negro Doméstico (Moscú, Rusia)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000112',
  '00000000-0000-0000-0000-000000000001',
  'Shadow',
  'gato',
  'Negro Doméstico',
  '2012-10-31',
  '2023-10-15',
  55.7558,
  37.6173,
  'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400',
  'Shadow era misterioso y elegante. Aparecía y desaparecía como su nombre lo indica. A pesar de su apariencia independiente, era extremadamente cariñoso con su familia.',
  'Elegante sombra, ahora luz en nuestros recuerdos.'
) ON CONFLICT (id) DO NOTHING;

-- 13. Rex - Iguana Verde (Miami, USA)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000113',
  '00000000-0000-0000-0000-000000000001',
  'Rex',
  'reptil',
  'Iguana Verde',
  '2015-03-20',
  '2024-01-30',
  25.7617,
  -80.1918,
  'https://images.unsplash.com/photo-1562184552-6bde6370e0c6?w=400',
  'Rex era tranquilo y sabio. Le encantaba tomar el sol en su terrario y observar el mundo con sus ojos antiguos. Nos enseñó a apreciar la calma y la paciencia.',
  'Guardián verde, descansa bajo el sol eterno.'
) ON CONFLICT (id) DO NOTHING;

-- 14. Daisy - Cocker Spaniel (Toronto, Canadá)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000114',
  '00000000-0000-0000-0000-000000000001',
  'Daisy',
  'perro',
  'Cocker Spaniel',
  '2013-07-08',
  '2023-11-12',
  43.6532,
  -79.3832,
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
  'Daisy tenía las orejas más suaves del mundo. Era gentil con los niños y siempre lista para jugar. Su mirada tierna podía derretir cualquier corazón.',
  'Dulce como una margarita, eterna en nuestro jardín de recuerdos.'
) ON CONFLICT (id) DO NOTHING;

-- 15. Kiwi - Periquito (Wellington, Nueva Zelanda)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000115',
  '00000000-0000-0000-0000-000000000001',
  'Kiwi',
  'ave',
  'Periquito',
  '2019-08-05',
  '2024-02-28',
  -41.2865,
  174.7762,
  'https://images.unsplash.com/photo-1614375237532-6a58e2e6e1e2?w=400',
  'Kiwi era curioso y juguetón. Le encantaba explorar y parlotear con todos. Sus colores vibrantes alegaban cualquier día gris.',
  'Vuela alto, pequeño explorador.'
) ON CONFLICT (id) DO NOTHING;

-- 16. Oliver - British Shorthair (Oslo, Noruega)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000116',
  '00000000-0000-0000-0000-000000000001',
  'Oliver',
  'gato',
  'British Shorthair',
  '2014-12-01',
  '2024-03-15',
  59.9139,
  10.7522,
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400',
  'Oliver era el perfecto caballero británico. Educado, refinado y con un aire de dignidad. Pero en el fondo era un gatito juguetón que adoraba las caricias.',
  'Caballero distinguido, amor eterno.'
) ON CONFLICT (id) DO NOTHING;

-- 17. Bruno - Boxer (São Paulo, Brasil)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000117',
  '00000000-0000-0000-0000-000000000001',
  'Bruno',
  'perro',
  'Boxer',
  '2012-09-14',
  '2023-08-05',
  -23.5505,
  -46.6333,
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
  'Bruno era pura energía y alegría. Saltaba, jugaba y nos hacía reír con sus travesuras. Protector incansable de nuestra familia.',
  'Guardián valiente, amigo eterno.'
) ON CONFLICT (id) DO NOTHING;

-- 18. Whiskers - Cobaya (Dublín, Irlanda)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000118',
  '00000000-0000-0000-0000-000000000001',
  'Whiskers',
  'roedor',
  'Cobaya',
  '2021-03-18',
  '2024-02-10',
  53.3498,
  -6.2603,
  'https://images.unsplash.com/photo-1612363148951-07c58e412d1d?w=400',
  'Whiskers era el más adorable de los conejillos. Le encantaban las verduras frescas y hacer ruidos felices. Su pelaje tricolor era único y hermoso.',
  'Pequeño y precioso, grande en nuestros corazones.'
) ON CONFLICT (id) DO NOTHING;

-- 19. Nala - Bengalí (Singapur)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000119',
  '00000000-0000-0000-0000-000000000001',
  'Nala',
  'gato',
  'Bengalí',
  '2016-01-22',
  '2024-01-18',
  1.3521,
  103.8198,
  'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400',
  'Nala era salvaje y hermosa como un leopardo en miniatura. Ágil, inteligente y llena de vida. Nos sorprendía cada día con sus acrobacias.',
  'Reina salvaje de la selva urbana.'
) ON CONFLICT (id) DO NOTHING;

-- 20. Zeus - Gran Danés (Atenas, Grecia)
INSERT INTO animal_profiles (id, user_id, name, animal_type, breed, birth_date, death_date, latitude, longitude, photo_url, story, epitaph)
VALUES (
  '00000000-0000-0000-0000-000000000120',
  '00000000-0000-0000-0000-000000000001',
  'Zeus',
  'perro',
  'Gran Danés',
  '2011-04-10',
  '2023-06-25',
  37.9838,
  23.7275,
  'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400',
  'Zeus era un gigante gentil. A pesar de su tamaño imponente, era el perro más cariñoso. Creía que era un perro faldero y siempre quería sentarse en nuestro regazo.',
  'Gigante de estatura, más grande de corazón.'
) ON CONFLICT (id) DO NOTHING;

-- ========================================
-- PASO 3: Insertar algunos tributos de ejemplo
-- ========================================

INSERT INTO tributes (profile_id, visitor_name, tribute_type, message)
VALUES
  ('00000000-0000-0000-0000-000000000101', 'Ana García', 'flower', 'Descansa en paz, Max. Fuiste un gran amigo.'),
  ('00000000-0000-0000-0000-000000000101', 'Carlos Rodríguez', 'candle', 'Siempre te recordaremos con cariño.'),
  ('00000000-0000-0000-0000-000000000102', 'María López', 'flower', 'Luna era especial. La extrañamos mucho.'),
  ('00000000-0000-0000-0000-000000000103', 'John Smith', 'candle', 'Rocky was the best guard dog. We miss him.'),
  ('00000000-0000-0000-0000-000000000107', 'Yuki Tanaka', 'flower', 'Milo was such a gentle giant. Rest in peace.'),
  ('00000000-0000-0000-0000-000000000110', 'Sarah Johnson', 'candle', 'Duke brought so much joy to our neighborhood.')
ON CONFLICT DO NOTHING;

-- ========================================
-- VERIFICACIÓN: Ver los datos insertados
-- ========================================

-- Contar perfiles por tipo
SELECT animal_type, COUNT(*) as total
FROM animal_profiles
GROUP BY animal_type
ORDER BY total DESC;

-- Ver los primeros 5 perfiles
SELECT id, name, animal_type, breed,
       TO_CHAR(birth_date, 'YYYY-MM-DD') as nacimiento,
       TO_CHAR(death_date, 'YYYY-MM-DD') as fallecimiento
FROM animal_profiles
ORDER BY created_at DESC
LIMIT 5;

-- Contar tributos
SELECT COUNT(*) as total_tributos FROM tributes;

-- ¡LISTO! 🎉
-- Ahora tienes 20 perfiles de animales y 6 tributos en tu base de datos
