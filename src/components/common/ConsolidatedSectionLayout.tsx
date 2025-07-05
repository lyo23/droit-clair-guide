
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Eye } from "lucide-react";

interface ConsolidatedSectionLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconColor: string;
  searchPlaceholder: string;
  items: Array<{
    id: number;
    title: string;
    type: string;
    category: string;
    lastUpdate: string;
    status: string;
    metrics: Array<{ label: string; value: string | number; color: string }>;
    actions?: Array<{ label: string; icon: ReactNode; variant?: "default" | "outline" }>;
  }>;
  statistics: Array<{ value: string; label: string; color: string }>;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onItemAction?: (itemId: number, action: string) => void;
}

export function ConsolidatedSectionLayout({
  title,
  description,
  icon,
  iconColor,
  searchPlaceholder,
  items,
  statistics,
  onSearch,
  onFilter,
  onItemAction
}: ConsolidatedSectionLayoutProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "à jour":
      case "validée":
      case "optimal":
      case "sécurisé":
      case "actif":
        return "bg-green-100 text-green-800";
      case "en cours":
      case "en révision":
      case "surveillé":
        return "bg-yellow-100 text-yellow-800";
      case "obsolète":
      case "critique":
      case "bloqué":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "code":
        return "bg-blue-100 text-blue-800";
      case "loi":
        return "bg-purple-100 text-purple-800";
      case "décret":
        return "bg-orange-100 text-orange-800";
      case "procédure":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <div className={iconColor}>{icon}</div>
          {title}
        </h2>
        <p className="text-gray-600 text-lg max-w-4xl mx-auto">
          {description}
        </p>
      </div>

      {/* Barre de recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-10"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button variant="outline" onClick={onFilter}>
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des éléments */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    {item.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                    <Badge variant="outline">
                      {item.category}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {item.lastUpdate}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {item.metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Dernière mise à jour: {item.lastUpdate}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onItemAction?.(item.id, 'view')}>
                    <Eye className="w-4 h-4 mr-1" />
                    Consulter
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onItemAction?.(item.id, 'download')}>
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </Button>
                  {item.actions?.map((action, index) => (
                    <Button 
                      key={index}
                      size="sm" 
                      variant={action.variant || "default"}
                      className={action.variant === "default" ? "bg-teal-600 hover:bg-teal-700" : ""}
                      onClick={() => onItemAction?.(item.id, action.label.toLowerCase())}
                    >
                      {action.icon}
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statistics.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
