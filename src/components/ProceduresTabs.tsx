import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Filter, 
  Building,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
  BarChart3,
  Upload,
  Database,
  Wand2,
  FileText,
  Calendar,
  User,
  Star,
  MessageSquare,
  Activity,
  ThumbsUp,
  UserPlus,
  Eye,
  Download,
  Share2,
  Save,
  Bot,
  MapPin,
  GitCompare,
  History,
  Bookmark,
  Layers,
  HardDrive
} from 'lucide-react';
import { ProcedureHistoryTab } from './procedures/ProcedureHistoryTab';
import { ProceduresPendingApprovalTab } from './procedures/ProceduresPendingApprovalTab';
import { ProcedureCatalogTab } from './procedures/ProcedureCatalogTab';
import { ProcedureResourcesSection } from './ProcedureResourcesSection';
import { ProcedureComparisonSection } from './ProcedureComparisonSection';
import { ProcedureSearchSection } from './ProcedureSearchSection';

interface ProceduresTabsProps {
  section: string;
  onAddProcedure?: () => void;
  onOpenApprovalQueue?: () => void;
}

export function ProceduresTabs({ section, onAddProcedure, onOpenApprovalQueue }: ProceduresTabsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [activeSearchTab, setActiveSearchTab] = useState('basic');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddClick = () => {
    console.log('Bouton vert cliqué - Redirection vers le formulaire');
    if (onAddProcedure) {
      onAddProcedure();
    } else {
      console.error('onAddProcedure function not provided');
    }
  };

  const renderCatalogTab = () => (
    <ProcedureCatalogTab 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onAddProcedure={handleAddClick}
    />
  );

  const renderTimelineTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Timeline des procédures administratives
          </CardTitle>
          <CardDescription>
            Évolution chronologique des procédures administratives algériennes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Timeline visualization */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {[
                {
                  date: "2024",
                  title: "Digitalisation des procédures",
                  description: "Lancement du programme de numérisation des procédures administratives",
                  status: "En cours",
                  color: "bg-blue-500"
                },
                {
                  date: "2023",
                  title: "Simplification administrative",
                  description: "Réduction du nombre d'étapes pour 150+ procédures",
                  status: "Terminé",
                  color: "bg-green-500"
                },
                {
                  date: "2022",
                  title: "Harmonisation des formulaires",
                  description: "Standardisation des formulaires officiels",
                  status: "Terminé",
                  color: "bg-green-500"
                },
                {
                  date: "2021",
                  title: "Base de données unifiée",
                  description: "Création de la base de données centralisée des procédures",
                  status: "Terminé",
                  color: "bg-green-500"
                }
              ].map((item, index) => (
                <div key={index} className="relative flex items-start space-x-4 pb-8">
                  <div className={`flex-shrink-0 w-8 h-8 ${item.color} rounded-full flex items-center justify-center relative z-10`}>
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                      <Badge variant={item.status === 'Terminé' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-2xl font-bold text-blue-600">+45%</div>
                  <div className="text-sm text-gray-600">Amélioration efficacité</div>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-green-600">287</div>
                  <div className="text-sm text-gray-600">Procédures modernisées</div>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <div className="text-2xl font-bold text-purple-600">1.2M</div>
                  <div className="text-sm text-gray-600">Citoyens bénéficiaires</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderComparisonTab = () => (
    <div className="space-y-6">
      <ProcedureComparisonSection />
    </div>
  );

  const renderSearchTab = () => (
    <div className="space-y-6">
      <ProcedureSearchSection />
    </div>
  );

  const renderResourcesTab = () => (
    <div className="space-y-6">
      <ProcedureResourcesSection />
    </div>
  );

  const renderEnrichmentTab = () => (
    <div className="space-y-6">
      {/* Actions principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleAddClick}>
          <CardHeader className="text-center">
            <Plus className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
            <CardTitle>Ajouter une procédure</CardTitle>
            <CardDescription>
              Saisir manuellement une nouvelle procédure administrative
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle procédure
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <CardTitle>Import en lot</CardTitle>
            <CardDescription>
              Importer plusieurs procédures depuis un fichier Excel/CSV
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV/Excel
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Wand2 className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <CardTitle>Auto-remplissage intelligent</CardTitle>
            <CardDescription>
              Remplissage automatique avec IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Wand2 className="w-4 h-4 mr-2" />
              Auto-remplissage
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Database className="w-12 h-12 mx-auto text-orange-600 mb-4" />
            <CardTitle>Extraction automatique</CardTitle>
            <CardDescription>
              Importer et traiter automatiquement des procédures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              <Database className="w-4 h-4 mr-2" />
              Extraction auto
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const getTabsConfig = () => {
    switch (section) {
      case 'procedures-catalog':
        return {
          defaultValue: 'catalogue',
          tabs: [
            { value: 'catalogue', label: 'Catalogue', content: renderCatalogTab() },
            { value: 'timeline', label: 'Timeline des procédures', content: renderTimelineTab() },
            { value: 'comparaison', label: 'Comparaison des procédures', content: renderComparisonTab() },
            { value: 'historiques', label: 'Historiques des versions', content: <ProcedureHistoryTab /> }
          ]
        };
      case 'procedures-enrichment':
        return {
          defaultValue: 'enrichment',
          tabs: [
            { value: 'enrichment', label: 'Alimentation', content: renderEnrichmentTab() },
            { value: 'pending-approval', label: 'Procédures administratives en attente de publication', content: <ProceduresPendingApprovalTab /> }
          ]
        };
      case 'procedures-search':
        return {
          defaultValue: 'search',
          tabs: [
            { value: 'search', label: 'Recherche', content: renderSearchTab() }
          ]
        };
      case 'procedures-resources':
        return {
          defaultValue: 'resources',
          tabs: [
            { value: 'resources', label: 'Ressources', content: renderResourcesTab() }
          ]
        };
      default:
        return {
          defaultValue: 'catalogue',
          tabs: [
            { value: 'catalogue', label: 'Catalogue', content: renderCatalogTab() }
          ]
        };
    }
  };

  const tabsConfig = getTabsConfig();


  return (
    <div className="space-y-6">
      <Tabs defaultValue={tabsConfig.defaultValue} className="w-full">
        <TabsList className={`grid w-full ${tabsConfig.tabs.length === 1 ? 'grid-cols-1' : 
          tabsConfig.tabs.length === 2 ? 'grid-cols-2' : 
          tabsConfig.tabs.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {tabsConfig.tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabsConfig.tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
