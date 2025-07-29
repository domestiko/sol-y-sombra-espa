-- Primero insertar las categorías de servicios
INSERT INTO public.service_categories (name, description, icon) VALUES
('Plomería', 'Reparaciones, instalaciones y mantenimiento de tuberías, grifos y sistemas de agua', '🔧'),
('Electricidad', 'Instalaciones eléctricas, reparación de enchufes, cambio de bombillas y más', '⚡'),
('Jardinería', 'Mantenimiento de jardines, poda de plantas, diseño de espacios verdes', '🌱'),
('Limpieza', 'Limpieza profunda, mantenimiento regular, organización de espacios', '🧹'),
('Pintura', 'Pintura interior y exterior, acabados especiales, reparación de paredes', '🎨'),
('Técnicos', 'Reparación de electrodomésticos, aire acondicionado, calentadores y más', '⚙️'),
('Cuidado Infantil', 'Niñeras, cuidadores y servicios de atención a niños', '👶'),
('Carpintería', 'Reparación de muebles, instalación de estantes, trabajos en madera', '🪚')
ON CONFLICT (name) DO NOTHING;