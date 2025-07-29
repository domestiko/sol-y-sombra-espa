import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft,
  Edit,
  Save,
  X
} from "lucide-react";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  phone?: string;
  address?: string;
  city?: string;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (!user) {
      toast({
        title: "Acceso restringido",
        description: "Debes iniciar sesión para ver tu perfil",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    fetchUserData();
  }, [user, navigate, toast]);

  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || "");
        setPhone(profileData.phone || "");
        setAddress(profileData.address || "");
        setCity(profileData.city || "");
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información del usuario",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const profileData = {
        user_id: user.id,
        full_name: fullName,
        phone: phone || null,
        address: address || null,
        city: city || null,
      };

      if (profile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new profile
        const { error } = await supabase
          .from('profiles')
          .insert(profileData);

        if (error) throw error;
      }

      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido guardada correctamente",
      });

      setIsEditing(false);
      fetchUserData(); // Refresh data
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la información",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
          >
            Cerrar Sesión
          </Button>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Mi Perfil
            </CardTitle>
            {!isEditing ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleSaveProfile}
                  disabled={saving}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="fullName">Nombre completo</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Calle 123 #45-67"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bogotá"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{fullName || "Sin nombre"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{user?.email}</span>
                </div>
                {phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{phone}</span>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {address}{city && `, ${city}`}
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/book-service')}
          >
            <CardContent className="p-6 text-center">
              <h3 className="font-medium mb-2">Solicitar Servicio</h3>
              <p className="text-sm text-muted-foreground">
                Encuentra un profesional para tu hogar
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/professionals')}
          >
            <CardContent className="p-6 text-center">
              <h3 className="font-medium mb-2">Ver Profesionales</h3>
              <p className="text-sm text-muted-foreground">
                Explora todos los profesionales disponibles
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;