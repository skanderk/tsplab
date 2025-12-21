/*
 * Author: Skander Kort
 * Created: 2025-11-21 03:19:03
 * Modified: 2025-12-15 04:41:46
 * 
 * Licensed under the Apache License, Version 2.0
 */


/**
 * Occurs when a node number is negative.
 */
export class InvalidNodeError extends Error { }

export class EdgeError extends Error { }

export class ArcError extends Error { }

export class CostMatrixError extends Error { }

export class EdgeExchangeError extends Error {}

export class InvalidCostError extends Error {}

export class TourError extends Error {}
