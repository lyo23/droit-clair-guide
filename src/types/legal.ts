interface LegalNews {
  id: string;
  title: string;
  summary: string;
  category: 'droit-social' | 'droit-fiscal' | 'droit-commercial' | 'droit-penal' | 'droit-civil' | 'reglementation';
  date: string;
  source: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  url?: string;
}

interface LegalDocument {
  id: string;
  title: string;
  type: 'loi' | 'decret' | 'arrete' | 'circulaire' | 'jurisprudence' | 'doctrine';
  category: string;
  date: string;
  description: string;
  isFavorite: boolean;
  downloadUrl?: string;
}

interface DashboardStats {
  totalDocuments: number;
  newThisWeek: number;
  favorites: number;
  alerts: number;
}

export interface AdministrativeProcedure {
  id: string;
  title: string;
  category: 'civil' | 'commercial' | 'fiscal' | 'social' | 'urbanisme' | 'environnement';
  description: string;
  institution: string;
  duration: string;
  difficulty: 'facile' | 'moyenne' | 'difficile';
  requiredDocuments: string[];
  steps: ProcedureStep[];
  forms: ProcedureForm[];
  lastUpdate: string;
  tags: string[];
  rating: number;
  completedCount: number;
  cost: string;
}

interface ProcedureStep {
  id: string;
  title: string;
  description: string;
  duration?: string;
  required: boolean;
}

interface ProcedureForm {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  format: 'pdf' | 'doc' | 'xlsx';
}

// Nouvelles interfaces pour les textes juridiques
interface LegalTextType {
  id: string;
  name: string;
  category: 'constitution' | 'accord' | 'loi' | 'ordonnance' | 'decret' | 'arrete' | 
           'circulaire' | 'convention' | 'note' | 'deliberation' | 'declaration' | 
           'bulletin' | 'jurisprudence' | 'cahier' | 'ccag' | 'discours' | 'rapport' | 
           'plan' | 'bareme' | 'proces';
}

interface Sector {
  id: string;
  name: string;
  subSectors?: SubSector[];
}

interface SubSector {
  id: string;
  name: string;
  sectorId: string;
}

interface Institution {
  id: string;
  name: string;
  type: 'ministere' | 'organisme' | 'sous-organisme';
  parentId?: string;
  children?: Institution[];
}

interface LegalTextForm {
  // Champs communs
  journalNumber?: string;
  journalDate?: string;
  pageNumber?: string;
  
  // Constitution
  header?: string;
  preamble?: string;
  title?: string;
  chapter?: string;
  articleNumber?: string;
  oaths?: string;
  
  // Accord/Convention
  referenceNumber?: string;
  creationDate?: string;
  agreementType?: string;
  bilateralType?: 'Bilatérale' | 'Multilatérale';
  signatureDate?: string;
  parties?: string[];
  treatyReference?: string;
  
  // Loi/Code
  textType?: string;
  lawType?: string;
  sector?: string;
  motive?: 'Nouveau' | 'Modifier' | 'Compléter' | 'Abroger' | 'Rectifier';
  oldDecreeReference?: string;
  applicationFramework?: string;
  frameworkNumber?: string;
  
  // Cahier de charge
  projectName?: string;
  stakeholders?: string[];
  documentReference?: string;
  tableOfContents?: string;
  projectContext?: string;
  objectives?: string;
  legalFramework?: string;
  partiesIdentification?: string;
  coordinates?: string;
  mission?: string;
  interventionScope?: string;
  expectedDocuments?: string;
  technicalRequirements?: string;
  methodologicalRequirements?: string;
  duration?: string;
  schedule?: string;
  financialConditions?: string;
  confidentiality?: string;
  clientObligations?: string;
  providerObligations?: string;
  
  // CCAG
  ccagReference?: string;
  ccagDate?: string;
  marketNature?: 'travaux' | 'marchés industriels' | 'prestations intellectuelles' | 'fournitures courantes et prestations de services' | 'techniques de l\'information et de la communication' | 'marchés de maîtrise d\'œuvre';
  applicationScope?: string;
  holderObligations?: string;
  paymentMethods?: string;
  executionDeadlines?: string;
  serviceReception?: string;
  guarantees?: string;
  maintenance?: string;
  termination?: string;
  disputeResolution?: string;
  
  // Discours
  introduction?: string;
  development?: string;
  conclusion?: string;
  
  // Rapport/Guide
  signatoryName?: string;
  generalInformation?: string;
  developmentSections?: string;
  
  // Plan d'action
  context?: string;
  situationAnalysis?: string;
  currentState?: string;
  availableResources?: string;
  actionsToTake?: string;
  roleAssignment?: string;
  planningDefinition?: string;
  budget?: string;
  humanResources?: string;
  materialResources?: string;
  monitoring?: string;
  evaluation?: string;
  
  // Barème/Norme
  instructions?: string;
  evaluationCriteria?: string;
  pointsAwarded?: string;
  comments?: string;
  total?: string;
  
  // Procès-verbal
  meetingTitle?: string;
  dateTime?: string;
  location?: string;
  presentParticipants?: string;
  absentParticipants?: string;
  sessionPresident?: string;
  sessionSecretary?: string;
  agenda?: string;
  meetingProgress?: string;
  variousQuestions?: string;
  decisions?: string;
  meetingClosure?: string;
  
  // Autres champs spécifiques
  subject?: string;
  content?: string;
  institution?: string;
  recipient?: string;
  objective?: string;
  
  // Pièces jointes
  attachments?: FileAttachment[];
}

interface FileAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

// Constantes pour les nomenclatures - Version enrichie
export const SECTORS = [
  'Activités spatiales', 'Administration', 'Affaires religieuses', 'Affaires étrangères',
  'Agriculture et développement rural', 'Agroalimentaire', 'Agronomie', 'Aménagement du territoire',
  'Artisanat', 'Associations', 'Assurances', 'Audiovisuel', 'Aviation civile', 'Banque & Monnaie',
  'Bourse', 'Commerce', 'Commissariat et Expertise', 'Communication', 'Comptabilité',
  'Constitutionnel', 'Contexte local', 'Culture', 'Douanes', 'Droit civil', 'Droit du travail',
  'Droits de l\'Homme', 'Défense nationale', 'Education', 'Energie', 'Environnement', 'Finance',
  'Formation', 'Formation et enseignement professionnels', 'Formes juridiques d\'implantation',
  'HSE (santé, sécurité et environnement)', 'Habitat', 'Hydraulique et eau', 'Hydrocarbures',
  'Immobilier', 'Industrie', 'Information', 'Intérieur', 'Investissement', 'Jeunesse et sport',
  'Judiciaire', 'Justice', 'Justice militaire', 'Législation du travail', 'Marchés Publics',
  'Maritime', 'Mines', 'Normalisation', 'Normes', 'Nucléaire', 'Numérique',
  'Numérisation et statistiques', 'Pharmaceutique', 'Procédure civile et administrative',
  'Protection civile', 'Protocole international', 'Présidence de la république', 'Pénal',
  'Pêche', 'Pêche et des productions halieutiques', 'Recherche scientifique', 'Sanitaire',
  'Santé', 'Santé animale', 'Sciences', 'Services', 'Solidarité Nationale',
  'Système d\'information', 'Système fiscal', 'Système social', 'Sûreté nationale',
  'Technologie', 'Tourisme', 'Transport', 'Travaux publics', 'Télécommunications',
  'Urbanisme', 'Économie', 'Éducation et enseignement supérieur'
];

const LEGAL_TEXT_TYPES = [
  { id: 'constitution', name: 'Constitution', category: 'constitution' },
  { id: 'accord', name: 'Accord International', category: 'accord' },
  { id: 'convention-int', name: 'Convention Internationale', category: 'accord' },
  { id: 'code', name: 'Code', category: 'loi' },
  { id: 'loi-organique', name: 'Loi Organique', category: 'loi' },
  { id: 'loi', name: 'Loi', category: 'loi' },
  { id: 'ordonnance', name: 'Ordonnance', category: 'ordonnance' },
  { id: 'decret-legislatif', name: 'Décret Législatif', category: 'decret' },
  { id: 'decret-presidentiel', name: 'Décret Présidentiel', category: 'decret' },
  { id: 'decret-executif', name: 'Décret Exécutif', category: 'decret' },
  { id: 'arrete', name: 'Arrêté', category: 'arrete' },
  { id: 'arrete-interministeriel', name: 'Arrêté Interministériel', category: 'arrete' },
  { id: 'arrete-ministeriel', name: 'Arrêté Ministériel', category: 'arrete' },
  { id: 'decision', name: 'Décision', category: 'arrete' },
  { id: 'circulaire', name: 'Circulaire', category: 'circulaire' },
  { id: 'circulaire-interministerielle', name: 'Circulaire Interministérielle', category: 'circulaire' },
  { id: 'convention', name: 'Convention', category: 'convention' },
  { id: 'note', name: 'Note', category: 'note' },
  { id: 'deliberation', name: 'Délibération', category: 'deliberation' },
  { id: 'jurisprudence', name: 'Jurisprudence', category: 'jurisprudence' },
  { id: 'cahier-charge', name: 'Cahier de charge', category: 'cahier' },
  { id: 'ccag', name: 'Cahier des clauses administratives générales', category: 'ccag' },
  { id: 'discours', name: 'Discours', category: 'discours' },
  { id: 'rapport', name: 'Rapport', category: 'rapport' },
  { id: 'guide', name: 'Guide', category: 'rapport' },
  { id: 'plan-action', name: 'Plan d\'action', category: 'plan' },
  { id: 'bareme', name: 'Barème', category: 'bareme' },
  { id: 'norme', name: 'Norme', category: 'bareme' },
  { id: 'proces-verbal', name: 'Procès-verbal', category: 'proces' }
];

// Institutions enrichies avec hiérarchie
const INSTITUTIONS = [
  // Présidence et Premier Ministère
  'Présidence de la République',
  'Premier Ministère',
  'Secrétariat Général du Gouvernement',
  
  // Ministères de souveraineté
  'Ministère de la Justice',
  'Ministère de l\'Intérieur et des Collectivités Locales',
  'Ministère des Affaires Étrangères et de la Communauté Nationale à l\'Étranger',
  'Ministère de la Défense Nationale',
  
  // Ministères économiques
  'Ministère des Finances',
  'Ministère du Commerce et de la Promotion des Exportations',
  'Ministère de l\'Industrie et des Mines',
  'Ministère de l\'Énergie',
  'Ministère de l\'Agriculture et du Développement Rural',
  'Ministère des Travaux Publics et des Transports',
  
  // Ministères sociaux
  'Ministère de l\'Éducation Nationale',
  'Ministère de l\'Enseignement Supérieur et de la Recherche Scientifique',
  'Ministère de la Santé et de la Population',
  'Ministère du Travail, de l\'Emploi et de la Sécurité Sociale',
  'Ministère de la Solidarité Nationale et de la Famille',
  'Ministère de la Jeunesse et des Sports',
  
  // Ministères culturels et techniques
  'Ministère de la Culture et des Arts',
  'Ministère de la Communication',
  'Ministère des Affaires Religieuses et des Wakfs',
  'Ministère de l\'Habitat, de l\'Urbanisme et de la Ville',
  'Ministère de l\'Environnement et des Énergies Renouvelables',
  'Ministère du Tourisme et de l\'Artisanat',
  'Ministère de la Formation et de l\'Enseignement Professionnels',
  'Ministère de la Pêche et des Productions Halieutiques',
  'Ministère de la Poste et des Télécommunications',
  'Ministère des Moudjahidine et des Ayants Droit',
  
  // Institutions spécialisées
  'Cour Suprême',
  'Conseil d\'État',
  'Tribunal des Conflits',
  'Cour des Comptes',
  'Conseil Constitutionnel',
  'Haute Cour de Justice',
  
  // Autorités administratives indépendantes
  'Autorité de Régulation de la Poste et des Télécommunications',
  'Commission de Supervision des Assurances',
  'Commission d\'Organisation et de Surveillance des Opérations de Bourse',
  'Conseil National des Droits de l\'Homme',
  'Autorité Nationale de Protection des Données à Caractère Personnel'
];

// Nouveaux secteurs avec sous-secteurs
const SECTORS_WITH_SUBSECTORS = [
  {
    id: 'administration',
    name: 'Administration',
    subSectors: [
      'Administration Centrale',
      'Administration Locale',
      'Fonction Publique',
      'Modernisation Administrative'
    ]
  },
  {
    id: 'justice',
    name: 'Justice',
    subSectors: [
      'Organisation Judiciaire',
      'Procédure Civile',
      'Procédure Pénale',
      'Droit de la Famille'
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    subSectors: [
      'Budget Public',
      'Fiscalité',
      'Douanes',
      'Système Bancaire'
    ]
  },
  {
    id: 'economie',
    name: 'Économie',
    subSectors: [
      'Politique Économique',
      'Commerce Intérieur',
      'Commerce Extérieur',
      'Concurrence'
    ]
  }
];