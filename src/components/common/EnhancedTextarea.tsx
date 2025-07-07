
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Command, Clock, Star, Search } from 'lucide-react';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { cn } from '@/lib/utils';

interface SuggestionItem {
  id: string;
  text: string;
  type: 'recent' | 'suggestion' | 'template' | 'legal_term';
  category?: string;
}

interface EnhancedTextareaProps extends React.ComponentProps<"textarea"> {
  enableVoice?: boolean;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  suggestions?: SuggestionItem[];
}

export function EnhancedTextarea({ 
  enableVoice = true,
  context = 'general',
  suggestions = [],
  className,
  value,
  onChange,
  placeholder,
  ...props 
}: EnhancedTextareaProps) {
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const { 
    isListening, 
    transcript, 
    isSupported, 
    error, 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useVoiceRecognition({
    continuous: false,
    interimResults: true,
    language: 'fr-FR'
  });

  // Suggestions par contexte
  const defaultSuggestions: Record<string, SuggestionItem[]> = {
    legal: [
      { id: '1', text: 'Article du code civil', type: 'legal_term', category: 'Civil' },
      { id: '2', text: 'Dispositions réglementaires', type: 'legal_term', category: 'Règlement' },
      { id: '3', text: 'Jurisprudence constante', type: 'legal_term', category: 'Jurisprudence' }
    ],
    procedure: [
      { id: '1', text: 'Étapes de la procédure', type: 'template', category: 'Procédure' },
      { id: '2', text: 'Documents requis', type: 'template', category: 'Documents' },
      { id: '3', text: 'Délais de traitement', type: 'template', category: 'Délais' }
    ],
    general: [
      { id: '1', text: 'Description détaillée', type: 'suggestion' },
      { id: '2', text: 'Contexte applicable', type: 'suggestion' }
    ]
  };

  React.useEffect(() => {
    if (transcript && transcript.trim() !== '') {
      onChange?.({ target: { value: (value || '') + ' ' + transcript } } as any);
    }
  }, [transcript, onChange, value]);

  const allSuggestions = [...suggestions, ...(defaultSuggestions[context] || [])];

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  const handleSuggestionClick = (suggestion: SuggestionItem) => {
    const newValue = (value || '') + ' ' + suggestion.text;
    onChange?.({ target: { value: newValue } } as any);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const getSuggestionIcon = (type: SuggestionItem['type']) => {
    switch (type) {
      case 'recent': return <Clock className="w-3 h-3" />;
      case 'template': return <Command className="w-3 h-3" />;
      case 'legal_term': return <Star className="w-3 h-3" />;
      default: return <Search className="w-3 h-3" />;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Textarea
          {...props}
          ref={textareaRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            isListening ? "border-red-300 bg-red-50" : "",
            className
          )}
          onFocus={() => allSuggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        
        {enableVoice && isSupported && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleVoiceToggle}
            className={cn(
              "absolute right-2 top-2 h-8 w-8 p-0",
              isListening ? "text-red-600 bg-red-100 hover:bg-red-200" : "text-gray-400 hover:text-gray-600"
            )}
            title={isListening ? "Arrêter l'écoute" : "Commencer la dictée vocale"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* Indicateur de reconnaissance vocale */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 z-40 mt-1">
          <Card className="p-2 bg-red-50 border-red-200">
            <div className="flex items-center gap-2 text-red-700 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Écoute en cours... Parlez maintenant
            </div>
          </Card>
        </div>
      )}

      {/* Erreur de reconnaissance vocale */}
      {error && (
        <div className="absolute top-full left-0 right-0 z-40 mt-1">
          <Card className="p-2 bg-red-50 border-red-200">
            <div className="text-red-700 text-sm">{error}</div>
          </Card>
        </div>
      )}
      
      {/* Suggestions */}
      {showSuggestions && !isListening && allSuggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto bg-white border shadow-lg">
          <div className="p-2">
            {allSuggestions.slice(0, 6).map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-center gap-2 p-2 rounded cursor-pointer transition-colors hover:bg-gray-50"
              >
                {getSuggestionIcon(suggestion.type)}
                <span className="flex-1 text-sm">{suggestion.text}</span>
                {suggestion.category && (
                  <Badge variant="outline" className="text-xs">
                    {suggestion.category}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
