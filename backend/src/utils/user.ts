import { User } from "../models/db";

export const validateNewUser = (user: User) => {
    // Checks values for user fields
    const { firstName, lastName, skills } = user;
    if (firstName === undefined || firstName === "" || typeof firstName !== "string")
        throw new Error("First name bad request!");
    if (lastName === undefined || lastName === "" || typeof lastName !== "string")
        throw new Error("Last name bad request!");
    if (skills !== undefined && !Array.isArray(skills))
        throw new Error("Skills bad request!");
};

export const validateEdit = (user: Partial<User>) => {
    // Checks types for user fields
    const { firstName, lastName, skills } = user;
    if (firstName !== undefined && typeof firstName !== "string")
        throw new Error("First name must be a string!");
    if (lastName !== undefined && typeof lastName !== "string")
        throw new Error("Last name must be a string!");
    if (skills !== undefined && !Array.isArray(skills))
        throw new Error("Skills must be an array!");
};
