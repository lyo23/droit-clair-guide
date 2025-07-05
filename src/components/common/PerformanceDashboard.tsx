
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Activity, Zap, Database, Clock, RefreshCw } from 'lucide-react';
import { performanceMonitor, usePerformanceTracking } from '@/utils/performanceMonitor';

export function PerformanceDashboard() {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { trackOperation } = usePerformanceTracking('PerformanceDashboard');

  const refreshData = async () => {
    setIsLoading(true);
    await trackOperation('refresh_performance_data', async () => {
      const report = performanceMonitor.getPerformanceReport();
      setPerformanceData(report);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (!performanceData) {
    return <div>Chargement des données de performance...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tableau de bord des performances</h2>
          <p className="text-gray-600">Surveillance en temps réel des performances de l'application</p>
        </div>
        <Button onClick={refreshData} disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{performanceData.vitals.ttfb}ms</div>
            <div className="text-sm text-gray-600">TTFB</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{performanceData.vitals.dcl}ms</div>
            <div className="text-sm text-gray-600">DOM Ready</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{performanceData.vitals.loadComplete}ms</div>
            <div className="text-sm text-gray-600">Load Complete</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Database className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {performanceData.vitals.memoryUsage?.used || 'N/A'}MB
            </div>
            <div className="text-sm text-gray-600">Mémoire utilisée</div>
          </CardContent>
        </Card>
      </div>

      {performanceData.slowOperations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Opérations lentes détectées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {performanceData.slowOperations.slice(0, 5).map((op: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <span className="font-medium">{op.name}</span>
                    <div className="text-sm text-gray-600">
                      {new Date(op.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <Badge variant="destructive">{op.value.toFixed(2)}ms</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {performanceData.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommandations d'optimisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {performanceData.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
