
import React from 'react';
import { VoiceSearchInput } from './VoiceSearchInput';

interface AutocompleteOption {
  id: string;
  text: string;
  type: 'recent' | 'suggestion' | 'template' | 'legal_term';
  category?: string;
  frequency?: number;
}

interface SmartAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SmartAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Tapez pour commencer...",
  context = 'general',
  className,
  onKeyPress
}: SmartAutocompleteProps) {
  return (
    <VoiceSearchInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      context={context}
      className={className}
      onKeyPress={onKeyPress}
      showVoiceButton={true}
    />
  );
}
