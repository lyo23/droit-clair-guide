import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Download, 
  Eye, 
  Share2, 
  BookOpen, 
  Filter,
  Save,
  Star,
  Calendar,
  User,
  CheckCircle,
  Building2,
  Users,
  TrendingUp,
  BarChart3,
  Award,
  MapPin,
  MessageSquare,
  UserPlus,
  Activity,
  Clock,
  ThumbsUp,
  FileText
} from 'lucide-react';

interface ProcedureCatalogTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddProcedure: () => void;
}

export function ProcedureCatalogTab({ searchTerm, setSearchTerm, onAddProcedure }: ProcedureCatalogTabProps) {
  return (
    <div className="space-y-6">
      {/* Tableau de bord */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <BarChart3 className="w-5 h-5" />
            Tableau de bord - Procédures administratives
          </CardTitle>
          <CardDescription>
            Vue d'ensemble de la collection de procédures administratives algériennes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-emerald-600">1,456</div>
              <div className="text-sm text-gray-600">Procédures administratives</div>
              <div className="text-xs text-gray-500 mt-1">Total disponible</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">89</div>
              <div className="text-sm text-gray-600">Institutions</div>
              <div className="text-xs text-gray-500 mt-1">Couvertes</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600">567</div>
              <div className="text-sm text-gray-600">Procédures numérisées</div>
              <div className="text-xs text-gray-500 mt-1">Disponibles en ligne</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-orange-600">92%</div>
              <div className="text-sm text-gray-600">Procédures à jour</div>
              <div className="text-xs text-gray-500 mt-1">Dernière mise à jour</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reste du contenu existant */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher dans le catalogue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700" 
            size="sm" 
            onClick={onAddProcedure}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une procédure
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Demande de Passeport Biométrique",
            institution: "Ministère de l'Intérieur",
            category: "Citoyenneté",
            status: "en_ligne",
            badges: ["Numérisée", "Simplifiée"],
            averageTime: "15 jours",
            cost: "Gratuit",
            views: 12345,
            downloads: 2345,
            color: "bg-blue-100 text-blue-800"
          },
          {
            title: "Inscription au Registre du Commerce",
            institution: "CNRC",
            category: "Entreprise",
            status: "en_cours",
            badges: ["Payante", "Délais courts"],
            averageTime: "7 jours",
            cost: "5000 DA",
            views: 8765,
            downloads: 1567,
            color: "bg-green-100 text-green-800"
          },
          {
            title: "Demande de Permis de Construire",
            institution: "APC",
            category: "Urbanisme",
            status: "en_ligne",
            badges: ["Complexe", "Plusieurs étapes"],
            averageTime: "30 jours",
            cost: "Variable",
            views: 5678,
            downloads: 987,
            color: "bg-purple-100 text-purple-800"
          },
          {
            title: "Déclaration de Naissance",
            institution: "État Civil",
            category: "Citoyenneté",
            status: "en_ligne",
            badges: ["Gratuit", "Obligatoire"],
            averageTime: "Immédiat",
            cost: "Gratuit",
            views: 9876,
            downloads: 1876,
            color: "bg-orange-100 text-orange-800"
          },
          {
            title: "Demande de Carte Grise",
            institution: "Ministère des Transports",
            category: "Véhicules",
            status: "en_ligne",
            badges: ["Payante", "Numérisée"],
            averageTime: "10 jours",
            cost: "2000 DA",
            views: 7654,
            downloads: 1345,
            color: "bg-teal-100 text-teal-800"
          },
          {
            title: "Affiliation à la Sécurité Sociale",
            institution: "CNAS",
            category: "Social",
            status: "en_ligne",
            badges: ["Obligatoire", "Employeurs"],
            averageTime: "15 jours",
            cost: "Variable",
            views: 6543,
            downloads: 1123,
            color: "bg-yellow-100 text-yellow-800"
          },
          {
            title: "Demande de Logement Social",
            institution: "Wilaya",
            category: "Logement",
            status: "en_attente",
            badges: ["Long délais", "Conditions"],
            averageTime: "Variable",
            cost: "Gratuit",
            views: 4567,
            downloads: 789,
            color: "bg-indigo-100 text-indigo-800"
          },
          {
            title: "Inscription à l'Université",
            institution: "Ministère de l'Enseignement Supérieur",
            category: "Éducation",
            status: "en_ligne",
            badges: ["Numérisée", "Conditions d'accès"],
            averageTime: "7 jours",
            cost: "Gratuit",
            views: 5432,
            downloads: 890,
            color: "bg-emerald-100 text-emerald-800"
          },
          {
            title: "Demande d'extrait de Casier Judiciaire",
            institution: "Ministère de la Justice",
            category: "Justice",
            status: "en_ligne",
            badges: ["Numérisée", "Payante"],
            averageTime: "5 jours",
            cost: "500 DA",
            views: 3456,
            downloads: 567,
            color: "bg-red-100 text-red-800"
          }
        ].map((procedure, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow border-emerald-200">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <Badge variant="secondary" className={`${procedure.color}`}>{procedure.category}</Badge>
              </div>
              <CardTitle className="text-lg">{procedure.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-sm text-gray-500">
                <Building2 className="w-4 h-4" />
                {procedure.institution}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">Procédure administrative officielle en Algérie.</p>
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-1">
                  {procedure.badges.map((badge, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{badge}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  Voir
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Télécharger
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-1" />
                  Partager
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                {procedure.views} vues • {procedure.downloads} téléchargements
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
