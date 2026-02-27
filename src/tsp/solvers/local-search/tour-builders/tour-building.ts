/*
 * Author: Skander Kort
 * Created: 2026-02-16 07:16:41
 * Modified: 2026-02-16 09:38:17
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { TspInstance } from "../../../models/tsp-instance";
import { Tour } from "../../../models/tour";
import type { Nameable } from "../../nameable";

/**
 * Interface for building a TSP tour from a TSP instance.
 */
export interface TourBuilder extends Nameable {
    build(tspInstance: TspInstance): Tour;
}

/**
 * Mapping of tour building algorithm ids to their implementations.
 */
export type TourBuildingAlgorithm = {
    'randomTour': RandomTourBuilder,
    'randomInsertion': RandomInsertionTourBuilder,
    'greedy': GreeddyTourBuilder,
    'savings': SavingsTourBuilder,
    'christofides': ChristofidesTourBuilder
}

/**
 * Stub implementations of TourBuilder for different algorithms.
 */

export class RandomTourBuilder implements TourBuilder {
    name: string = 'Random tour algorithm';

    build(tspInstance: TspInstance): Tour {
        const nodes = Array.from({ length: tspInstance.nodesCount }, (_, idx) => idx);

        for (let i = nodes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nodes[i], nodes[j]] = [nodes[j], nodes[i]];
        }

        return new Tour(nodes);
    }
}

export class SavingsTourBuilder implements TourBuilder {
    name: string = 'Clarke/Wright Savings algorithm';

    build(tspInstance: TspInstance): Tour {
        // TODO Implementation for building a savings tour
        return new Tour([]);
    }
}

export class ChristofidesTourBuilder implements TourBuilder {
    name: string = 'Christofides algorithm';

    build(tspInstance: TspInstance): Tour {
        // TODO Implementation for building a Christofides tour
        return new Tour([]);
    }
}

export class RandomInsertionTourBuilder implements TourBuilder {
    name: string = 'Random Insertion algorithm';

    build(tspInstance: TspInstance): Tour {
        // TODO Implementation for building a random insertion tour
        return new Tour([]);
    }
}

export class GreeddyTourBuilder implements TourBuilder {
    name: string = 'Greedy algorithm';

    public constructor(private readonly candidateSelector: CandidateNodeSelection) {
        // TODO Use candidateSelector in the build process
    }

    build(tspInstance: TspInstance): Tour {
        // TODO Implementation for building a greedy tour
        return new Tour([]);
    }
}


export interface CandidateNodeSelection {
    /**
     * TODO Define signature.
     */
    select(): Node | null;
}

export interface NearestNeighbor extends CandidateNodeSelection {
}

export interface NearestInsertion extends CandidateNodeSelection {

}

export interface FarthestInsertion extends CandidateNodeSelection {
}
