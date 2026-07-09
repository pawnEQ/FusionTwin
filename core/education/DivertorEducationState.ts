export interface DivertorEducationState {
    load: number;
    detached: boolean;
}

export function validateDivertorEducationState(
    state: DivertorEducationState
): DivertorEducationState {
    if (
        !Number.isFinite(state.load) ||
        state.load < 0 ||
        state.load > 1
    ) {
        throw new Error(
            "Divertor education state load must be a finite number between 0 and 1"
        );
    }

    if (typeof state.detached !== "boolean") {
        throw new Error(
            "Divertor education state detached must be a boolean"
        );
    }

    return state;
}
