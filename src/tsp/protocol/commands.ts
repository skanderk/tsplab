/*
 * Author: Skander Kort
 * Created: 2026-03-12 10:09:32
 * Modified: 2026-03-12 10:10:26
 * 
 * Licensed under the Apache License, Version 2.0
 */


// Worker Commands
export type LoadInstanceCommand = {
    kind: "load-instance";
    payload: {
        instanceName: string;
    };
};

export type StartCommand = {
    kind: "start"
};

export type StopCommand = {
    kind: "stop";
};

export type PauseCommand = {
    kind: "pause";
};

export type ResumeCommand = {
    kind: "resume";
};

export type WorkerCommand = LoadInstanceCommand | StartCommand | StopCommand | PauseCommand | ResumeCommand;
