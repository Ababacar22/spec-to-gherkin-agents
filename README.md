# spec-to-gherkin-agents

Pipeline multi-agents qui transforme un cahier des charges fonctionnel (texte libre) en
scénarios de test Gherkin, avec suivi de couverture.

## Agents

- **Analyste** : extrait les exigences individuelles du cahier des charges.
- **Testeur** : génère des scénarios Gherkin pour chaque exigence.
- **Vérificateur** : calcule le taux de couverture et renvoie les exigences non couvertes
  au Testeur si besoin (boucle de correction).

## Statut

Projet en cours de construction, étape par étape (voir historique des commits).
