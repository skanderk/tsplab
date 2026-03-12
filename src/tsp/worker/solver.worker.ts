/*
 * Author: Skander Kort
 * Created: 2026-02-27 07:34:26
 * Modified: 2026-03-12 15:23:05
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { SolverWorkerRuntime} from "./solver-worker-runtime";

import type { WorkerCommand } from "../protocol/commands";
import type { WorkerEvent } from "../protocol/events";

const workerRuntime = new SolverWorkerRuntime((event: WorkerEvent) => self.postMessage(event));

self.onmessage = async (event: MessageEvent<WorkerCommand>): Promise<void> => {
    await workerRuntime.handleCommand(event.data);
};
