import { AuthRequest, AuthResponse, AuthNext } from "../types.js";

export function requireAuth(req: AuthRequest, res: AuthResponse, next: AuthNext) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "No autenticado." });
  }
  next();
}

export async function requireAdmin(req: AuthRequest, res: AuthResponse, next: AuthNext) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "No autenticado." });
  }
  
  if (req.session.role !== "admin" && req.session.role !== "superadmin") {
    return res.status(403).json({ error: "Permisos insuficientes." });
  }
  next();
}

export function requireApiKey(req: AuthRequest, res: AuthResponse, next: AuthNext) {
  const key = req.header("x-api-key");
  if (!key || key !== process.env.SANTI_API_KEY) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}
