export interface BranchCoordinate {
  city: string;
  x: number;
  y: number;
}

/**
 * branchCoordinates.ts
 * Centralized coordinates for the Pan India Network Map (india-map.png).
 * Approximate % positioning mapped to standard India projection (0-100 values).
 */
export const branchCoordinates: BranchCoordinate[] = [
  { city: "Delhi", y: 28, x: 46 },
  { city: "Mumbai", y: 62, x: 25 },
  { city: "Bangalore", y: 78, x: 38 },
  { city: "Chennai", y: 77, x: 45 },
  { city: "Kolkata", y: 50, x: 76 },
  { city: "Hyderabad", y: 65, x: 43 },
  { city: "Pune", y: 60, x: 27 },
  { city: "Ahmedabad", y: 50, x: 18 },
  { city: "Jaipur", y: 38, x: 35 },
  { city: "Lucknow", y: 38, x: 56 },
  { city: "Chandigarh", y: 22, x: 42 },
  { city: "Bhopal", y: 48, x: 44 },
  { city: "Indore", y: 50, x: 38 },
  { city: "Patna", y: 43, x: 68 },
  { city: "Bhubaneswar", y: 58, x: 68 },
  { city: "Kochi", y: 88, x: 35 },
  { city: "Guwahati", y: 40, x: 85 },
  { city: "Nagpur", y: 54, x: 45 },
  { city: "Surat", y: 55, x: 22 },
  { city: "Vadodara", y: 52, x: 22 },
  { city: "Port Blair", y: 80, x: 88 }
];
