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
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 14:00:00",
          },
          {
            id: 2,
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 16:00:00",
          },
          {
            id: 3,
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 16:00:00",
          },
        ],
        winners: [
          {
            id: 1,
            referenceId: "09230192",
            amountWon: "1,625,450.44",
            status: "Unclaimed",
          },
          {
            id: 2,
            referenceId: "123192",
            amountWon: "1,625,450.44",
            status: "Claimed",
          },
        ],
      },
      {
        subTypeName: "Tripple Win",
        prizePool: [
          {
            id: 3,
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 14:00:00",
          },
          {
            id: 4,
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 18:00:00",
          },
        ],
        winners: [
          {
            id: 3,
            referenceId: "09230192",
            amountWon: "1,625,450.44",
            status: "Unclaimed",
          },
          {
            id: 4,
            referenceId: "123192",
            amountWon: "1,625,450.44",
            status: "Claimed",
          },
        ],
      },
      {
        subTypeName: "Magic Win",
        prizePool: [
          {
            id: 5,
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 14:00:00",
          },
          {
            id: 6,
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 15:00:00",
          },
        ],
        winners: [
          {
            id: 7,
            referenceId: "09230192",
            amountWon: "1,625,450.44",
            status: "Unclaimed",
          },
          {
            id: 8,
            referenceId: "123192",
            amountWon: "1,625,450.44",
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
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 14:00:00",
          },
          {
            id: 10,
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 15:00:00",
          },
        ],
        winners: [
          {
            id: 9,
            referenceId: "09230192",
            amountWon: "1,625,450.44",
            status: "Unclaimed",
          },
          {
            id: 10,
            referenceId: "123192",
            amountWon: "1,625,450.44",
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
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 14:00:00",
          },
          {
            id: 12,
            prizeAmount: "3,250,900.88",
            date: "May 08, 2023 15:00:00",
          },
        ],
        winners: [
          {
            id: 11,
            referenceId: "09230192",
            amountWon: "1,625,450.44",
            status: "Unclaimed",
          },
          {
            id: 12,
            referenceId: "123192",
            amountWon: "1,625,450.44",
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
      displayName: "Display Name",
      transactionNumber: "#TransactionID",
      combination: "3-4-4",
      amount: "25.00",
      gameTime: "11PM",
      date: "May 08, 2023 15:00:00",
    },
    {
      id: 2,
      displayName: "Display Name",
      transactionNumber: "#TransactionID",
      combination: "3-4-4",
      amount: "25.00",
      gameTime: "11PM",
      date: "May 08, 2023 15:00:00",
    },
    {
      id: 3,
      displayName: "Display Name",
      transactionNumber: "#TransactionID",
      combination: "3-4-4",
      amount: "25.00",
      gameTime: "11PM",
      date: "May 08, 2023 15:00:00",
    },
    {
      id: 4,
      displayName: "Display Name",
      transactionNumber: "#TransactionID",
      combination: "3-4-4",
      amount: "25.00",
      gameTime: "11PM",
      date: "May 08, 2023 15:00:00",
    },
  ],
  pageInfo: {
    total: 4,
    pageNumber: 0,
    pageSize: 5,
  },
};
