-- Insertar categorías de servicios (solo si no existen)
INSERT INTO public.service_categories (name, description, icon) 
SELECT 'Plomería', 'Reparaciones, instalaciones y mantenimiento de tuberías, grifos y sistemas de agua', '🔧'
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'Plomería');

INSERT INTO public.service_categories (name, description, icon) 
SELECT 'Electricidad', 'Instalaciones eléctricas, reparación de enchufes, cambio de bombillas y más', '⚡'
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'Electricidad');

INSERT INTO public.service_categories (name, description, icon) 
SELECT 'Jardinería', 'Mantenimiento de jardines, poda de plantas, diseño de espacios verdes', '🌱'
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'Jardinería');

INSERT INTO public.service_categories (name, description, icon) 
SELECT 'Limpieza', 'Limpieza profunda, mantenimiento regular, organización de espacios', '🧹'
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'Limpieza');

INSERT INTO public.service_categories (name, description, icon) 
SELECT 'Pintura', 'Pintura interior y exterior, acabados especiales, reparación de paredes', '🎨'
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'Pintura');

INSERT INTO public.service_categories (name, description, icon) 
SELECT 'Técnicos', 'Reparación de electrodomésticos, aire acondicionado, calentadores y más', '⚙️'
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'Técnicos');

INSERT INTO public.service_categories (name, description, icon) 
SELECT 'Cuidado Infantil', 'Niñeras, cuidadores y servicios de atención a niños', '👶'
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'Cuidado Infantil');

INSERT INTO public.service_categories (name, description, icon) 
SELECT 'Carpintería', 'Reparación de muebles, instalación de estantes, trabajos en madera', '🪚'
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'Carpintería');