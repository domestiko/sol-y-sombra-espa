import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Star, MapPin, Phone, Mail, Search, Filter } from 'lucide-react';

interface Professional {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  description: string;
  experience_years: number;
  hourly_rate: number;
  city: string;
  avatar_url: string;
  professional_services: {
    title: string;
    service_categories: {
      name: string;
    };
  }[];
}

const Professionals = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    fetchProfessionals();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProfessionals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('professionals')
        .select(`
          *,
          professional_services (
            title,
            service_categories (
              name
            )
          )
        `)
        .eq('verified', true)
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfessionals(data || []);
    } catch (error) {
      console.error('Error fetching professionals:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los profesionales",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = professional.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.city?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           professional.professional_services.some(service => 
                             service.service_categories.name.toLowerCase().includes(selectedCategory.toLowerCase())
                           );
    
    return matchesSearch && matchesCategory;
  });

  const handleContactProfessional = (professional: Professional) => {
    toast({
      title: "Contactar profesional",
      description: `Próximamente podrás contactar directamente a ${professional.full_name}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-4">Profesionales Verificados</h1>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Encuentra profesionales confiables para tu hogar. Todos nuestros profesionales están verificados y tienen experiencia comprobada.
          </p>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, servicio o ciudad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los servicios</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Profesionales */}
      <div className="container mx-auto px-4 py-8">
        {filteredProfessionals.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No se encontraron profesionales</h3>
            <p className="text-muted-foreground">
              Intenta con otros términos de búsqueda o filtros diferentes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <Card key={professional.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{professional.full_name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {professional.city}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Servicios */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Servicios:</h4>
                    <div className="flex flex-wrap gap-1">
                      {professional.professional_services.slice(0, 3).map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service.service_categories.name}
                        </Badge>
                      ))}
                      {professional.professional_services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{professional.professional_services.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Descripción */}
                  {professional.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {professional.description}
                    </p>
                  )}

                  {/* Experiencia y tarifa */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {professional.experience_years} años de experiencia
                    </span>
                    {professional.hourly_rate && (
                      <span className="font-semibold">
                        ${professional.hourly_rate}/hora
                      </span>
                    )}
                  </div>

                  {/* Contacto */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => handleContactProfessional(professional)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contactar
                    </Button>
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Professionals;