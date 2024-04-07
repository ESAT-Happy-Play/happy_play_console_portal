export const companyGames = [
  {
    gameName: "Regular",
    child: [
      {
        subTypeName: "Regular",
      },
      {
        subTypeName: "Power Win",
      },
      {
        subTypeName: "Triple Win",
      },
      {
        subTypeName: "Magic Win",
      },
    ],
  },
  {
    gameName: "Jackpot 3.3",
  },
  {
    gameName: "Jackpot 3.4",
  },
];

export const drawTypeList = [
  {
    gameTypeId: 0,
    name: "1 PM",
  },
  {
    gameTypeId: 1,
    name: "2 PM",
  },
  {
    gameTypeId: 2,
    name: "3 PM",
  },
  {
    gameTypeId: 3,
    name: "4 PM",
  },
  {
    gameTypeId: 4,
    name: "5 PM",
  },
  {
    gameTypeId: 5,
    name: "6 PM",
  },
  {
    gameTypeId: 6,
    name: "7 PM",
  },
  {
    gameTypeId: 7,
    name: "8 PM",
  },
  {
    gameTypeId: 8,
    name: "9 PM",
  },
  {
    gameTypeId: 9,
    name: "10 PM",
  },
  {
    gameTypeId: 10,
    name: "11 PM",
  },
];

export const gamePrizes = [
  {
    gameName: "Regular Game",
    child: [
      {
        subTypeName: "Regular",
      },
      {
        subTypeName: "Power Win",
        prizePool: [
          {
            id: 1,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 14:00:00",
          },
          {
            id: 2,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 16:00:00",
          },
          {
            id: 3,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 16:00:00",
          },
        ],
        winners: [
          {
            id: 1,
            referenceId: "09230192",
            amountWon: 1625450.44,
            status: "Unclaimed",
          },
          {
            id: 2,
            referenceId: "123192",
            amountWon: 1625450.44,
            status: "Claimed",
          },
        ],
      },
      {
        subTypeName: "Tripple Win",
        prizePool: [
          {
            id: 3,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 14:00:00",
          },
          {
            id: 4,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 18:00:00",
          },
        ],
        winners: [
          {
            id: 3,
            referenceId: "09230192",
            amountWon: 1625450.44,
            status: "Unclaimed",
          },
          {
            id: 4,
            referenceId: "123192",
            amountWon: 1625450.44,
            status: "Claimed",
          },
        ],
      },
      {
        subTypeName: "Magic Win",
        prizePool: [
          {
            id: 5,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 14:00:00",
          },
          {
            id: 6,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 15:00:00",
          },
        ],
        winners: [
          {
            id: 7,
            referenceId: "09230192",
            amountWon: 1625450.44,
            status: "Unclaimed",
          },
          {
            id: 8,
            referenceId: "123192",
            amountWon: 1625450.44,
            status: "Claimed",
          },
        ],
      },
    ],
  },
  {
    gameName: "Jackpot 3.3",
    child: [
      {
        prizePool: [
          {
            id: 9,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 14:00:00",
          },
          {
            id: 10,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 15:00:00",
          },
        ],
        winners: [
          {
            id: 9,
            referenceId: "09230192",
            amountWon: 1625450.44,
            status: "Unclaimed",
          },
          {
            id: 10,
            referenceId: "123192",
            amountWon: 1625450.44,
            status: "Claimed",
          },
        ],
      },
    ],
  },
  {
    gameName: "Jackpot 3.4",
    child: [
      {
        prizePool: [
          {
            id: 11,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 14:00:00",
          },
          {
            id: 12,
            prizeAmount: 3250900.88,
            date: "May 08, 2023 15:00:00",
          },
        ],
        winners: [
          {
            id: 11,
            referenceId: "09230192",
            amountWon: 1625450.44,
            status: "Unclaimed",
          },
          {
            id: 12,
            referenceId: "123192",
            amountWon: 1625450.44,
            status: "Claimed",
          },
        ],
      },
    ],
  },
];

export const regularData = {
  data: [
    {
      id: 1,
      displayName: "Display Name1",
      transactionNumber: "#TransactionID 1",
      combination: "3-4-4",
      amount: 25.0,
      gameTime: "11PM",
      date: "May 08, 2023 15:00:00",
    },
    {
      id: 2,
      displayName: "Display Name2",
      transactionNumber: "#TransactionID 2",
      combination: "3-4-4",
      amount: 25.0,
      gameTime: "11PM",
      date: "May 08, 2023 15:00:00",
    },
    {
      id: 3,
      displayName: "Display Name3",
      transactionNumber: "#TransactionID 3",
      combination: "3-4-4",
      amount: 25.0,
      gameTime: "11PM",
      date: "May 08, 2023 15:00:00",
    },
    {
      id: 4,
      displayName: "Display Name 4",
      transactionNumber: "#TransactionID 4",
      combination: "3-4-4",
      amount: 25.0,
      gameTime: "11PM",
      date: "May 08, 2023 15:00:00",
    },
    {
      id: 5,
      displayName: "Display Name 5",
      transactionNumber: "#TransactionID 5",
      combination: "3-4-4",
      amount: 25.0,
      gameTime: "11PM",
      date: "May 08, 2023 15:00:00",
    },
    {
      id: 6,
      displayName: "Display Name 6",
      transactionNumber: "#TransactionID 6",
      combination: "3-4-4",
      amount: 25.0,
      gameTime: "11PM",
      date: "May 08, 2023 15:00:00",
    },
  ],
  pageInfo: {
    total: 6,
    pageNumber: 0,
    pageSize: 5,
  },
};

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
        haveQuasi: true,
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
        haveQuasi: false,
      },
      {
        subTypeName: "Tripple Win",
        betEntryLimit: 5,
        betAmountLimit: 15000,
        betPrice: 10,
        uniqueCombination: 68,
        incrementAmount: 11,
        prizeFloor: 1100400,
        prizeCeiling: 12333110,
        haveQuasi: true,
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
        haveQuasi: true,
      },
    ],
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
        haveQuasi: true,
      },
    ],
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
        haveQuasi: true,
      },
    ],
  },
];

export const mockLimitCombination = [
  {
    id: 1,
    combination: "3-9-4",
    limit: 520,
    current: 120,
  },
  {
    id: 2,
    combination: "3-6-4",
    limit: 500,
    current: 290,
  },
  {
    id: 3,
    combination: "1-2-4",
    limit: 520,
    current: 500,
  },
  {
    id: 4,
    combination: "2-1-4",
    limit: 520,
    current: 314,
  },
  {
    id: 5,
    combination: "2-4-7",
    limit: 500,
    current: 500,
  },
  {
    id: 6,
    combination: "9-7-6",
    limit: 500,
    current: 100,
  },
  {
    id: 7,
    combination: "2-7-4",
    limit: 520,
    current: 520,
  },
  {
    id: 8,
    combination: "2-4-7",
    limit: 500,
    current: 500,
  },
  {
    id: 9,
    combination: "9-1-6",
    limit: 500,
    current: 100,
  },
];

export const mockBetsHistory = [
  {
    gameName: "Regular Game",
    child: [
      {
        subTypeName: "Regular",
        data: [
          {
            id: 1,
            displayName: "Display Name1",
            transactionNumber: "#TransactionID 1",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 2,
            displayName: "Display Name2",
            transactionNumber: "#TransactionID 2",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 3,
            displayName: "Display Name3",
            transactionNumber: "#TransactionID 3",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 4,
            displayName: "Display Name 4",
            transactionNumber: "#TransactionID 4",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 5,
            displayName: "Display Name 5",
            transactionNumber: "#TransactionID 5",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 6,
            displayName: "Display Name 6",
            transactionNumber: "#TransactionID 6",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
        ],
      },
      {
        subTypeName: "Power Win",
        data: [
          {
            id: 1,
            displayName: "Display Name1",
            transactionNumber: "#TransactionID 1",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 2,
            displayName: "Display Name2",
            transactionNumber: "#TransactionID 2",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 3,
            displayName: "Display Name3",
            transactionNumber: "#TransactionID 3",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 4,
            displayName: "Display Name 4",
            transactionNumber: "#TransactionID 4",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 5,
            displayName: "Display Name 5",
            transactionNumber: "#TransactionID 5",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 6,
            displayName: "Display Name 6",
            transactionNumber: "#TransactionID 6",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
        ],
      },
      {
        subTypeName: "Tripple Win",
        data: [
          {
            id: 1,
            displayName: "Display Name1",
            transactionNumber: "#TransactionID 1",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 2,
            displayName: "Display Name2",
            transactionNumber: "#TransactionID 2",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 3,
            displayName: "Display Name3",
            transactionNumber: "#TransactionID 3",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 4,
            displayName: "Display Name 4",
            transactionNumber: "#TransactionID 4",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 5,
            displayName: "Display Name 5",
            transactionNumber: "#TransactionID 5",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 6,
            displayName: "Display Name 6",
            transactionNumber: "#TransactionID 6",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
        ],
      },
      {
        subTypeName: "Magic Win",
        data: [
          {
            id: 1,
            displayName: "Display Name1",
            transactionNumber: "#TransactionID 1",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 2,
            displayName: "Display Name2",
            transactionNumber: "#TransactionID 2",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 3,
            displayName: "Display Name3",
            transactionNumber: "#TransactionID 3",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 4,
            displayName: "Display Name 4",
            transactionNumber: "#TransactionID 4",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 5,
            displayName: "Display Name 5",
            transactionNumber: "#TransactionID 5",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
          {
            id: 6,
            displayName: "Display Name 6",
            transactionNumber: "#TransactionID 6",
            combination: "3-4-4",
            amount: 25.0,
            gameTime: "11PM",
            date: "May 08, 2023 15:00:00",
          },
        ],
      },
    ],
  },
  {
    gameName: "Jackpot 3.3",
    data: [
      {
        id: 1,
        displayName: "Display Name1",
        transactionNumber: "#TransactionID 1",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
      {
        id: 2,
        displayName: "Display Name2",
        transactionNumber: "#TransactionID 2",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
      {
        id: 3,
        displayName: "Display Name3",
        transactionNumber: "#TransactionID 3",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
      {
        id: 4,
        displayName: "Display Name 4",
        transactionNumber: "#TransactionID 4",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
      {
        id: 5,
        displayName: "Display Name 5",
        transactionNumber: "#TransactionID 5",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
      {
        id: 6,
        displayName: "Display Name 6",
        transactionNumber: "#TransactionID 6",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
    ],
  },
  {
    gameName: "Jackpot 3.4",
    data: [
      {
        id: 1,
        displayName: "Display Name1",
        transactionNumber: "#TransactionID 1",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
      {
        id: 2,
        displayName: "Display Name2",
        transactionNumber: "#TransactionID 2",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
      {
        id: 3,
        displayName: "Display Name3",
        transactionNumber: "#TransactionID 3",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
      {
        id: 4,
        displayName: "Display Name 4",
        transactionNumber: "#TransactionID 4",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
      {
        id: 5,
        displayName: "Display Name 5",
        transactionNumber: "#TransactionID 5",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
      {
        id: 6,
        displayName: "Display Name 6",
        transactionNumber: "#TransactionID 6",
        combination: "3-4-4",
        amount: 25.0,
        gameTime: "11PM",
        date: "May 08, 2023 15:00:00",
      },
    ],
  },
];

export const storeSettings = [
  {
    gameName: "Regular",
    storeLimits: {
      maxUnitsPrice: 1000,
      maxUnitsRegular: 20,
      maxUnitsPowerWin: 20,
      maxFavorites: 25,
      hotCombinationsRange: 10,
      hotCombinationsRefreshUnits: 10,
    },
    deckLimits: {
      deckOpenTime: 10,
      maxDeckUnits: 25,
    },
  },
  {
    gameName: "Jackpot 3.3",
    storeLimits: {
      maxUnitsPrice: 1200,
      maxUnits: 10,
      maxFavorites: 20,
      hotCombinationsRange: 15,
      hotCombinationsRefreshUnits: 10,
    },
    deckLimits: {
      deckOpenTime: 5,
      maxDeckUnits: 25,
    },
  },
  {
    gameName: "Jackpot 3.4",
    storeLimits: {
      maxUnitsPrice: 1500,
      maxUnits: 15,
      maxFavorites: 25,
      hotCombinationsRange: 12,
      hotCombinationsRefreshUnits: 10,
    },
    deckLimits: {
      deckOpenTime: 5,
      maxDeckUnits: 25,
    },
  },
];

export const mockSupportUsersList = [
  {
    name: "Full Name",
    type: "Ticket",
    status: "Active",
    registrationDate: "January 14, 2024",
  },
  {
    name: "Full Name",
    type: "Ticket",
    status: "Inactive",
    registrationDate: "January 14, 2024",
  },
  {
    name: "Full Name",
    type: "Ticket",
    status: "Active",
    registrationDate: "January 14, 2024",
  },
];

export const mockSupportUser = {
  firstName: "Support",
  middleName: "Middle",
  lastName: "User",
  birthday: "Birthday",
  mobileNumber: "0999-999-9999",
  nationality: "Nationality",
  placeOfBirth: "Place of Birth",
  currentAddress: {
    region: "Region",
    province: "Province",
    municipality: "Municipality",
    barangay: "Barangay",
    street: "Street/Sitio",
  },
  permanentAddress: {
    region: "Region",
    province: "Province",
    municipality: "Municipality",
    barangay: "Barangay",
    street: "Street/Sitio",
  },
  gameSite: "Game Site",
  sourceOfIncome: "Source of Income",
  natureOfWork: "Nature of Work",
  typeOfID: "National ID",
  idPicture: null,
  selfiePicture: null,
  isActive: true,
  isFullyVerified: true,
  lastActivity: "2 hrs ago",
};
