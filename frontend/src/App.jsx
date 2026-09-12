import { useState } from "react";
import { computeCoverage, mockExigences, mockScenarios } from "./mockData";

const PLACEHOLDER_SPEC = `Le système doit permettre à l'utilisateur de se connecter avec email et mot de passe.
L'utilisateur doit pouvoir exporter ses données au format PDF.
Le système doit envoyer une alerte si le paiement échoue.`;

function CoverageBadge({ taux }) {
  const pct = Math.round(taux * 100);
  const color = taux >= 0.8 ? "var(--ok)" : taux >= 0.5 ? "var(--warn)" : "#dc2626";
  return (
    <div className="relative">
      <div
        className="absolute -top-3 -right-3 z-10 flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold text-white shadow-lg"
        style={{ background: color }}
      >
        {pct}%
      </div>
      <div
        className="rounded-2xl border p-5 pr-10"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Taux de couverture
        </p>
        <p className="mt-1 text-2xl font-semibold" style={{ color: "var(--text-h)" }}>
          Exigences couvertes par au moins un scénario
        </p>
      </div>
    </div>
  );
}

function ExigenceCard({ exigence, couverte }) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border p-4"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <span
        className="pill-btn shrink-0 px-2.5 py-1 text-xs font-mono font-medium"
        style={{
          background: couverte ? "color-mix(in srgb, var(--ok) 15%, transparent)" : "color-mix(in srgb, #dc2626 12%, transparent)",
          color: couverte ? "var(--ok)" : "#dc2626",
        }}
      >
        {exigence.id}
      </span>
      <p className="text-sm" style={{ color: "var(--text)" }}>
        {exigence.description}
      </p>
    </div>
  );
}

function ScenarioCard({ scenario }) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="mb-2 flex items-center gap-2">
        <span className="pill-btn px-2.5 py-0.5 text-xs font-mono" style={{ background: "color-mix(in srgb, var(--accent-solid) 15%, transparent)", color: "var(--accent-solid)" }}>
          {scenario.exigence_id}
        </span>
        <h3 className="text-sm font-medium" style={{ color: "var(--text-h)" }}>
          {scenario.titre}
        </h3>
      </div>
      <pre
        className="overflow-x-auto rounded-lg p-3 text-xs leading-relaxed"
        style={{ background: "var(--code-bg)", color: "var(--code-text)" }}
      >
        {scenario.gherkin}
      </pre>
    </div>
  );
}

export default function App() {
  const [spec, setSpec] = useState(PLACEHOLDER_SPEC);
  const [ranOnce, setRanOnce] = useState(false);

  const { taux, nonCouvertes } = computeCoverage(mockExigences, mockScenarios);

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="gradient-title text-4xl font-semibold tracking-tight sm:text-5xl">
          Spec → Gherkin
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
          Cahier des charges en texte libre → exigences extraites → scénarios de test Gherkin, avec suivi de couverture.
        </p>
      </header>

      <section
        className="rounded-2xl border p-5"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <label htmlFor="spec" className="mb-2 block text-sm font-medium" style={{ color: "var(--text-h)" }}>
          Cahier des charges
        </label>
        <textarea
          id="spec"
          value={spec}
          onChange={(e) => setSpec(e.target.value)}
          rows={6}
          className="w-full resize-y rounded-xl border p-3 text-sm outline-none"
          style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
        />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Backend pas encore branché — résultats de démonstration ci-dessous.
          </p>
          <button
            type="button"
            onClick={() => setRanOnce(true)}
            className="pill-btn px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: `linear-gradient(100deg, var(--accent-from), var(--accent-to))` }}
          >
            Analyser
          </button>
        </div>
      </section>

      {ranOnce && (
        <>
          <div className="dashed-sep my-10" />

          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--text-h)" }}>
              Exigences extraites
            </h2>
            <div className="grid gap-3">
              {mockExigences.map((exigence) => (
                <ExigenceCard
                  key={exigence.id}
                  exigence={exigence}
                  couverte={!nonCouvertes.includes(exigence.id)}
                />
              ))}
            </div>
          </section>

          <div className="dashed-sep my-10" />

          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--text-h)" }}>
              Scénarios Gherkin générés
            </h2>
            <div className="grid gap-3">
              {mockScenarios.map((scenario) => (
                <ScenarioCard key={scenario.exigence_id} scenario={scenario} />
              ))}
            </div>
          </section>

          <div className="dashed-sep my-10" />

          <section>
            <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--text-h)" }}>
              Vérification
            </h2>
            <CoverageBadge taux={taux} />
            {nonCouvertes.length > 0 && (
              <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
                Non couvertes : {nonCouvertes.join(", ")} — renvoyées à l'agent Testeur.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
