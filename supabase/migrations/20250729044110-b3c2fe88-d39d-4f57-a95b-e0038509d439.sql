-- Insertar categorías de servicios
INSERT INTO public.service_categories (name, description, icon) VALUES
('Plomería', 'Reparaciones, instalaciones y mantenimiento de tuberías, grifos y sistemas de agua', '🔧'),
('Electricidad', 'Instalaciones eléctricas, reparación de enchufes, cambio de bombillas y más', '⚡'),
('Jardinería', 'Mantenimiento de jardines, poda de plantas, diseño de espacios verdes', '🌱'),
('Limpieza', 'Limpieza profunda, mantenimiento regular, organización de espacios', '🧹'),
('Pintura', 'Pintura interior y exterior, acabados especiales, reparación de paredes', '🎨'),
('Técnicos', 'Reparación de electrodomésticos, aire acondicionado, calentadores y más', '⚙️'),
('Cuidado Infantil', 'Niñeras, cuidadores y servicios de atención a niños', '👶'),
('Carpintería', 'Reparación de muebles, instalación de estantes, trabajos en madera', '🪚');

-- Insertar profesionales de ejemplo
INSERT INTO public.professionals (user_id, full_name, email, phone, city, description, experience_years, hourly_rate, verified, available) VALUES
('00000000-0000-0000-0000-000000000001', 'Carlos Rodríguez', 'carlos.plomero@email.com', '+57 300 123 4567', 'Bogotá', 'Plomero certificado con más de 10 años de experiencia. Especializado en reparaciones de emergencia y instalaciones residenciales.', 10, 35000, true, true),
('00000000-0000-0000-0000-000000000002', 'María García', 'maria.electricista@email.com', '+57 300 234 5678', 'Medellín', 'Electricista profesional especializada en instalaciones domésticas y sistemas de iluminación. Certificada en normativas eléctricas.', 8, 40000, true, true),
('00000000-0000-0000-0000-000000000003', 'Luis Herrera', 'luis.jardinero@email.com', '+57 300 345 6789', 'Cali', 'Jardinero y paisajista con amplia experiencia en diseño de jardines y mantenimiento de áreas verdes urbanas.', 6, 25000, true, true),
('00000000-0000-0000-0000-000000000004', 'Ana Martínez', 'ana.limpieza@email.com', '+57 300 456 7890', 'Bogotá', 'Especialista en limpieza profunda y mantenimiento de hogar. Trabajo con productos ecológicos y técnicas profesionales.', 5, 20000, true, true),
('00000000-0000-0000-0000-000000000005', 'Diego Pérez', 'diego.pintor@email.com', '+57 300 567 8901', 'Barranquilla', 'Pintor profesional con experiencia en técnicas decorativas y acabados especiales. Trabajo interior y exterior.', 12, 30000, true, true),
('00000000-0000-0000-0000-000000000006', 'Carmen López', 'carmen.ninera@email.com', '+57 300 678 9012', 'Medellín', 'Niñera certificada en primeros auxilios y pedagogía infantil. Experiencia con niños de todas las edades.', 7, 18000, true, true);

-- Obtener los IDs de las categorías para crear los servicios
DO $$
DECLARE
    cat_plomeria_id uuid;
    cat_electricidad_id uuid;
    cat_jardineria_id uuid;
    cat_limpieza_id uuid;
    cat_pintura_id uuid;
    cat_cuidado_id uuid;
    
    prof_carlos_id uuid;
    prof_maria_id uuid;
    prof_luis_id uuid;
    prof_ana_id uuid;
    prof_diego_id uuid;
    prof_carmen_id uuid;
BEGIN
    -- Obtener IDs de categorías
    SELECT id INTO cat_plomeria_id FROM public.service_categories WHERE name = 'Plomería';
    SELECT id INTO cat_electricidad_id FROM public.service_categories WHERE name = 'Electricidad';
    SELECT id INTO cat_jardineria_id FROM public.service_categories WHERE name = 'Jardinería';
    SELECT id INTO cat_limpieza_id FROM public.service_categories WHERE name = 'Limpieza';
    SELECT id INTO cat_pintura_id FROM public.service_categories WHERE name = 'Pintura';
    SELECT id INTO cat_cuidado_id FROM public.service_categories WHERE name = 'Cuidado Infantil';
    
    -- Obtener IDs de profesionales
    SELECT id INTO prof_carlos_id FROM public.professionals WHERE email = 'carlos.plomero@email.com';
    SELECT id INTO prof_maria_id FROM public.professionals WHERE email = 'maria.electricista@email.com';
    SELECT id INTO prof_luis_id FROM public.professionals WHERE email = 'luis.jardinero@email.com';
    SELECT id INTO prof_ana_id FROM public.professionals WHERE email = 'ana.limpieza@email.com';
    SELECT id INTO prof_diego_id FROM public.professionals WHERE email = 'diego.pintor@email.com';
    SELECT id INTO prof_carmen_id FROM public.professionals WHERE email = 'carmen.ninera@email.com';
    
    -- Insertar servicios de Carlos (Plomería)
    INSERT INTO public.professional_services (professional_id, category_id, title, description, price_min, price_max) VALUES
    (prof_carlos_id, cat_plomeria_id, 'Reparación de Grifos', 'Reparación y reemplazo de grifos, llaves y accesorios de baño y cocina', 25000, 80000),
    (prof_carlos_id, cat_plomeria_id, 'Destapado de Tuberías', 'Servicio de destapado de tuberías y desagües con herramientas especializadas', 40000, 120000),
    (prof_carlos_id, cat_plomeria_id, 'Instalación de Sanitarios', 'Instalación completa de sanitarios, lavamanos y accesorios de baño', 80000, 200000);
    
    -- Insertar servicios de María (Electricidad)
    INSERT INTO public.professional_services (professional_id, category_id, title, description, price_min, price_max) VALUES
    (prof_maria_id, cat_electricidad_id, 'Instalación de Enchufes', 'Instalación y reparación de tomacorrientes y switches', 30000, 70000),
    (prof_maria_id, cat_electricidad_id, 'Reparación de Iluminación', 'Instalación y reparación de lámparas, focos y sistemas de iluminación', 35000, 100000),
    (prof_maria_id, cat_electricidad_id, 'Revisión Eléctrica', 'Diagnóstico completo del sistema eléctrico del hogar', 60000, 150000);
    
    -- Insertar servicios de Luis (Jardinería)
    INSERT INTO public.professional_services (professional_id, category_id, title, description, price_min, price_max) VALUES
    (prof_luis_id, cat_jardineria_id, 'Mantenimiento de Jardín', 'Poda, riego y cuidado general de plantas y césped', 40000, 100000),
    (prof_luis_id, cat_jardineria_id, 'Diseño de Jardines', 'Diseño y creación de espacios verdes personalizados', 150000, 500000),
    (prof_luis_id, cat_jardineria_id, 'Poda de Árboles', 'Poda profesional de árboles y arbustos grandes', 60000, 200000);
    
    -- Insertar servicios de Ana (Limpieza)
    INSERT INTO public.professional_services (professional_id, category_id, title, description, price_min, price_max) VALUES
    (prof_ana_id, cat_limpieza_id, 'Limpieza General', 'Limpieza completa de casa o apartamento', 50000, 120000),
    (prof_ana_id, cat_limpieza_id, 'Limpieza Profunda', 'Limpieza detallada incluyendo ventanas, electrodomésticos y espacios difíciles', 80000, 200000),
    (prof_ana_id, cat_limpieza_id, 'Limpieza Post-Construcción', 'Limpieza especializada después de obras o remodelaciones', 100000, 300000);
    
    -- Insertar servicios de Diego (Pintura)
    INSERT INTO public.professional_services (professional_id, category_id, title, description, price_min, price_max) VALUES
    (prof_diego_id, cat_pintura_id, 'Pintura de Interiores', 'Pintura profesional de habitaciones y espacios interiores', 80000, 250000),
    (prof_diego_id, cat_pintura_id, 'Pintura de Fachadas', 'Pintura exterior de casas y edificios', 150000, 500000),
    (prof_diego_id, cat_pintura_id, 'Acabados Decorativos', 'Técnicas especiales de pintura decorativa y texturas', 100000, 300000);
    
    -- Insertar servicios de Carmen (Cuidado Infantil)
    INSERT INTO public.professional_services (professional_id, category_id, title, description, price_min, price_max) VALUES
    (prof_carmen_id, cat_cuidado_id, 'Cuidado de Niños', 'Cuidado profesional de niños en horarios flexibles', 15000, 25000),
    (prof_carmen_id, cat_cuidado_id, 'Niñera Nocturna', 'Cuidado nocturno y durante madrugadas', 20000, 35000),
    (prof_carmen_id, cat_cuidado_id, 'Apoyo Escolar', 'Acompañamiento en tareas y actividades educativas', 18000, 30000);
END $$;