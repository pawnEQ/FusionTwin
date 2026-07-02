# ADR-0001

## Decision

FusionTwin will remain reactor agnostic.

## Rationale

The simulation engine should operate on reactor definitions rather than reactor-specific code.

## Consequences

Adding new reactor types should primarily involve supplying new definitions rather than modifying the engine.