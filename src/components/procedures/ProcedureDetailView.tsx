
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, FileText, Users, Star, Phone, Mail, Globe, CheckCircle, Download, AlertCircle } from "lucide-react";
import { AdministrativeProcedure } from "@/types/legal";

interface ProcedureDetailViewProps {
  procedure: AdministrativeProcedure;
  onBack: () => void;
}

export function ProcedureDetailView({ procedure, onBack }: ProcedureDetailViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="gap-2 text-emerald-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la liste
        </Button>
      </div>

      {/* Header avec titre et badge */}
      <div className="bg-emerald-600 text-white p-8 rounded-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{procedure.title}</h1>
            <p className="text-emerald-100 text-lg mb-4">{procedure.description}</p>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{procedure.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{procedure.cost}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{procedure.completedCount} complétées</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className="bg-yellow-500 text-yellow-900 px-3 py-1">
              {procedure.difficulty}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{procedure.rating}/5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Étapes de la procédure</h2>
            <div className="space-y-4">
              {procedure.steps.map((step, index) => (
                <div key={step.id} className="flex gap-4 p-4 bg-white rounded-lg border">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    {step.duration && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents requis */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Documents requis</h2>
            <div className="space-y-3">
              {procedure.requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaires à télécharger */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Formulaires à télécharger</h2>
            <div className="space-y-4">
              {procedure.forms.map((form) => (
                <div key={form.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-red-500" />
                    <div>
                      <h4 className="font-semibold">{form.title}</h4>
                      <p className="text-sm text-gray-600">{form.description}</p>
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar avec informations */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Institution responsable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">CNRC - Centre National du Registre de Commerce</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Palais du Gouvernement, Alger</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+213 21 73 80 00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@cnrc.dz</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-emerald-600">www.cnrc.dz</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations pratiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Catégorie</span>
                <p className="font-semibold">Commercial</p>
              </div>
              <Separator />
              <div>
                <span className="text-sm font-medium text-gray-600">Durée moyenne</span>
                <p className="font-semibold">15-30 jours</p>
              </div>
              <Separator />
              <div>
                <span className="text-sm font-medium text-gray-600">Coût</span>
                <p className="font-semibold">50,000 - 100,000 DA</p>
              </div>
              <Separator />
              <div>
                <span className="text-sm font-medium text-gray-600">Difficulté</span>
                <p className="font-semibold">Moyen</p>
              </div>
              <Separator />
              <div>
                <span className="text-sm font-medium text-gray-600">Version</span>
                <p className="font-semibold"># 2.1</p>
              </div>
              <Separator />
              <div>
                <span className="text-sm font-medium text-gray-600">Dernière mise à jour</span>
                <p className="font-semibold">15/12/2024</p>
              </div>
              <Separator />
              <div>
                <span className="text-sm font-medium text-gray-600">Procédures complétées</span>
                <p className="font-semibold">1247</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-orange-800 mb-1">Besoin d'aide ?</h4>
                  <p className="text-sm text-orange-700 mb-3">
                    Notre équipe d'experts peut vous accompagner dans cette procédure.
                  </p>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Contacter un expert
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
