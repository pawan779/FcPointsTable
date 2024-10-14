export type PointsTable = {
  id: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

export const pointsTable: PointsTable[] = [
  {
    id: 1,
    name: "Manchester United",
    played: 10,
    won: 6,
    drawn: 2,
    lost: 2,
    goalsFor: 18,
    goalsAgainst: 10,
    goalDifference: 8,
    points: 20,
  },
  {
    id: 2,
    name: "Liverpool",
    played: 10,
    won: 5,
    drawn: 3,
    lost: 2,
    goalsFor: 15,
    goalsAgainst: 12,
    goalDifference: 3,
    points: 18,
  },
  {
    id: 3,
    name: "Chelsea",
    played: 10,
    won: 4,
    drawn: 4,
    lost: 2,
    goalsFor: 16,
    goalsAgainst: 14,
    goalDifference: 2,
    points: 16,
  },
  {
    id: 4,
    name: "Arsenal",
    played: 10,
    won: 4,
    drawn: 2,
    lost: 4,
    goalsFor: 14,
    goalsAgainst: 14,
    goalDifference: 0,
    points: 14,
  },
  {
    id: 5,
    name: "Manchester City",
    played: 10,
    won: 3,
    drawn: 4,
    lost: 3,
    goalsFor: 12,
    goalsAgainst: 10,
    goalDifference: 2,
    points: 13,
  },
  {
    id: 6,
    name: "Tottenham Hotspur",
    played: 10,
    won: 3,
    drawn: 3,
    lost: 4,
    goalsFor: 11,
    goalsAgainst: 15,
    goalDifference: -4,
    points: 12,
  },
  {
    id: 7,
    name: "Everton",
    played: 10,
    won: 3,
    drawn: 2,
    lost: 5,
    goalsFor: 10,
    goalsAgainst: 14,
    goalDifference: -4,
    points: 11,
  },
  {
    id: 8,
    name: "Leicester City",
    played: 10,
    won: 2,
    drawn: 4,
    lost: 4,
    goalsFor: 9,
    goalsAgainst: 13,
    goalDifference: -4,
    points: 10,
  },
  {
    id: 9,
    name: "West Ham United",
    played: 10,
    won: 2,
    drawn: 3,
    lost: 5,
    goalsFor: 8,
    goalsAgainst: 15,
    goalDifference: -7,
    points: 9,
  },
  {
    id: 10,
    name: "Aston Villa",
    played: 10,
    won: 1,
    drawn: 5,
    lost: 4,
    goalsFor: 7,
    goalsAgainst: 12,
    goalDifference: -5,
    points: 8,
  },
];

export type Fixture = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
};

export const fixtures: Fixture[] = [
  {
    id: 1,
    homeTeam: "Manchester United",
    awayTeam: "Chelsea",
    date: "2024-10-15",
  },
  {
    id: 2,
    homeTeam: "Liverpool",
    awayTeam: "Arsenal",
    date: "2024-10-16",
  },
  {
    id: 3,
    homeTeam: "Tottenham Hotspur",
    awayTeam: "Manchester City",
    date: "2024-10-17",
  },
  {
    id: 4,
    homeTeam: "Everton",
    awayTeam: "Leicester City",
    date: "2024-10-18",
  },
  {
    id: 5,
    homeTeam: "West Ham United",
    awayTeam: "Aston Villa",
    date: "2024-10-19",
  },
  {
    id: 6,
    homeTeam: "Wolves",
    awayTeam: "Brighton",
    date: "2024-10-20",
  },
  {
    id: 7,
    homeTeam: "Crystal Palace",
    awayTeam: "Newcastle United",
    date: "2024-10-21",
  },
  {
    id: 8,
    homeTeam: "Leeds United",
    awayTeam: "Southampton",
    date: "2024-10-22",
  },
  {
    id: 9,
    homeTeam: "Brentford",
    awayTeam: "Norwich City",
    date: "2024-10-23",
  },
  {
    id: 10,
    homeTeam: "Fulham",
    awayTeam: "Burnley",
    date: "2024-10-24",
  },
];

export type Result = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
};

export const results: Result[] = [
  {
    id: 1,
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    homeScore: 2,
    awayScore: 1,
    date: "2024-10-01",
  },
  {
    id: 2,
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    homeScore: 1,
    awayScore: 3,
    date: "2024-10-02",
  },
  {
    id: 3,
    homeTeam: "Tottenham Hotspur",
    awayTeam: "Manchester United",
    homeScore: 0,
    awayScore: 0,
    date: "2024-10-03",
  },
  {
    id: 4,
    homeTeam: "Leicester City",
    awayTeam: "West Ham United",
    homeScore: 4,
    awayScore: 2,
    date: "2024-10-04",
  },
  {
    id: 5,
    homeTeam: "Aston Villa",
    awayTeam: "Everton",
    homeScore: 3,
    awayScore: 1,
    date: "2024-10-05",
  },
];
