import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json({ limit: "10mb" }));

// Initialize the Gemini API client securely on the server
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("⚠️ GEMINI_API_KEY is not defined. AI ATS Scan features will fall back to simulation mode.");
}

// 1. API Endpoint for ATS resume scanner using Gemini
app.post("/api/ats/evaluate", async (req: Request, res: Response): Promise<void> => {
  const { resumeText, jobDescription, lang = "ar" } = req.body;

  if (!resumeText || !jobDescription) {
    res.status(400).json({ error: "Missing resumeText or jobDescription inside body" });
    return;
  }

  // Fallback if API key is not configured
  if (!ai) {
    // Generate a high-fidelity simulated matching response to keep the UI perfectly interactive
    const score = Math.floor(Math.random() * 25) + 60; // 60-85%
    const isAr = lang === "ar";
    
    setTimeout(() => {
      res.json({
        matchPercentage: score,
        analysis: isAr 
          ? "التحليل الاسترشادي (وضع المحاكاة بسبب عدم تهيئة مفتاح API في الخادم): يُظهر ملف السيرة الذاتية التزاماً جيداً بالنقاط المطلوبة، مع دقة في تصنيف المهارات. لوصف وظيفة تكنولوجيا المجتمع، ننصح بالتركيز على التمكين الرقمي."
          : "Evaluated in simulator mode (GEMINI_API_KEY missing). Your profile exhibits substantial alignment in soft skills. Highlight metric-based project outcomes to push compliance beyond 85%.",
        strengthBulletPoints: isAr
          ? [
              "توافق ممتاز في القطاعات التنموية والإنسانية",
              "إبراز المهارات التنظيمية والعمل التشاركي الميداني",
              "صياغة واضحة للاهداف المهنية الأساسية"
            ]
          : [
              "Excellent alignment with civil society framework",
              "Strong exposure to field operations & coordinate systems",
              "Well-structured profile summary & education track"
            ],
        missingKeywords: isAr
          ? ["إدارة المشاريع التنموية (Project Management)", "أدوات قياس الأثر الاجتماعي", "الرصد والتقييم (M&E)"]
          : ["Monitoring & Evaluation (M&E)", "Social Impact Assessment Tools", "Donor Synergy Alignment"],
        optimizationRecommendations: isAr
          ? [
              "قم بإدراج مهارات رقمية محددة متوافقة مع القطاع التنموي المعاصر.",
              "أضف نسباً مئوية أو أرقام كمية تدل على مدى تأثيرك في الأعمال السابقة.",
              "أعد صياغة خبراتك بذكر دورك القيادي والتوجيهي بوضوح."
            ]
          : [
              "Incorporate digital framework proficiencies relevant to social work.",
              "Quantify your training deliverables with structured numbers/percentages.",
              "Refine experience statements to showcase leadership and initiative."
            ]
      });
    }, 1000);
    return;
  }

  try {
    const prompt = `Evaluate the following Resume against the given Job Description for ATS matching and compliance.
Language option: Current UI is in language "${lang}" (either 'ar' or 'en'). Please construct the structural analysis and text feedback inside the JSON fields using this same language constraint ("${lang}").

---
JOB DESCRIPTION:
${jobDescription}

---
RESUME:
${resumeText}
`;

    // Retrieve structured JSON response from Gemini 3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are a professional ATS (Applicant Tracking System) Auditor and Senior Career Coach specialized in Jordan's socio-economic and global development sector.
Analyze the user's resume text against the job description strictly and honestly.
You MUST respond with a valid JSON object matching this TypeScript schema:
{
  matchPercentage: number (integer between 0 and 100 representing realistic ATS alignment),
  analysis: string (narrative evaluation of current compatibility and potential),
  strengthBulletPoints: string[] (3 main strengths in the resume matching this job description),
  missingKeywords: string[] (essential keywords, tools, core terminologies in the job description that are missing from the resume),
  optimizationRecommendations: string[] (actionable, highly constructive resume upgrade recommendations to bypass the keyword screening and increase compliance score)
}
Language instruction: The response text columns MUST be written entirely in "${lang}" as requested (Arabic or English). Ensure all JSON strings are valid and escape special characters nicely.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchPercentage: { type: Type.INTEGER },
            analysis: { type: Type.STRING },
            strengthBulletPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            missingKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            optimizationRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["matchPercentage", "analysis", "strengthBulletPoints", "missingKeywords", "optimizationRecommendations"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Gemini model.");
    }

    // Return the JSON directly
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(responseText);
  } catch (error: any) {
    console.error("Gemini ATS Evaluation Error:", error);
    res.status(500).json({
      error: "Internal failure evaluating ATS match with AI",
      details: error.message || String(error)
    });
  }
});


// 2. Vite and static file serving configuration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite development server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production building
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 MMC SD Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
