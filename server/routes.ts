import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.profile.get.path, async (req, res) => {
    let profile = await storage.getProfile();
    if (!profile) {
      profile = await storage.updateProfile({});
    }
    res.json(profile);
  });

  app.put(api.profile.update.path, async (req, res) => {
    try {
      const input = api.profile.update.input.parse(req.body);
      const profile = await storage.updateProfile(input);
      res.json(profile);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projList = await storage.getProjects();
    res.json(projList);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const proj = await storage.getProject(Number(req.params.id));
    if (!proj) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(proj);
  });

  app.get(api.testimonials.list.path, async (req, res) => {
    const testList = await storage.getTestimonials();
    res.json(testList);
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const msg = await storage.createMessage(input);
      res.status(201).json(msg);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Call seedDatabase once
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const [profile] = await Promise.all([
    storage.getProfile()
  ]);

  if (!profile) {
    await storage.updateProfile({
      name: "Alex Chen",
      title: "AI Video Creator & Director",
      pictureUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
      summary: "I specialize in creating next-generation video content using cutting-edge AI technologies. With over 5 years of experience in digital media production and 2 years focusing exclusively on AI-driven workflows, I bring imaginative concepts to life with stunning visuals and engaging narratives."
    });
  }

  const projects = await storage.getProjects();
  if (projects.length === 0) {
    const { db } = await import("./db");
    const { projects: projectsSchema } = await import("@shared/schema");
    await db.insert(projectsSchema).values([
      {
        title: "Neon Dreams",
        description: "A cyberpunk short film fully generated using Midjourney and Runway Gen-2.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a",
        displayOrder: 1
      },
      {
        title: "Ethereal Echoes",
        description: "Music video for an indie electronic artist, featuring AI-stylized performance capture.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
        displayOrder: 2
      },
      {
        title: "Future Fashion",
        description: "AI fashion commercial concept blending traditional photography with Stable Diffusion elements.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        displayOrder: 3
      }
    ]);
  }

  const testimonials = await storage.getTestimonials();
  if (testimonials.length === 0) {
    const { db } = await import("./db");
    const { testimonials: testSchema } = await import("@shared/schema");
    await db.insert(testSchema).values([
      {
        author: "Sarah Jenkins",
        role: "Creative Director",
        content: "Working with Alex was a game-changer for our agency. The AI pipelines they set up saved us weeks of production time.",
        displayOrder: 1
      },
      {
        author: "David Wu",
        role: "Indie Filmmaker",
        content: "The quality of the AI generated visuals Alex produced for my short film completely blew my mind. True artistry.",
        displayOrder: 2
      }
    ]);
  }
}
