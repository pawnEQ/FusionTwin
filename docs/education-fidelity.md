# FusionTwin Education Fidelity Ladder

## Purpose

FusionTwin is education-first. Reactor subsystems should be understandable at multiple depths without forcing an entry-level learner to begin with research-grade plasma physics.

The same subsystem may therefore have multiple fidelity levels. Higher levels should deepen the model rather than invalidate the educational idea taught at lower levels.

## Fidelity Levels

### Explore

Goal: communicate the subsystem's purpose in one clear idea.

The learner should be able to identify the component, isolate it visually, and understand why it exists.

For the divertor:

> The divertor is the tokamak's exhaust system. It gives escaping heat and particles a controlled destination.

Explore experiences should avoid unnecessary variables, units, and specialist terminology.

### Learn

Goal: introduce cause and effect through interaction.

The learner should be able to change a small number of educational state variables and see a meaningful visual response.

For the divertor, the first planned lesson uses two explicit educational abstractions:

- `load`: a normalized value from `0.0` to `1.0` representing increasing divertor load for teaching purposes.
- `detached`: a boolean teaching state used to compare concentrated target heating with a simplified radiative cooling region before the targets.

These values are not sensor measurements and must not be presented with invented physical units.

The first planned lesson states are:

- `NORMAL`
- `HIGH_LOAD`
- `DETACHED`

The intended lesson is that exhaust power concentrated at the targets creates a severe material challenge, while detachment can dissipate energy before it reaches the target surfaces.

### Advanced

Goal: introduce physically meaningful geometry and plasma-edge concepts.

Planned divertor concepts include:

- X-point
- separatrix and open-field-line region
- inner and outer divertor legs
- inner and outer targets
- strike points
- impurity seeding
- radiation-front or detachment-front position
- target orientation and magnetic incidence geometry when supported by a defensible field or equilibrium model

A likely future abstraction is to define state relative to a divertor leg rather than as an arbitrary world-space coordinate. For example, a normalized coordinate could represent position from the target end of a leg toward the X-point region.

This normalized coordinate would be a FusionTwin modeling abstraction. It must not be presented as a universal coordinate used by fusion research codes.

### Research

Goal: ingest or compare physically grounded time-series data and investigate evolving reactor trajectories.

Possible future divertor work includes:

- target heat flux
- target electron temperature
- radiated power fraction
- impurity concentration
- neutral pressure
- radiation-front position and velocity
- detachment-front position and velocity
- external simulation data
- trajectory detection across multiple related state variables

Research mode may eventually integrate data produced by established plasma-edge or divertor simulation tools. FusionTwin should not pretend to replace those solvers.

## Divertor Design Decision

The current Sprint #5 implementation remains focused on the Learn level.

The existing JSON-defined inner and outer targets are sufficient hardware boundaries for the first educational lesson. The next implementation should add a simple educational divertor state and visualize three deterministic lesson states: normal operation, high target load, and detached operation.

The Advanced topology model is intentionally deferred.

Do not add arbitrary target angles, X-point coordinates, strike-point positions, or other precise-looking geometry solely to improve the appearance of the reactor. Those values should enter the model only when FusionTwin has a defensible reason to represent them.

## Architectural Principle

Educational state and physical state are related, but they are not interchangeable.

A normalized teaching variable such as `load` should remain explicitly educational. A future research model may derive a similar visual state from target heat flux and other physical variables, but the educational abstraction should not silently masquerade as measured reactor data.

The renderer should preserve this distinction. Physical component geometry describes what reactor hardware exists. Educational overlays communicate the lesson state. Future research visualization may consume physically grounded state through a separate contract.

## Current Divertor Roadmap

1. Preserve the current JSON-defined divertor target hardware.
2. Add the Learn-level educational divertor state contract.
3. Define deterministic `NORMAL`, `HIGH_LOAD`, and `DETACHED` lesson states.
4. Visualize target heating as an educational overlay rather than changing hardware geometry.
5. Visualize a simplified radiative region for the detached state.
6. Add a small lesson UI that changes reactor state and explanation together.
7. Verify that a learner can understand the lesson without a verbal explanation from the developers.
8. Evaluate whether the lesson interaction pattern should become a reusable FusionTwin education framework.

## Deferred Advanced Divertor Roadmap

When FusionTwin returns to a higher-fidelity divertor model, begin by designing a topology contract around:

- one or more X-points
- inner and outer divertor legs
- target references
- strike-point definitions
- a physically meaningful coordinate along each leg

Only after that geometry exists should FusionTwin model front position, front motion, or trajectory detection relative to the divertor topology.

The deeper design work is preserved here so that simplifying the first educational release does not erase the path toward advanced and research use cases.
