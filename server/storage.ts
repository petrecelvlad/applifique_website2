import { users, type User, type InsertUser, type WaitlistSignup, type InsertWaitlistSignup } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlistSignup(signup: InsertWaitlistSignup): Promise<WaitlistSignup>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlistSignups: Map<number, WaitlistSignup>;
  private currentUserId: number;
  private currentWaitlistId: number;

  constructor() {
    this.users = new Map();
    this.waitlistSignups = new Map();
    this.currentUserId = 1;
    this.currentWaitlistId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWaitlistSignup(insertSignup: InsertWaitlistSignup): Promise<WaitlistSignup> {
    // Check for duplicate email
    for (const signup of Array.from(this.waitlistSignups.values())) {
      if (signup.email === insertSignup.email) {
        throw new Error("Email already exists in waitlist - unique constraint violation");
      }
    }

    const id = this.currentWaitlistId++;
    const signup: WaitlistSignup = { 
      id,
      name: insertSignup.name,
      email: insertSignup.email,
      appType: insertSignup.appType || null,
      description: insertSignup.description || null,
      createdAt: new Date()
    };
    this.waitlistSignups.set(id, signup);
    return signup;
  }
}

export const storage = new MemStorage();
