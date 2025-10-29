import { School } from "@/types/quote";

// -------------------- Sample Data --------------------
export const destinations: School[] = [
  {
    id: "worthing",
    name: "Worthing",
    address: "12, Stoke Abbott Road",
    postcode: "BN11 1HE",
    telephone: "+44 (0) 1903 231330",
    email: "registrar@ces-schools.com",
    courses: [
      {
        id: "sge",
        name: "Standard General English",
        tiers: [
          { minWeeks: 1, maxWeeks: 4, weeklyPrice: 245 },
          { minWeeks: 5, maxWeeks: 11, weeklyPrice: 235 },
          { minWeeks: 12, maxWeeks: 23, weeklyPrice: 225 },
          { minWeeks: 24, maxWeeks: 35, weeklyPrice: 220 },
          { minWeeks: 36, maxWeeks: 49, weeklyPrice: 210 },
        ],
      },
           {
        id: "ige",
        name: "Intensive General English",
        tiers: [
          { minWeeks: 1, maxWeeks: 4, weeklyPrice: 355 },
          { minWeeks: 5, maxWeeks: 11, weeklyPrice: 335 },
          { minWeeks: 12, maxWeeks: 23, weeklyPrice: 325 },
          { minWeeks: 24, maxWeeks: 35, weeklyPrice: 315 },
          { minWeeks: 36, maxWeeks: 49, weeklyPrice: 305 },
        ],
      },
           {
        id: "combination",
        name: "Combination Course",
        tiers: [
          { minWeeks: 1, maxWeeks: 4, weeklyPrice: 585 },
          { minWeeks: 5, maxWeeks: 11, weeklyPrice: 575 },
          { minWeeks: 12, maxWeeks: 49, weeklyPrice: 565 },
        ],
      },
           {
        id: "ielts",
        name: "IELTS Preparation Course",
        tiers: [
          { minWeeks: 1, maxWeeks: 4, weeklyPrice: 355 },
          { minWeeks: 5, maxWeeks: 11, weeklyPrice: 335 },
          { minWeeks: 12, maxWeeks: 23, weeklyPrice: 325 },
          { minWeeks: 24, maxWeeks: 35, weeklyPrice: 315 },
          { minWeeks: 36, maxWeeks: 49, weeklyPrice: 305 },
        ],
      },
                 {
        id: "cambridge",
        name: "Cambridge Exam Preparation Course",
        tiers: [
          { minWeeks: 1, maxWeeks: 4, weeklyPrice: 585 },
          { minWeeks: 5, maxWeeks: 11, weeklyPrice: 575 },
          { minWeeks: 12, maxWeeks: 49, weeklyPrice: 565 },
        ],
      },
          {
      id: "junior",
      name: "Junior Programme",
      tiers: [
        { minWeeks: 1, maxWeeks: 2, weeklyPrice: 526.5 },
        { minWeeks: 3, maxWeeks: 3, weeklyPrice: 525.34 },
        { minWeeks: 4, maxWeeks: 4, weeklyPrice: 518.5 },
        { minWeeks: 5, maxWeeks: 9, weeklyPrice: 515 },
      ],
    },
    ],
    accommodation: [
    { id: "single", name: "Homestay Single Room Half-Board", weeklyPrice: 240 },
    { id: "shared", name: "Homestay Shared Room Half-Board", weeklyPrice: 215 },
    ],
    transfers: [
      {
        code:'LHR',
        name: 'Heathrow',
        prices: {
          oneWay: { 1: 95, 2: 130, 3: 160 },
          return: { 1: 170, 2: 240, 3: 300 },
        }
      },
      {
        code: 'LGW',
        name: 'Gatwick',
        prices: {
          oneWay: { 1: 80, 2: 110, 3: 135 },
          return: { 1: 145, 2: 205, 3: 260 },
        },
      }
    ]
    },
    {
    id: "london",
    name: "London",
    address: "Nelson House, 271, Kingston Road",
    postcode: "SW19 3NW",
    telephone: "+44 (0) 20 8543 5150",
    email: "registrar@ces-schools.com",
    courses: [
      {
        id: "sge",
        name: "Standard General English",
        tiers: [
          { minWeeks: 1, maxWeeks: 4, weeklyPrice: 275 },
          { minWeeks: 5, maxWeeks: 11, weeklyPrice: 265 },
          { minWeeks: 12, maxWeeks: 23, weeklyPrice: 255 },
          { minWeeks: 24, maxWeeks: 35, weeklyPrice: 250 },
          { minWeeks: 36, maxWeeks: 49, weeklyPrice: 240 },
        ],
      },
           {
        id: "ige",
        name: "Intensive General English",
        tiers: [
          { minWeeks: 1, maxWeeks: 4, weeklyPrice: 390 },
          { minWeeks: 5, maxWeeks: 11, weeklyPrice: 370 },
          { minWeeks: 12, maxWeeks: 23, weeklyPrice: 365 },
          { minWeeks: 24, maxWeeks: 35, weeklyPrice: 355 },
          { minWeeks: 36, maxWeeks: 49, weeklyPrice: 345 },
        ],
      },
           {
        id: "combination",
        name: "Combination Course",
        tiers: [
          { minWeeks: 1, maxWeeks: 4, weeklyPrice: 615 },
          { minWeeks: 5, maxWeeks: 11, weeklyPrice: 605 },
          { minWeeks: 12, maxWeeks: 49, weeklyPrice: 595 },
        ],
      },
           {
        id: "ielts",
        name: "IELTS Preparation Course",
        tiers: [
          { minWeeks: 1, maxWeeks: 4, weeklyPrice: 390 },
          { minWeeks: 5, maxWeeks: 11, weeklyPrice: 370 },
          { minWeeks: 12, maxWeeks: 23, weeklyPrice: 365 },
          { minWeeks: 24, maxWeeks: 35, weeklyPrice: 355 },
          { minWeeks: 36, maxWeeks: 49, weeklyPrice: 345 },
        ],
      },
                 {
        id: "cambridge",
        name: "Cambridge Exam Preparation Course",
        tiers: [
          { minWeeks: 1, maxWeeks: 4, weeklyPrice: 615 },
          { minWeeks: 5, maxWeeks: 11, weeklyPrice: 605 },
          { minWeeks: 12, maxWeeks: 49, weeklyPrice: 595 },
        ],
      },
    ],
    accommodation: [
    { id: "single", name: "Homestay Single Room Half-Board", weeklyPrice: 280 },
    { id: "shared", name: "Homestay shared room half board", weeklyPrice: 235 },
    {
      id: "pre-single",
      name: "Premium Homestay single room half board",
      weeklyPrice: 335,
    },
    {
      id: "pre-shared",
      name: "Premium Homestay shared room half board",
      weeklyPrice: 275,
    },
    ],
        transfers: [
      {
        code:'LHR',
        name: 'Heathrow',
        prices: {
          oneWay: { 1: 95, 2: 130, 3: 160 },
          return: { 1: 170, 2: 240, 3: 300 },
        }
      },
      {
        code: 'LGW',
        name: 'Gatwick',
        prices: {
          oneWay: { 1: 80, 2: 110, 3: 135 },
          return: { 1: 145, 2: 205, 3: 260 },
        },
      }
    ]
    },
  ]
    







  // {
  //   value: "Oxford",
  //   label: "Oxford",
  //   address: "67, High Street",
  //   postcode: "OX33 1XT",
  //   telephone: "+44 (0) 1865 874786",
  //   email: "oxfordregist@ces-schools.com",
  // },
  // {
  //   value: "Leeds",
  //   label: "Leeds",
  //   address: "9, Park Place",
  //   postcode: "LS1 2RU",
  //   telephone: "+44 (0) 1113 2427171",
  //   email: "leedsregistrar@ces-schools.com",
  // },
  // {
  //   value: "Edinburgh",
  //   label: "Edinburgh",
  //   address: "54, Manor Place",
  //   postcode: "EH3 7EH",
  //   telephone: "+44 (0) 131 2265004",
  //   email: "edinburghregistrar@ces-schools.com",
  // },


export const courses = {
  Worthing: [

  ],
  London: [

  ],
  Oxford: [
    {
      value: "SGE",
      label: "Standard General English",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 275 },
        { minWeeks: 5, maxWeeks: 11, price: 265 },
        { minWeeks: 12, maxWeeks: 23, price: 255 },
        { minWeeks: 24, maxWeeks: 35, price: 250 },
        { minWeeks: 36, maxWeeks: 49, price: 240 },
      ],
    },
    {
      value: "IGE",
      label: "Intensive General English",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 390 },
        { minWeeks: 5, maxWeeks: 11, price: 370 },
        { minWeeks: 12, maxWeeks: 23, price: 365 },
        { minWeeks: 24, maxWeeks: 35, price: 355 },
        { minWeeks: 36, maxWeeks: 49, price: 345 },
      ],
    },
    {
      value: "combination",
      label: "Combination Course",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 615 },
        { minWeeks: 5, maxWeeks: 11, price: 605 },
        { minWeeks: 12, maxWeeks: 49, price: 595 },
      ],
    },
    {
      value: "ielts",
      label: "IELTS",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 390 },
        { minWeeks: 5, maxWeeks: 11, price: 370 },
        { minWeeks: 12, maxWeeks: 23, price: 365 },
        { minWeeks: 24, maxWeeks: 35, price: 355 },
        { minWeeks: 36, maxWeeks: 49, price: 345 },
      ],
    },
    {
      value: "CAM",
      label: "Cambridge Exam Preparation Course",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 615 },
        { minWeeks: 5, maxWeeks: 11, price: 605 },
        { minWeeks: 12, maxWeeks: 49, price: 595 },
      ],
    },
  ],
  Leeds: [
    {
      value: "SGE",
      label: "Standard General English",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 255 },
        { minWeeks: 5, maxWeeks: 11, price: 250 },
        { minWeeks: 12, maxWeeks: 23, price: 240 },
        { minWeeks: 24, maxWeeks: 35, price: 230 },
        { minWeeks: 36, maxWeeks: 49, price: 225 },
      ],
    },
    {
      value: "IGE",
      label: "Intensive General English",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 375 },
        { minWeeks: 5, maxWeeks: 11, price: 360 },
        { minWeeks: 12, maxWeeks: 23, price: 355 },
        { minWeeks: 24, maxWeeks: 35, price: 335 },
        { minWeeks: 36, maxWeeks: 49, price: 330 },
      ],
    },
    {
      value: "combination",
      label: "Combination Course",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 595 },
        { minWeeks: 5, maxWeeks: 11, price: 590 },
        { minWeeks: 12, maxWeeks: 49, price: 580 },
      ],
    },
    {
      value: "ielts",
      label: "IELTS",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 375 },
        { minWeeks: 5, maxWeeks: 11, price: 360 },
        { minWeeks: 12, maxWeeks: 23, price: 355 },
        { minWeeks: 24, maxWeeks: 35, price: 335 },
        { minWeeks: 36, maxWeeks: 49, price: 330 },
      ],
    },
    {
      value: "CAM",
      label: "Cambridge Exam Preparation Course",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 595 },
        { minWeeks: 5, maxWeeks: 11, price: 590 },
        { minWeeks: 12, maxWeeks: 49, price: 580 },
      ],
    },
  ],
  Edinburgh: [
    {
      value: "SGE",
      label: "Standard General English",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 275 },
        { minWeeks: 5, maxWeeks: 11, price: 265 },
        { minWeeks: 12, maxWeeks: 23, price: 255 },
        { minWeeks: 24, maxWeeks: 35, price: 250 },
        { minWeeks: 36, maxWeeks: 49, price: 240 },
      ],
    },
    {
      value: "IGE",
      label: "Intensive General English",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 390 },
        { minWeeks: 5, maxWeeks: 11, price: 370 },
        { minWeeks: 12, maxWeeks: 23, price: 365 },
        { minWeeks: 24, maxWeeks: 35, price: 355 },
        { minWeeks: 36, maxWeeks: 49, price: 345 },
      ],
    },
    {
      value: "combination",
      label: "Combination Course",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 615 },
        { minWeeks: 5, maxWeeks: 11, price: 605 },
        { minWeeks: 12, maxWeeks: 49, price: 595 },
      ],
    },
    {
      value: "ielts",
      label: "IELTS",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 390 },
        { minWeeks: 5, maxWeeks: 11, price: 370 },
        { minWeeks: 12, maxWeeks: 23, price: 365 },
        { minWeeks: 24, maxWeeks: 35, price: 355 },
        { minWeeks: 36, maxWeeks: 49, price: 345 },
      ],
    },
    {
      value: "CAM",
      label: "Cambridge Exam Preparation Course",
      priceRules: [
        { minWeeks: 1, maxWeeks: 4, price: 615 },
        { minWeeks: 5, maxWeeks: 11, price: 605 },
        { minWeeks: 12, maxWeeks: 49, price: 595 },
      ],
    },
  ],
};

export const accommodationOptions = {
  Worthing: [
    { value: "single", label: "Homestay Single Room Half-Board", price: 240 },
    { value: "shared", label: "Homestay Shared Room Half-Board", price: 215 },
  ],
  London: [
    { value: "single", label: "Homestay Single Room Half-Board", price: 280 },
    { value: "shared", label: "Homestay shared room half board", price: 235 },
    {
      value: "pre-single",
      label: "Premium Homestay single room half board",
      price: 335,
    },
    {
      value: "pre-shared",
      label: "Premium Homestay shared room half board",
      price: 275,
    },
  ],
  Oxford: [
    { value: "single", label: "Homestay Single Room Half-Board", price: 280 },
    { value: "shared", label: "Homestay Shared Room Half-Board", price: 235 },
    {
      value: "pre-single",
      label: "Premium Homestay single room half board",
      price: 335,
    },
    {
      value: "pre-shared",
      label: "Premium Homestay shared room half board",
      price: 275,
    },
  ],
  Leeds: [
    { value: "single", label: "Homestay Single Room Half-Board", price: 240 },
    { value: "shared", label: "Homestay Shared Room Half-Board", price: 215 },
  ],
  Edinburgh: [
    { value: "single", label: "Homestay Single Room Half-Board", price: 280 },
    { value: "shared", label: "Homestay Shared Room Half-Board", price: 235 },
  ],
};



export const arrivalTransfers = {
  Worthing: [
    { value: "LGW", label: "from Gatwick", price: 140 },
    { value: "LGW2", label: "from Gatwick (2 passengers)", price: 72.5 },
    { value: "LGW3", label: "from Gatwick (3 passengers)", price: 50 },
    { value: "LHR", label: "from Heathrow", price: 170 },
    { value: "LHR2", label: "from Heathrow (2 passengers)", price: 87.5 },
    { value: "LHR3", label: "from Heathrow (3 passengers)", price: 60 },
    { value: "STN", label: "from Stansted", price: 250 },
    { value: "STN2", label: "from Stansted (2 passengers)", price: 127.5 },
    { value: "STN3", label: "from Stansted (3 passengers)", price: 86.7 },
  ],
  London: [
    { value: "LGW", label: "from Gatwick", price: 145 },
    { value: "LGW2", label: "from Gatwick (2 passengers)", price: 75 },
    { value: "LGW3", label: "from Gatwick (3 passengers)", price: 51.7 },
    { value: "LHR", label: "from Heathrow", price: 145 },
    { value: "LHR2", label: "from Heathrow (2 passengers)", price: 75 },
    { value: "LHR3", label: "from Heathrow (3 passengers)", price: 51.7 },
    { value: "STN", label: "from Stansted", price: 200 },
    { value: "STN2", label: "from Stansted (2 passengers)", price: 105 },
    { value: "STN3", label: "from Stansted (3 passengers)", price: 73.4 },
  ],
  Oxford: [
    { value: "LGW", label: "from Gatwick", price: 205 },
    { value: "LGW2", label: "from Gatwick (2 passengers)", price: 105 },
    { value: "LGW3", label: "from Gatwick (3 passengers)", price: 71.7 },
    { value: "LHR", label: "from Heathrow", price: 165 },
    { value: "LHR2", label: "from Heathrow (2 passengers)", price: 85 },
    { value: "LHR3", label: "from Heathrow (3 passengers)", price: 58.4 },
    { value: "STN", label: "from Stansted", price: 215 },
    { value: "STN2", label: "from Stansted (2 passengers)", price: 110 },
    { value: "STN3", label: "from Stansted (3 passengers)", price: 75 },
  ],
  Leeds: [
    { value: "LBA", label: "from Leeds Bradford", price: 100 },
    { value: "LBA2", label: "from Leeds Bradford (2 passengers)", price: 52.5 },
    { value: "LBA3", label: "from Leeds Bradford (3 passengers)", price: 36.7 },
    { value: "MAN", label: "from Manchester", price: 150 },
    { value: "MAN2", label: "from Manchester (2 passengers)", price: 77.5 },
    { value: "MAN3", label: "from Manchester (3 passengers)", price: 53.4 },
    { value: "LPL", label: "from Liverpool", price: 185 },
    { value: "LPL2", label: "from Liverpool (2 passengers)", price: 95 },
    { value: "LPL3", label: "from Liverpool (3 passengers)", price: 65 },
  ],
  Edinburgh: [
    { value: "EDI", label: "from Edinburgh", price: 80 },
    { value: "EDI2", label: "from Edinburgh (2 passengers)", price: 42.5 },
    { value: "EDI3", label: "from Edinburgh (3 passengers)", price: 30 },
    { value: "GLA", label: "from Glasgow", price: 280 },
    { value: "GLA2", label: "from Glasgow (2 passengers)", price: 142.5 },
    { value: "GLA3", label: "from Glasgow (3 passengers)", price: 96.7 },
  ],
};

export const departureTransfers = {
  Worthing: [
    { value: "LGW", label: "to Gatwick", price: 140 },
    { value: "LGW2", label: "to Gatwick (2 passengers)", price: 72.5 },
    { value: "LGW3", label: "to Gatwick (3 passengers)", price: 50 },
    { value: "LHR", label: "to Heathrow", price: 170 },
    { value: "LHR2", label: "to Heathrow (2 passengers)", price: 87.5 },
    { value: "LHR3", label: "to Heathrow (3 passengers)", price: 60 },
    { value: "STN", label: "to Stansted", price: 250 },
    { value: "STN2", label: "to Stansted (2 passengers)", price: 127.5 },
    { value: "STN3", label: "to Stansted (3 passengers)", price: 86.7 },
  ],

  London: [
    { value: "LGW", label: "to Gatwick", price: 145 },
    { value: "LGW2", label: "to Gatwick (2 passengers)", price: 75 },
    { value: "LGW3", label: "to Gatwick (3 passengers)", price: 51.7 },
    { value: "LHR", label: "to Heathrow", price: 145 },
    { value: "LHR2", label: "to Heathrow (2 passengers)", price: 75 },
    { value: "LHR3", label: "to Heathrow (3 passengers)", price: 51.7 },
    { value: "STN", label: "to Stansted", price: 200 },
    { value: "STN2", label: "to Stansted (2 passengers)", price: 105 },
    { value: "STN3", label: "to Stansted (3 passengers)", price: 73.4 },
  ],

  Oxford: [
    { value: "LGW", label: "to Gatwick", price: 205 },
    { value: "LGW2", label: "to Gatwick (2 passengers)", price: 105 },
    { value: "LGW3", label: "to Gatwick (3 passengers)", price: 71.7 },
    { value: "LHR", label: "to Heathrow", price: 165 },
    { value: "LHR2", label: "to Heathrow (2 passengers)", price: 85 },
    { value: "LHR3", label: "to Heathrow (3 passengers)", price: 58.4 },
    { value: "STN", label: "to Stansted", price: 215 },
    { value: "STN2", label: "to Stansted (2 passengers)", price: 110 },
    { value: "STN3", label: "to Stansted (3 passengers)", price: 75 },
  ],

  Leeds: [
    { value: "LBA", label: "to Leeds Bradford", price: 100 },
    { value: "LBA2", label: "to Leeds Bradford (2 passengers)", price: 52.5 },
    { value: "LBA3", label: "to Leeds Bradford (3 passengers)", price: 36.7 },
    { value: "MAN", label: "to Manchester", price: 150 },
    { value: "MAN2", label: "to Manchester (2 passengers)", price: 77.5 },
    { value: "MAN3", label: "to Manchester (3 passengers)", price: 53.4 },
    { value: "LPL", label: "to Liverpool", price: 185 },
    { value: "LPL2", label: "to Liverpool (2 passengers)", price: 95 },
    { value: "LPL3", label: "to Liverpool (3 passengers)", price: 65 },
  ],

  Edinburgh: [
    { value: "EDI", label: "to Edinburgh", price: 80 },
    { value: "EDI2", label: "to Edinburgh (2 passengers)", price: 42.5 },
    { value: "EDI3", label: "to Edinburgh (3 passengers)", price: 30 },
    { value: "GLA", label: "to Glasgow", price: 280 },
    { value: "GLA2", label: "to Glasgow (2 passengers)", price: 142.5 },
    { value: "GLA3", label: "to Glasgow (3 passengers)", price: 96.7 },
  ],
};