export interface UserGoalsRequest{
    profileId: number;
    habitId: number;
    planId: number;
    targetValue: number;
    currentValue: number;
    endDate: Date;
    trackings?: []
}