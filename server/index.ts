import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve the Vite production build.
const staticPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

app.use(express.static(staticPath));

// SPA fallback for client-side routes.
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Vercel serves dist/public directly. The server also supports local production previews.
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => console.log(`Sahm is running on port ${port}`));
}
export default app;
