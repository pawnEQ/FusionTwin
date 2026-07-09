import {
    DivertorEducationState,
    validateDivertorEducationState
} from "./DivertorEducationState";

export const NORMAL_DIVERTOR_STATE: DivertorEducationState =
    validateDivertorEducationState({
        load: 0.35,
        detached: false
    });

export const HIGH_LOAD_DIVERTOR_STATE: DivertorEducationState =
    validateDivertorEducationState({
        load: 0.9,
        detached: false
    });

export const DETACHED_DIVERTOR_STATE: DivertorEducationState =
    validateDivertorEducationState({
        load: 0.9,
        detached: true
    });
