-- =============================================
-- RENNSPORT F1 STORE — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- =============================================

/* ── 1. Orders Table ── */
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT,
  payment_method TEXT NOT NULL DEFAULT 'pago_movil',
  payment_reference TEXT,
  status TEXT NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'reserva', 'en_camino', 'entregado', 'cancelado')),
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  tax NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  notes TEXT
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');


/* ── 2. Contact Messages Table ── */
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');


/* ── 3. Products Table ── */
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY, -- Using existing IDs (e.g. 'rb-77-x')
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC(10,2) NOT NULL,
  sku TEXT NOT NULL,
  team TEXT,
  category TEXT,
  image TEXT NOT NULL,
  image_lg TEXT,
  description TEXT,
  specs JSONB DEFAULT '[]',
  sizes JSONB DEFAULT '[]',
  stock INTEGER DEFAULT 50,
  sold_out BOOLEAN DEFAULT false,
  tag TEXT,
  tag_style TEXT
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Authenticated users (admin) can manage products" ON products FOR ALL USING (auth.role() = 'authenticated');

/* ── 4. Storage Bucket (Optional for images) ── */
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'product-images' );
