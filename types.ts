
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export enum ActivityLevel {
  SEDENTARY = 'Sedentary (little or no exercise)',
  LIGHT = 'Lightly active (1-3 days/week)',
  MODERATE = 'Moderately active (3-5 days/week)',
  ACTIVE = 'Very active (6-7 days/week)',
  EXTRA_ACTIVE = 'Extra active (physical job or 2x training)'
}

export interface UserStats {
  age: number;
  height: number;
  weight: number;
  gender: Gender;
  activityLevel: ActivityLevel;
}

export interface CalculationResult {
  bmr: number;
  tdee: number;
  bmi: number;
  bmiCategory: string;
}

export interface AIAnalysis {
  summary: string;
  dietAdvice: string[];
  exerciseAdvice: string[];
  healthTips: string[];
}
