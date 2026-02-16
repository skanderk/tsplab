/*
 * Author: Skander Kort
 * Created: 2026-02-16 08:21:35
 * Modified: 2026-02-16 08:21:54
 * 
 * Licensed under the Apache License, Version 2.0
 */


/**
 * Interface for solvers and optimizers whose execution can be paused, resumed and stopped. 
 */
export interface Stoppable {
    stop(): void;
    pause(): void;
    resume(): void;
}

export interface StoppableObserver {
    onStarted : () => void;
    onPaused: () => void;
    onResumed: () => void;
    onStopped: () => void;
}
