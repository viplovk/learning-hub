import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { GoogleGenAI } from '@google/genai';

function geminiServerPlugin() {
  let env: Record<string, string> = {};

  return {
    name: 'gemini-server-plugin',
    configResolved(config: any) {
      env = loadEnv(config.mode, process.cwd(), '');
    },
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/api/gemini')) {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: 'Method not allowed' }));
            return;
          }

          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });

          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json');
            let parsed: any = {};
            try {
              if (body) {
                try {
                  parsed = JSON.parse(body);
                } catch (parseErr) {
                  console.error('Failed to parse request JSON:', parseErr);
                }
              }
              const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY;

              if (!apiKey) {
                res.statusCode = 200;
                res.end(
                  JSON.stringify({
                    text:
                      parsed.fallbackResponse ||
                      "Gemini API key is not currently configured in the environment. Using grounded curriculum knowledge base.",
                    isGroundedMock: true,
                  })
                );
                return;
              }

              const ai = new GoogleGenAI({
                apiKey: apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build',
                  },
                },
              });

              const { prompt, systemInstruction } = parsed;

              const effectiveSystemInstruction =
                systemInstruction ||
                `You are the official Academic AI Tutor for IEC College of Engineering & Technology, B.Tech CSE 2nd Year (3rd Semester), Section C.
You assist Viplov and his classmates in mastering the official AKTU curriculum (Data Structures, Computer Organization & Architecture, Mathematics-IV, Cyber Security, Discrete Structures & Theory of Logic, Technical Communication).
Pedagogical philosophy: Concept Clarity -> Active Recall -> Feynman Technique -> Exam Preparation (AKTU 2-mark, 5-mark, 10-mark patterns) -> Long-Term Mastery.
Never fabricate syllabus details or exam dates. When explaining, be academically rigorous, clear, concise, and structured. Encourage active thinking rather than rote regurgitation.`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: prompt,
                config: {
                  systemInstruction: effectiveSystemInstruction,
                  temperature: 0.7,
                },
              });

              res.statusCode = 200;
              res.end(JSON.stringify({ text: response.text }));
            } catch (err: any) {
              console.error('Error in Gemini API server route:', err);
              // Fallback to grounded curriculum knowledge base smoothly
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  text:
                    parsed.fallbackResponse ||
                    "Curriculum Study Tutor: Based on the AKTU 3rd Semester curriculum, focus on the fundamental definitions, state transitions, time complexities, and practice with past year examination patterns.",
                  isFallback: true
                })
              );
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), geminiServerPlugin()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
  },
});
