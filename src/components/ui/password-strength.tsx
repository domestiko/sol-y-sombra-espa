import { Check, X } from "lucide-react";
import { PasswordValidation } from "@/hooks/usePasswordValidation";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  validation: PasswordValidation;
  password: string;
}

export const PasswordStrength = ({ validation, password }: PasswordStrengthProps) => {
  if (!password) return null;

  const getStrengthColor = () => {
    switch (validation.strength) {
      case 'strong':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  const getStrengthWidth = () => {
    switch (validation.strength) {
      case 'strong':
        return 'w-full';
      case 'medium':
        return 'w-2/3';
      default:
        return 'w-1/3';
    }
  };

  const requirements = [
    { met: validation.hasMinLength, text: "Mínimo 8 caracteres" },
    { met: validation.hasUppercase, text: "Una letra mayúscula" },
    { met: validation.hasLowercase, text: "Una letra minúscula" },
    { met: validation.hasNumber, text: "Un número" },
    { met: validation.hasSpecialChar, text: "Un carácter especial (!@#$%^&*)" }
  ];

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Fortaleza de la contraseña:</span>
          <span className={cn(
            "font-medium capitalize",
            validation.strength === 'strong' && "text-green-600",
            validation.strength === 'medium' && "text-yellow-600",
            validation.strength === 'weak' && "text-red-600"
          )}>
            {validation.strength === 'strong' && 'Fuerte'}
            {validation.strength === 'medium' && 'Media'}
            {validation.strength === 'weak' && 'Débil'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              getStrengthColor(),
              getStrengthWidth()
            )}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Requisitos:</p>
        <div className="grid grid-cols-1 gap-1">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {req.met ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                req.met ? "text-green-700" : "text-muted-foreground"
              )}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};