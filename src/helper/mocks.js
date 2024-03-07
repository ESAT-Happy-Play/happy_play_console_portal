export const companyGames = [
    {
        gameName: "Regular",
        child: [
            {
                subGameName: "Regular"
            },
            {
                subGameName: "Power Win"
            },
            {
                subGameName: "Triple Win"
            },
            {
                subGameName: "Magic Win"
            },
        ]
    },
    {
        gameName: "Jackpot 3.3"
    },
    {
        gameName: "Jackpot 3.4"
    },
];

export const drawTypeList = [
    {
        gameTypeId: 0,
        name: "1 PM"
    },
    {
        gameTypeId: 1,
        name: "2 PM"
    },
    {
        gameTypeId: 2,
        name: "3 PM"
    },
    {
        gameTypeId: 3,
        name: "4 PM"
    },
    {
        gameTypeId: 4,
        name: "5 PM"
    },
    {
        gameTypeId: 5,
        name: "6 PM"
    },
    {
        gameTypeId: 6,
        name: "7 PM"
    },
    {
        gameTypeId: 7,
        name: "8 PM"
    },
    {
        gameTypeId: 8,
        name: "9 PM"
    },
    {
        gameTypeId: 9,
        name: "10 PM"
    },
    {
        gameTypeId: 10,
        name: "11 PM"
    }
];

export const mechanicsSettings = [
    {
        gameName: "Regular",
        child: [
            {
                subTypeName: "Regular",
                betEntryLimit: 5,
                betAmountLimit: 10000,
                uniqueCombination: 70,
                betPriceLimit: 2000,
                winningMultiplier: 700,
                haveQuasi: true
            },
            {
                subTypeName: "Power Win",
                betEntryLimit: 4,
                betAmountLimit: 15000,
                betPrice: 10,
                uniqueCombination: 75,
                incrementAmount: 10,
                consecutiveWins: 3,
                prizeFloor: 1500000,
                prizeCeiling: 25080000,
                winningMultiplier: 700,
                haveQuasi: false
            },
            {
                subTypeName: "Triple Win",
                betEntryLimit: 5,
                betAmountLimit: 15000,
                betPrice: 10,
                uniqueCombination: 68,
                incrementAmount: 11,
                prizeFloor: 1100400,
                prizeCeiling: 12333110,
                haveQuasi: true
            },
            {
                subTypeName: "Magic Win",
                betEntryLimit: 5,
                betAmountLimit: 12000,
                betPrice: 12,
                uniqueCombination: 65,
                incrementAmount: 12,
                prizeFloor: 150000,
                prizeCeiling: 12333110,
                haveQuasi: true
            }
        ]

    },
    {
        gameName: "Jackpot 3.3",
        child: [
            {
                subTypeName: "Jackpot 3.3",
                betEntryLimit: 5,
                betAmountLimit: 12000,
                betPrice: 12,
                uniqueCombination: 65,
                incrementAmount: 12,
                prizeFloor: 150000,
                prizeCeiling: 12333110,
                haveQuasi: true
            }
        ]
    },
    {
        gameName: "Jackpot 3.4",
        child: [
            {
                subTypeName: "Jackpot 3.4",
                betEntryLimit: 5,
                betAmountLimit: 12000,
                betPrice: 12,
                uniqueCombination: 65,
                incrementAmount: 12,
                prizeFloor: 150000,
                prizeCeiling: 12333110,
                haveQuasi: true
            }
        ]
    }
]