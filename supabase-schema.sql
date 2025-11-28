-- Cementerio Virtual de Animales - Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- Enable PostGIS extension for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium-monthly', 'premium-yearly', 'family')),
  subscription_status TEXT NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Animal profiles table
CREATE TABLE IF NOT EXISTS animal_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  animal_type TEXT NOT NULL CHECK (animal_type IN ('perro', 'gato', 'ave', 'roedor', 'reptil', 'otro')),
  breed TEXT,
  birth_date DATE NOT NULL,
  death_date DATE NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) STORED,
  photo_url TEXT NOT NULL,
  story TEXT NOT NULL,
  epitaph TEXT NOT NULL,
  gallery TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_coordinates CHECK (
    latitude >= -90 AND latitude <= 90 AND
    longitude >= -180 AND longitude <= 180
  ),
  CONSTRAINT valid_dates CHECK (death_date >= birth_date)
);

-- Tributes table
CREATE TABLE IF NOT EXISTS tributes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES animal_profiles(id) ON DELETE CASCADE,
  visitor_name TEXT NOT NULL,
  tribute_type TEXT NOT NULL CHECK (tribute_type IN ('flower', 'candle', 'message')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_animal_profiles_user_id ON animal_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_animal_profiles_animal_type ON animal_profiles(animal_type);
CREATE INDEX IF NOT EXISTS idx_animal_profiles_created_at ON animal_profiles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_animal_profiles_location ON animal_profiles USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_tributes_profile_id ON tributes(profile_id);
CREATE INDEX IF NOT EXISTS idx_tributes_created_at ON tributes(created_at DESC);

-- Full text search index for searching profiles
CREATE INDEX IF NOT EXISTS idx_animal_profiles_search ON animal_profiles
  USING gin(to_tsvector('spanish', name || ' ' || COALESCE(breed, '') || ' ' || story));

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE animal_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tributes ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Animal profiles policies (public read, authenticated write)
CREATE POLICY "Anyone can view animal profiles"
  ON animal_profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create profiles"
  ON animal_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profiles"
  ON animal_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profiles"
  ON animal_profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Tributes policies (public read and create, profile owner can delete)
CREATE POLICY "Anyone can view tributes"
  ON tributes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create tributes"
  ON tributes FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Profile owners can delete tributes"
  ON tributes FOR DELETE
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM animal_profiles WHERE user_id = auth.uid()
    )
  );

-- Function to get nearby profiles
CREATE OR REPLACE FUNCTION get_nearby_profiles(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  animal_type TEXT,
  breed TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  photo_url TEXT,
  epitaph TEXT,
  distance_km DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.animal_type,
    p.breed,
    p.latitude,
    p.longitude,
    p.photo_url,
    p.epitaph,
    ST_Distance(
      p.location,
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
    ) / 1000 AS distance_km
  FROM animal_profiles p
  WHERE ST_DWithin(
    p.location,
    ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
    radius_km * 1000
  )
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- Function to search profiles
CREATE OR REPLACE FUNCTION search_profiles(search_query TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  animal_type TEXT,
  breed TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  photo_url TEXT,
  story TEXT,
  epitaph TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.animal_type,
    p.breed,
    p.latitude,
    p.longitude,
    p.photo_url,
    p.story,
    p.epitaph,
    ts_rank(
      to_tsvector('spanish', p.name || ' ' || COALESCE(p.breed, '') || ' ' || p.story),
      plainto_tsquery('spanish', search_query)
    ) AS rank
  FROM animal_profiles p
  WHERE to_tsvector('spanish', p.name || ' ' || COALESCE(p.breed, '') || ' ' || p.story)
    @@ plainto_tsquery('spanish', search_query)
  ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql;
