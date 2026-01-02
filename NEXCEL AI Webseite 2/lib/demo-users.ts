import fs from "fs";
import path from "path";

export interface DemoUser {
  id: string;
  email: string;
  name: string;
  unternehmen?: string;
  passwordHash: string;
  role: "demo_user" | "admin";
  createdAt: string;
  expiresAt: string;
  lastLogin?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "demo-users.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readUsers(): DemoUser[] {
  ensureDataDir();
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeUsers(users: DemoUser[]) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export function findUserByEmail(email: string): DemoUser | null {
  const users = readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function findUserById(id: string): DemoUser | null {
  const users = readUsers();
  return users.find((u) => u.id === id) || null;
}

export function createUser(user: Omit<DemoUser, "id" | "createdAt">): DemoUser {
  const users = readUsers();
  const newUser: DemoUser = {
    ...user,
    id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  writeUsers(users);
  return newUser;
}

export function updateUser(id: string, updates: Partial<DemoUser>): DemoUser | null {
  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  writeUsers(users);
  return users[index];
}

export function isEmailExists(email: string): boolean {
  return findUserByEmail(email) !== null;
}

