import { UserGoalsResponse } from "./user-goals-response.model";

export interface UserPlanResponse{
    planName: string;
    description: string;
    startDate: Date;
    endDate: Date;
    planStatus: string;
    planId: number;
    goals?: UserGoalsResponse[];
}