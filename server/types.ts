import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";

export type AuthRequest = ExpressRequest;
export type AuthResponse = ExpressResponse;
export type AuthNext = NextFunction;

declare module "express-session" {
  interface SessionData {
    userId?: number;
    username?: string;
    role?: string;
    tenantId?: number;
  }
}
