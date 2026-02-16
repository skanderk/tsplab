/*
 * Author: Skander Kort
 * Created: 2026-02-16 17:49:55
 * Modified: 2026-02-16 18:49:08
 * 
 * Licensed under the Apache License, Version 2.0
 */

/**
 * TSP instances grouped by instance size. 
 */


// Tiny (≤ 100)
const tspInstancesTiny = [
    "att48",
    "bayg29",
    "bays29",
    "berlin52",
    "brazil58",
    "burma14",
    "dantzig42",
    "eil51",
    "eil76",
    "fri26",
    "gr17",
    "gr21",
    "gr24",
    "gr48",
    "gr96",
    "hk48",
    "kroA100",
    "kroB100",
    "kroC100",
    "kroD100",
    "kroE100",
    "pr76",
    "rat99",
    "rd100",
    "st70",
    "swiss42",
    "ulysses16",
    "ulysses22"
];

// Small (101–300)
const tspInstancesSmall = [
    "a280",
    "bier127",
    "brg180",
    "ch130",
    "ch150",
    "d198",
    "eil101",
    "gil262",
    "gr120",
    "gr137",
    "gr202",
    "gr229",
    "kroA150",
    "kroA200",
    "kroB150",
    "kroB200",
    "lin105",
    "pr107",
    "pr124",
    "pr136",
    "pr144",
    "pr152",
    "pr226",
    "pr264",
    "pr299",
    "rat195",
    "si175",
    "tsp225",
    "ts225",
    "u159"
];

// Medium (301–1,000)
const tspInstancesMedium = [
    "ali535",
    "att532",
    "d493",
    "d657",
    "dsj1000",
    "fl417",
    "gr431",
    "gr666",
    "lin318",
    "linhp318",
    "p654",
    "pa561",
    "pcb442",
    "pr439",
    "rat575",
    "rat783",
    "rd400",
    "si535",
    "u574",
    "u724"
];

// Large (1,001–10,000)
const tspInstancesLarge = [
    "d1291",
    "d1655",
    "fl1400",
    "fl1577",
    "nrw1379",
    "pcb1173",
    "pr1002",
    "rl1304",
    "rl1323",
    "si1032",
    "u1060",
    "u1432",
    "u1817",
    "vm1084",
    "vm1748"
];

// Extra Large (> 10,000) — unsupported in TSPLAB
const tspInstancesXL = [
    "d15112",
    "d18512",
    "pla33810",
    "pla85900"
];

export const tspInstances = {
    "Tiny (< 100)": tspInstancesTiny,
    "Small (101-300)": tspInstancesSmall,
    "Medium (301-1,000)": tspInstancesMedium,
    "Large (1,001-10,000)": tspInstancesLarge
}
