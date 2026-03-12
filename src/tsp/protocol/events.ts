import type { LocalSearchSummary, TspInstanceSummary } from "./dto/events";

export type InstanceLoadedEvent = {
    kind: "instance-loaded";
    payload: TspInstanceSummary;
};

export type SolverStartedEvent = {
    kind: "started";
    payload: LocalSearchSummary;
};

export type SolverPausedEvent = {
    kind: "paused";
    payload: LocalSearchSummary;
};

export type SolverResumedEvent = {
    kind: "resumed";
    payload: LocalSearchSummary;
};

export type SolverStoppedEvent = {
    kind: "stopped";
    payload: LocalSearchSummary;
};

export type InitialTourBuiltEvent = {
    kind: "initial-tour";
    payload: {
        nodesCount: number;
    };
};

export type MoveSelectedEvent = {
    kind: "move-selected";
    payload: {
        moveGain: number;
        operator: string;
        iteration: number;
    };
};

export type SolverCompletedEvent = {
    kind: "completed";
    payload: LocalSearchSummary;
};

export type ErrorEvent = {
    kind: "error";
    payload: {
        message: string;
    };
};

export type WorkerEvent = InstanceLoadedEvent
    | SolverStartedEvent
    | SolverPausedEvent
    | SolverResumedEvent
    | SolverStoppedEvent
    | InitialTourBuiltEvent
    | MoveSelectedEvent
    | SolverCompletedEvent
    | ErrorEvent;
