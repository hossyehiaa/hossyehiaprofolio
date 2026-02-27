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
      name: "Hassan Yehia",
      title: "AI Video Creator & Director",
      pictureUrl: "/images/hassan.jpg",
      summary: "I specialize in creating next-generation video content using cutting-edge AI technologies. With over 5 years of experience in digital media production and 2 years focusing exclusively on AI-driven workflows, I bring imaginative concepts to life with stunning visuals and engaging narratives."
    });
  } else {
    // Update existing profile with new name and picture
    await storage.updateProfile({
      name: "Hassan Yehia",
      pictureUrl: "/images/hassan.jpg"
    });
  }

  const projects = await storage.getProjects();
  if (projects.length === 0) {
    const { db } = await import("./db");
    const { projects: projectsSchema } = await import("@shared/schema");
    await db.insert(projectsSchema).values([
      {
        title: "Event Editing",
        description: "Professional event editing showcase.",
        videoUrl: "https://player.vimeo.com/video/1163552396?h=0f54a2566f",
        thumbnailUrl: "https://i.vimeocdn.com/video/2119806740-cf94a7d6b4d2ce6f0523c87765910edcfd4b8f825e5a5c3a9aea9baca84e0c90-d",
        displayOrder: 1
      },
      {
        title: "BOHUB Cafe AI - AD",
        description: "AI-powered cafe advertisement.",
        videoUrl: "https://player.vimeo.com/video/1163554262?h=9eaaf267a6",
        thumbnailUrl: "https://i.vimeocdn.com/video/2119809513-da7b4dc44937cb34de85ff3e569e831adae13e8e666beb89169d7536bfca864a-d",
        displayOrder: 2
      },
      {
        title: "Let\u2019s Go AI - AD",
        description: "AI advertisement project.",
        videoUrl: "https://player.vimeo.com/video/1163554803?h=90f1eaa2e6",
        thumbnailUrl: "https://i.vimeocdn.com/video/2119810260-3ab04578ad8f652b63168ba3e76b192ad02666a1f8ad30de31718a4eea2318d9-d",
        displayOrder: 3
      },
      {
        title: "3D Animation AD",
        description: "3D animation advertisement.",
        videoUrl: "https://player.vimeo.com/video/1163735699?h=1e834c2f69",
        thumbnailUrl: "https://i.vimeocdn.com/video/2120065646-120b52ba45ba62c7b08a85b80cb24706080236d13eabe6b909592a672591e470-d",
        displayOrder: 4
      },
      {
        title: "Video Editing",
        description: "Professional video editing reel.",
        videoUrl: "https://player.vimeo.com/video/1163557036?h=5a143c1b2a",
        thumbnailUrl: "https://i.vimeocdn.com/video/2119813050-5433ceeb07dac79bf990eb1cd16e6fdcb3f78cf55dd19c6f26598eca41cd15ed-d",
        displayOrder: 5
      },
      {
        title: "Comma Agency - AD",
        description: "Agency advertisement project.",
        videoUrl: "https://player.vimeo.com/video/1163558059?h=4081288853",
        thumbnailUrl: "https://i.vimeocdn.com/video/2119814391-e0494a5515ad89ee5968c36d3b853de2c5fa72e9bff91cda70fd88eb44962db1-d",
        displayOrder: 6
      },
      {
        title: "Notion Project",
        description: "Notion product showcase.",
        videoUrl: "https://player.vimeo.com/video/1163563239?h=9c8d1b3eaf",
        thumbnailUrl: "https://i.vimeocdn.com/video/2119821805-2c06dadf0143a9a82ebab0d95412788bbe449720e3e604bd39966356a1cbf908-d",
        displayOrder: 7
      },
      {
        title: "ClickUp - Personal AD",
        description: "ClickUp personal advertisement.",
        videoUrl: "https://player.vimeo.com/video/1163564687?h=6ee0d592ae",
        thumbnailUrl: "https://i.vimeocdn.com/video/2119823981-a504fc2f4b50d81336a6d6a9c3157b0834667acf7e808dcbe8005398a7c0e1d5-d",
        displayOrder: 8
      },
      {
        title: "Ya Habibi Motion",
        description: "Motion graphics project.",
        videoUrl: "https://player.vimeo.com/video/1163565403?h=c00b04a8d9",
        thumbnailUrl: "https://i.vimeocdn.com/video/2119825134-cb6dbbeb896ada200cf42a8efe1e9f3b8178c422faab57882971d569dd1616c6-d",
        displayOrder: 9
      },
      {
        title: "Careless Whisper Motion",
        description: "Motion graphics project.",
        videoUrl: "https://player.vimeo.com/video/1163565919?h=72d860f4c4",
        thumbnailUrl: "https://i.vimeocdn.com/video/2119826522-f56ef1adab8507e7af175517c49e059083b2a5480a6c0f55be893257291faf1c-d",
        displayOrder: 10
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
        content: "Working with Hassan was a game-changer for our agency. The AI pipelines he set up saved us weeks of production time.",
        displayOrder: 1
      },
      {
        author: "David Wu",
        role: "Indie Filmmaker",
        content: "The quality of the AI generated visuals Hassan produced for my short film completely blew my mind. True artistry.",
        displayOrder: 2
      }
    ]);
  }
}
