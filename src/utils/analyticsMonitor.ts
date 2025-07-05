
/**
 * Système de monitoring et d'analytics avancé
 */

interface UserAction {
  type: string;
  element: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

interface PageView {
  path: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  referrer?: string;
  duration?: number;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'load' | 'interaction' | 'navigation' | 'error';
}

class AnalyticsMonitor {
  private actions: UserAction[] = [];
  private pageViews: PageView[] = [];
  private metrics: PerformanceMetric[] = [];
  private sessionId: string;
  private currentPage: PageView | null = null;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private initializeTracking() {
    // Tracker les clics
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      this.trackAction('click', this.getElementSelector(target), {
        x: event.clientX,
        y: event.clientY,
        button: event.button
      });
    });

    // Tracker les changements de page
    if (typeof window !== 'undefined') {
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = (...args) => {
        originalPushState.apply(history, args);
        this.trackPageView(window.location.pathname);
      };

      history.replaceState = (...args) => {
        originalReplaceState.apply(history, args);
        this.trackPageView(window.location.pathname);
      };

      window.addEventListener('popstate', () => {
        this.trackPageView(window.location.pathname);
      });

      // Page initiale
      this.trackPageView(window.location.pathname);
    }
  }

  private getElementSelector(element: HTMLElement): string {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  }

  trackAction(type: string, element: string, metadata?: Record<string, any>) {
    const action: UserAction = {
      type,
      element,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      metadata
    };

    this.actions.push(action);
    
    // Garder seulement les 1000 dernières actions
    if (this.actions.length > 1000) {
      this.actions = this.actions.slice(-1000);
    }
  }

  trackPageView(path: string) {
    // Terminer la page précédente
    if (this.currentPage) {
      this.currentPage.duration = Date.now() - this.currentPage.timestamp;
    }

    // Commencer une nouvelle page
    this.currentPage = {
      path,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      referrer: document.referrer
    };

    this.pageViews.push(this.currentPage);
  }

  trackMetric(name: string, value: number, category: PerformanceMetric['category'] = 'interaction') {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
      category
    });
  }

  getAnalytics() {
    const now = Date.now();
    const last24h = now - 86400000; // 24 heures

    const recentActions = this.actions.filter(a => a.timestamp > last24h);
    const recentPageViews = this.pageViews.filter(p => p.timestamp > last24h);
    const recentMetrics = this.metrics.filter(m => m.timestamp > last24h);

    return {
      session: {
        id: this.sessionId,
        duration: this.currentPage ? now - this.currentPage.timestamp : 0,
        pageViews: this.pageViews.length,
        actions: this.actions.length
      },
      last24h: {
        actions: recentActions.length,
        pageViews: recentPageViews.length,
        averagePageDuration: this.calculateAveragePageDuration(recentPageViews),
        topActions: this.getTopActions(recentActions),
        topPages: this.getTopPages(recentPageViews)
      },
      performance: {
        averageLoadTime: this.calculateAverageMetric(recentMetrics, 'load'),
        averageInteractionTime: this.calculateAverageMetric(recentMetrics, 'interaction'),
        errorCount: recentMetrics.filter(m => m.category === 'error').length
      }
    };
  }

  private calculateAveragePageDuration(pageViews: PageView[]): number {
    const viewsWithDuration = pageViews.filter(p => p.duration);
    if (viewsWithDuration.length === 0) return 0;
    
    const totalDuration = viewsWithDuration.reduce((sum, p) => sum + (p.duration || 0), 0);
    return totalDuration / viewsWithDuration.length;
  }

  private getTopActions(actions: UserAction[]): Array<{ type: string; count: number }> {
    const actionCounts = actions.reduce((acc, action) => {
      acc[action.type] = (acc[action.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(actionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));
  }

  private getTopPages(pageViews: PageView[]): Array<{ path: string; views: number }> {
    const pageCounts = pageViews.reduce((acc, page) => {
      acc[page.path] = (acc[page.path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([path, views]) => ({ path, views }));
  }

  private calculateAverageMetric(metrics: PerformanceMetric[], category: string): number {
    const categoryMetrics = metrics.filter(m => m.category === category);
    if (categoryMetrics.length === 0) return 0;
    
    const total = categoryMetrics.reduce((sum, m) => sum + m.value, 0);
    return total / categoryMetrics.length;
  }

  exportData() {
    return {
      actions: this.actions,
      pageViews: this.pageViews,
      metrics: this.metrics,
      analytics: this.getAnalytics()
    };
  }

  clear() {
    this.actions = [];
    this.pageViews = [];
    this.metrics = [];
    this.currentPage = null;
  }
}

export const analyticsMonitor = new AnalyticsMonitor();

// Hook React pour utiliser les analytics
import { useEffect, useCallback } from 'react';

export function useAnalytics(componentName: string) {
  const trackComponentAction = useCallback(
    (action: string, metadata?: Record<string, any>) => {
      analyticsMonitor.trackAction(`${componentName}_${action}`, componentName, metadata);
    },
    [componentName]
  );

  const trackComponentMetric = useCallback(
    (metricName: string, value: number) => {
      analyticsMonitor.trackMetric(`${componentName}_${metricName}`, value);
    },
    [componentName]
  );

  useEffect(() => {
    analyticsMonitor.trackMetric(`component_mount_${componentName}`, performance.now(), 'load');
    
    return () => {
      analyticsMonitor.trackMetric(`component_unmount_${componentName}`, performance.now(), 'load');
    };
  }, [componentName]);

  return {
    trackAction: trackComponentAction,
    trackMetric: trackComponentMetric,
    getAnalytics: analyticsMonitor.getAnalytics
  };
}
