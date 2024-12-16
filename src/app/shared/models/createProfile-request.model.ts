export interface CreateProfileRequest{
    userName: string,
    height: number,
    weight: number;
    age: number;
    gender: string;
    healthConditions?: string;
}