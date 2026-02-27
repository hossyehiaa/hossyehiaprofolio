import { db } from "./db";
import {
  profiles, projects, testimonials, messages,
  type Profile, type Project, type Testimonial, type Message,
  type UpdateProfileRequest, type CreateMessageRequest
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  updateProfile(updates: UpdateProfileRequest): Promise<Profile>;
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getTestimonials(): Promise<Testimonial[]>;
  createMessage(msg: CreateMessageRequest): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).limit(1);
    return profile;
  }

  async updateProfile(updates: UpdateProfileRequest): Promise<Profile> {
    const [profile] = await db.select().from(profiles).limit(1);
    if (!profile) {
      // Create if doesn't exist
      const [newProfile] = await db.insert(profiles).values({
        name: updates.name || "Hassan Yehia",
        title: updates.title || "AI Video Creator",
        pictureUrl: updates.pictureUrl || "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
        summary: updates.summary || "Creating next generation AI videos.",
        ...updates
      } as any).returning();
      return newProfile;
    }
    const [updated] = await db.update(profiles)
      .set(updates)
      .where(eq(profiles.id, profile.id))
      .returning();
    return updated;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.displayOrder);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(testimonials.displayOrder);
  }

  async createMessage(msg: CreateMessageRequest): Promise<Message> {
    const [message] = await db.insert(messages).values(msg).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
