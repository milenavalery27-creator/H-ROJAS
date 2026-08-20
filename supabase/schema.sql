-- HROJAS - Esquema persistente
create extension if not exists pgcrypto;

create table if not exists public.cities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  price_group text not null default 'otras',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  name text not null,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  price_villavicencio numeric(14,2) not null default 0,
  price_other numeric(14,2) not null default 0,
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.publication_products (
  publication_id uuid not null references public.publications(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  position smallint not null check (position between 1 and 6),
  primary key (publication_id, product_id),
  unique (publication_id, position)
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  city text,
  address text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.sellers (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  seller_id uuid references public.sellers(id) on delete set null,
  city text not null,
  status text not null default 'Pendiente',
  total numeric(14,2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  sku text not null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(14,2) not null check (unit_price >= 0),
  subtotal numeric(14,2) generated always as (quantity * unit_price) stored
);

create index if not exists products_category_idx on public.products(category_id);
create index if not exists products_active_idx on public.products(active);
create index if not exists orders_created_idx on public.orders(created_at desc);
create index if not exists order_items_order_idx on public.order_items(order_id);

insert into public.categories (name) values ('Bolsos'), ('Carteras'), ('Accesorios'), ('Taller') on conflict (name) do nothing;
insert into public.cities (name, price_group) values
  ('Villavicencio', 'villavicencio'), ('Bogotá', 'otras'), ('Acacías', 'otras'), ('Granada', 'otras'), ('Puerto López', 'otras')
on conflict (name) do nothing;

alter table public.cities enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.publications enable row level security;
alter table public.publication_products enable row level security;
alter table public.customers enable row level security;
alter table public.sellers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Lectura pública únicamente para catálogo activo. Escrituras se harán con sesión administrativa.
drop policy if exists "active products readable" on public.products;
create policy "active products readable" on public.products for select using (active = true);
drop policy if exists "active categories readable" on public.categories;
create policy "active categories readable" on public.categories for select using (active = true);
drop policy if exists "active cities readable" on public.cities;
create policy "active cities readable" on public.cities for select using (active = true);
drop policy if exists "active publications readable" on public.publications;
create policy "active publications readable" on public.publications for select using (active = true);
drop policy if exists "active publication products readable" on public.publication_products;
create policy "active publication products readable" on public.publication_products for select using (exists (select 1 from public.publications p where p.id = publication_id and p.active));

-- Las tablas sensibles no tienen políticas públicas de escritura.
-- Añadir políticas específicas por rol antes de habilitar operaciones desde clientes finales.
