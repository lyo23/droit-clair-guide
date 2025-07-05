
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { validateTextInput, sanitizeHtml } from '@/utils/validation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface SecureInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  type?: 'text' | 'email' | 'password';
  required?: boolean;
  className?: string;
}

export function SecureInput({ 
  value, 
  onChange, 
  placeholder, 
  maxLength = 1000,
  type = 'text',
  required = false,
  className 
}: SecureInputProps) {
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Validation en temps réel
    if (!validateTextInput(newValue, maxLength)) {
      setError('Entrée invalide ou trop longue');
      return;
    }
    
    setError('');
    // Sanitiser avant de passer à onChange
    onChange(sanitizeHtml(newValue));
  };

  return (
    <div className="space-y-2">
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={`${className} ${error ? 'border-red-500' : ''}`}
        maxLength={maxLength}
      />
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
