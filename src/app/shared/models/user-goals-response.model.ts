export interface UserGoalsResponse{
    goalId: number;
    targetValue: number;
    currentValue: number;
    startDate: Date,
    endDate: Date,
    goalStatus: string,
    habitId: number,
    habitName: string,
    habitTypeName: string,
    frequency: string,
}