
/**
 * Hook d'état optimisé avec mise en cache et synchronisation
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { smartCache } from '@/utils/smartCache';
import { debounce } from '@/utils/performance';

interface OptimizedStateConfig<T> {
  cacheKey?: string;
  persistToCache?: boolean;
  syncAcrossTabs?: boolean;
  debounceMs?: number;
  validator?: (value: T) => boolean;
  transformer?: (value: T) => T;
}

export function useOptimizedState<T>(
  initialValue: T,
  config: OptimizedStateConfig<T> = {}
) {
  const {
    cacheKey,
    persistToCache = false,
    syncAcrossTabs = false,
    debounceMs = 0,
    validator,
    transformer
  } = config;

  // Références pour éviter les re-renders inutiles
  const validatorRef = useRef(validator);
  const transformerRef = useRef(transformer);
  
  validatorRef.current = validator;
  transformerRef.current = transformer;

  // Initialiser avec la valeur du cache si disponible
  const getInitialValue = useCallback(() => {
    if (cacheKey && persistToCache) {
      const cached = smartCache.get(cacheKey) as T | null;
      if (cached !== null) {
        return validatorRef.current ? 
          (validatorRef.current(cached) ? cached : initialValue) : 
          cached;
      }
    }
    return initialValue;
  }, [cacheKey, persistToCache, initialValue]);

  const [state, setState] = useState<T>(getInitialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fonction de mise à jour optimisée
  const updateState = useCallback((newValue: T | ((prev: T) => T)) => {
    setIsLoading(true);
    setError(null);

    try {
      const actualValue = typeof newValue === 'function' 
        ? (newValue as (prev: T) => T)(state)
        : newValue;

      // Validation
      if (validatorRef.current && !validatorRef.current(actualValue)) {
        throw new Error('Validation failed');
      }

      // Transformation
      const finalValue = transformerRef.current ? 
        transformerRef.current(actualValue) : 
        actualValue;

      setState(finalValue);

      // Mise en cache si configuré
      if (cacheKey && persistToCache) {
        smartCache.set(cacheKey, finalValue, 3600000, 2); // 1 heure, priorité élevée
      }

      // Synchronisation inter-onglets
      if (syncAcrossTabs && typeof window !== 'undefined') {
        localStorage.setItem(`optimized_state_${cacheKey}`, JSON.stringify(finalValue));
        window.dispatchEvent(new CustomEvent('optimized-state-change', {
          detail: { key: cacheKey, value: finalValue }
        }));
      }

    } catch (err) {
      setError(err as Error);
      console.error('Error updating optimized state:', err);
    } finally {
      setIsLoading(false);
    }
  }, [state, cacheKey, persistToCache, syncAcrossTabs]);

  // Version debounced de la mise à jour
  const debouncedUpdate = useCallback(
    debounceMs > 0 ? debounce(updateState, debounceMs) : updateState,
    [updateState, debounceMs]
  );

  // Écouter les changements inter-onglets
  useEffect(() => {
    if (!syncAcrossTabs || !cacheKey || typeof window === 'undefined') return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `optimized_state_${cacheKey}` && event.newValue) {
        try {
          const newValue = JSON.parse(event.newValue);
          setState(newValue);
        } catch (err) {
          console.error('Error parsing synced state:', err);
        }
      }
    };

    const handleCustomEvent = (event: CustomEvent) => {
      if (event.detail.key === cacheKey) {
        setState(event.detail.value);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('optimized-state-change', handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('optimized-state-change', handleCustomEvent as EventListener);
    };
  }, [syncAcrossTabs, cacheKey]);

  // Fonctions utilitaires
  const reset = useCallback(() => {
    setState(initialValue);
    if (cacheKey && persistToCache) {
      smartCache.set(cacheKey, initialValue, 3600000, 2);
    }
  }, [initialValue, cacheKey, persistToCache]);

  const refresh = useCallback(() => {
    if (cacheKey && persistToCache) {
      const cached = smartCache.get(cacheKey) as T | null;
      if (cached !== null) {
        setState(cached);
      }
    }
  }, [cacheKey, persistToCache]);

  return {
    state,
    setState: debouncedUpdate,
    isLoading,
    error,
    reset,
    refresh
  };
}
