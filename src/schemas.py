from pydantic import BaseModel, Field, field_validator


class Exigence(BaseModel):
    id: str = Field(description="Identifiant stable, ex. 'EXG-001'")
    description: str = Field(description="Exigence reformulée en une phrase claire")


class ScenarioTest(BaseModel):
    exigence_id: str = Field(description="Référence vers Exigence.id, ex. 'EXG-001'")
    titre: str = Field(description="Titre court du scénario")
    gherkin: str = Field(description="Scénario complet au format Given/When/Then")

    @field_validator("gherkin")
    @classmethod
    def gherkin_non_vide(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("le scénario Gherkin ne peut pas être vide")
        return v
