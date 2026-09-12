// Données de démo, en attendant le branchement sur le vrai pipeline d'agents.
// Reflète exactement les schémas Pydantic définis côté backend (src/schemas.py).

export const mockExigences = [
  { id: "EXG-001", description: "L'utilisateur peut se connecter avec email et mot de passe." },
  { id: "EXG-002", description: "L'utilisateur peut exporter ses données au format PDF." },
  { id: "EXG-003", description: "Le système envoie une alerte si le paiement échoue." },
];

export const mockScenarios = [
  {
    exigence_id: "EXG-001",
    titre: "Connexion réussie avec identifiants valides",
    gherkin: `Given un utilisateur enregistré avec l'email "test@exemple.com"
When il saisit son email et son mot de passe corrects
Then il accède à son tableau de bord`,
  },
  {
    exigence_id: "EXG-002",
    titre: "Export PDF des données personnelles",
    gherkin: `Given un utilisateur connecté avec des données existantes
When il clique sur "Exporter en PDF"
Then un fichier PDF contenant ses données est téléchargé`,
  },
];

export function computeCoverage(exigences, scenarios) {
  const idsExigences = new Set(exigences.map((e) => e.id));
  const idsCouverts = new Set(scenarios.map((s) => s.exigence_id));
  const nonCouvertes = [...idsExigences].filter((id) => !idsCouverts.has(id));
  const taux = idsExigences.size === 0 ? 0 : (idsExigences.size - nonCouvertes.length) / idsExigences.size;
  return { taux, nonCouvertes };
}
