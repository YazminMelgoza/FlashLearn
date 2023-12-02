export type User = {
  id?: string,
  name: string,
  email: string,
  points: number,
  level: number,
  lastActivity: number | null,
  streakDuration: number,
}