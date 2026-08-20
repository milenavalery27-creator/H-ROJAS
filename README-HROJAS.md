# HROJAS

Sistema de ventas y catálogo para administración en PC y vendedoras en celular.

## Estado de esta versión

Esta entrega reemplaza la landing original por una interfaz funcional de administración/vendedora y deja el esquema SQL de Supabase preparado en `supabase/schema.sql`.

La demo de la interfaz guarda temporalmente productos/pedidos en el navegador. **No debe considerarse almacenamiento definitivo de producción.** Para persistencia real, ejecutar `supabase/schema.sql` en el proyecto Supabase y configurar las variables de entorno de `.env.example`; después conectar las operaciones CRUD/autenticación a Supabase.

## Modelo de datos

- cities
- categories
- products
- publications
- publication_products (máximo 6 por publicación)
- customers
- sellers
- orders
- order_items

La lógica de precios mantiene Villavicencio separado de las demás ciudades sin exponer nombres técnicos a la vendedora.
