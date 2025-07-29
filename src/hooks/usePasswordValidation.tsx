import { useState, useEffect } from 'react';

export interface PasswordValidation {
  isValid: boolean;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  strength: 'weak' | 'medium' | 'strong';
}

export const usePasswordValidation = (password: string): PasswordValidation => {
  const [validation, setValidation] = useState<PasswordValidation>({
    isValid: false,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    strength: 'weak'
  });

  useEffect(() => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    const validChecks = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar];
    const validCount = validChecks.filter(Boolean).length;

    let strength: 'weak' | 'medium' | 'strong' = 'weak';
    if (validCount >= 5) {
      strength = 'strong';
    } else if (validCount >= 3) {
      strength = 'medium';
    }

    const isValid = validCount === 5;

    setValidation({
      isValid,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      strength
    });
  }, [password]);

  return validation;
};