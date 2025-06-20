-- This script sets up your database with the exact schema you provided
-- Run this in your Supabase SQL editor

-- Ensure pgcrypto extension is enabled for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Step 1: Create core tables or alter existing ones
-- Create leads table with location column
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(100),
  location VARCHAR(200),
  message TEXT,
  source VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alter leads table to add location column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'location'
  ) THEN
    ALTER TABLE leads ADD COLUMN location VARCHAR(200);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  logo_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  specifications JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);

-- Step 3: Remove duplicates before adding unique constraints
DELETE FROM categories
WHERE id NOT IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY name ORDER BY created_at ASC) AS row_num
    FROM categories
  ) AS ranked
  WHERE row_num = 1
);

DELETE FROM brands
WHERE id NOT IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY name ORDER BY created_at ASC) AS row_num
    FROM brands
  ) AS ranked
  WHERE row_num = 1
);

-- Step 4: Insert sample data safely
INSERT INTO categories (name, description, image_url) VALUES
  ('Industrial Brushes', 'High-quality brushes for industrial cleaning and processing applications', '/placeholder.svg?height=200&width=200'),
  ('Hydraulic Hoses', 'Durable hydraulic hoses for various pressure applications', '/placeholder.svg?height=200&width=200'),
  ('Pneumatic Products', 'Comprehensive range of pneumatic tools and components', '/placeholder.svg?height=200&width=200'),
  ('Rubber Sheets', 'Industrial-grade rubber sheets for sealing and protection', '/placeholder.svg?height=200&width=200'),
  ('Nuts & Bolts', 'Premium fasteners and hardware components', '/placeholder.svg?height=200&width=200')
ON CONFLICT (name) DO NOTHING;

INSERT INTO brands (name, logo_url, website_url) VALUES
  ('Parker Hannifin', '/placeholder.svg?height=100&width=150', 'https://parker.com'),
  ('Gates Corporation', '/placeholder.svg?height=100&width=150', 'https://gates.com'),
  ('Eaton', '/placeholder.svg?height=100&width=150', 'https://eaton.com'),
  ('SMC Corporation', '/placeholder.svg?height=100&width=150', 'https://smc.eu'),
  ('Festo', '/placeholder.svg?height=100&width=150', 'https://festo.com'),
  ('Bosch Rexroth', '/placeholder.svg?height=100&width=150', 'https://boschrexroth.com'),
  ('Danfoss', '/placeholder.svg?height=100&width=150', 'https://danfoss.com'),
  ('Hydac', '/placeholder.svg?height=100&width=150', 'https://hydac.com')
ON CONFLICT (name) DO NOTHING;

INSERT INTO products (name, description, category_id, image_url, specifications, is_featured) VALUES
  (
    'Professional Wire Brush Set',
    'Heavy-duty wire brushes for industrial surface preparation and cleaning applications',
    (SELECT id FROM categories WHERE name = 'Industrial Brushes'),
    '/placeholder.svg?height=300&width=400',
    '{"material": "Stainless Steel", "sizes": "Various", "application": "Surface Preparation", "durability": "Heavy Duty"}',
    true
  ),
  (
    'High-Pressure Hydraulic Hose',
    'Industrial grade hydraulic hose designed for high-pressure applications up to 350 BAR',
    (SELECT id FROM categories WHERE name = 'Hydraulic Hoses'),
    '/placeholder.svg?height=300&width=400',
    '{"pressure_rating": "350 BAR", "temperature_range": "-40°C to +100°C", "size_range": "1/4\" to 2\"", "material": "Synthetic Rubber"}',
    true
  ),
  (
    'Pneumatic Cylinder Double Acting',
    'High-performance double-acting pneumatic cylinder with aluminum alloy construction',
    (SELECT id FROM categories WHERE name = 'Pneumatic Products'),
    '/placeholder.svg?height=300&width=400',
    '{"bore_size": "32mm to 100mm", "stroke_length": "25mm to 500mm", "operating_pressure": "1.5 to 10 BAR", "material": "Aluminum Alloy"}',
    true
  ),
  (
    'Industrial Rubber Sheet NBR',
    'High-quality NBR rubber sheets for industrial sealing and gasket applications',
    (SELECT id FROM categories WHERE name = 'Rubber Sheets'),
    '/placeholder.svg?height=300&width=400',
    '{"thickness": "1mm to 50mm", "hardness": "40-90 Shore A", "temperature_range": "-30°C to +80°C", "material": "NBR/SBR"}',
    true
  ),
  (
    'Stainless Steel Fastener Set',
    'Premium stainless steel nuts and bolts for industrial and marine applications',
    (SELECT id FROM categories WHERE name = 'Nuts & Bolts'),
    '/placeholder.svg?height=300&width=400',
    '{"material": "SS 304/316", "size_range": "M6 to M24", "grade": "A2-70/A4-80", "finish": "Passivated"}',
    true
  ),
  (
    'Air Filter Regulator Combo',
    'High-efficiency air filter and regulator combination for pneumatic systems',
    (SELECT id FROM categories WHERE name = 'Pneumatic Products'),
    '/placeholder.svg?height=300&width=400',
    '{"flow_rate": "500-2000 L/min", "max_pressure": "16 BAR", "filtration": "5 micron", "connection_size": "1/4\" to 1\""}',
    true
  );
