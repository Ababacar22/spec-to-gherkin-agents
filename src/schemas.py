from pydantic import BaseModel, Field


class Exigence(BaseModel):
    id: str = Field(description="Identifiant stable, ex. 'EXG-001'")
    description: str = Field(description="Exigence reformulée en une phrase claire")
