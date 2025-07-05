
/**
 * Utilitaires de sécurité avancés
 */

// Détection d'anomalies de sécurité
class SecurityMonitor {
  private events: Array<{
    type: string;
    timestamp: number;
    details: any;
  }> = [];

  private suspiciousPatterns = [
    /(<script|javascript:|data:|vbscript:)/i,
    /(union|select|insert|drop|delete|update)/i,
    /(\.\.|\/\.\.|\\\.\.)/,
    /(eval\(|setTimeout\(|setInterval\()/i
  ];

  logSecurityEvent(type: string, details: any) {
    this.events.push({
      type,
      timestamp: Date.now(),
      details
    });

    // Nettoyer les anciens événements (garder seulement les 1000 derniers)
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }

    this.analyzeThreats();
  }

  validateInput(input: string, context: string): {
    isValid: boolean;
    threats: string[];
    sanitized: string;
  } {
    const threats: string[] = [];
    
    for (const pattern of this.suspiciousPatterns) {
      if (pattern.test(input)) {
        threats.push(`Suspicious pattern detected: ${pattern.source}`);
      }
    }

    // Log des tentatives suspectes
    if (threats.length > 0) {
      this.logSecurityEvent('suspicious_input', {
        context,
        input: input.substring(0, 100), // Limiter la taille pour les logs
        threats
      });
    }

    return {
      isValid: threats.length === 0,
      threats,
      sanitized: this.sanitizeInput(input)
    };
  }

  private sanitizeInput(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/\\/g, '&#x5C;');
  }

  private analyzeThreats() {
    const recentEvents = this.events.filter(
      event => Date.now() - event.timestamp < 300000 // 5 minutes
    );

    // Détecter les tentatives répétées
    const suspiciousInputCount = recentEvents.filter(
      event => event.type === 'suspicious_input'
    ).length;

    if (suspiciousInputCount > 5) {
      console.warn('🚨 Multiple suspicious inputs detected!');
      // Ici on pourrait déclencher des mesures de sécurité supplémentaires
    }
  }

  getSecurityReport() {
    const last24h = this.events.filter(
      event => Date.now() - event.timestamp < 86400000
    );

    return {
      totalEvents: this.events.length,
      last24h: last24h.length,
      threatTypes: this.groupByType(last24h),
      recommendations: this.getRecommendations(last24h)
    };
  }

  private groupByType(events: typeof this.events) {
    return events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private getRecommendations(events: typeof this.events): string[] {
    const recommendations: string[] = [];
    
    if (events.filter(e => e.type === 'suspicious_input').length > 0) {
      recommendations.push('Renforcer la validation des entrées utilisateur');
    }
    
    if (events.length > 50) {
      recommendations.push('Considérer la mise en place de rate limiting');
    }

    return recommendations;
  }
}

export const securityMonitor = new SecurityMonitor();

// Composant de sécurité pour les entrées
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

interface SecureWrapperProps {
  children: React.ReactNode;
  onSecurityViolation?: (threats: string[]) => void;
}

export function SecureWrapper({ children, onSecurityViolation }: SecureWrapperProps) {
  const [securityStatus, setSecurityStatus] = React.useState<'safe' | 'warning' | 'danger'>('safe');
  const [lastCheck, setLastCheck] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const report = securityMonitor.getSecurityReport();
    
    if (report.last24h > 10) {
      setSecurityStatus('warning');
    } else if (report.last24h > 20) {
      setSecurityStatus('danger');
    } else {
      setSecurityStatus('safe');
    }
    
    setLastCheck(new Date());
  }, []);

  return (
    <div className="space-y-4">
      {securityStatus !== 'safe' && (
        <Alert variant={securityStatus === 'danger' ? 'destructive' : 'default'}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {securityStatus === 'warning' 
              ? 'Activité suspecte détectée. Soyez vigilant avec les entrées utilisateur.'
              : 'Niveau de menace élevé détecté. Vérifiez les logs de sécurité.'
            }
          </AlertDescription>
        </Alert>
      )}
      {children}
      <div className="text-xs text-gray-500 flex items-center gap-1">
        <Shield className="w-3 h-3" />
        Protection active - Dernière vérification: {lastCheck.toLocaleTimeString()}
      </div>
    </div>
  );
}
