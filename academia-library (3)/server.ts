import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Database
  let books = [
    { id: "1", title: "Clean Code", author: "Robert C. Martin", category: "CS", status: "Available", year: 2008, cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400", addedAt: new Date(2026, 0, 15).toISOString(), borrowCount: 120 },
    { id: "2", title: "The Wealth of Nations", author: "Adam Smith", category: "Economics", status: "Available", year: 1776, cover: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400", addedAt: new Date(2026, 1, 10).toISOString(), borrowCount: 85 },
    { id: "3", title: "Driven to Win", author: "Lewis Hamilton", category: "Sports", status: "Borrowed", year: 2021, cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400", addedAt: new Date(2026, 2, 5).toISOString(), borrowCount: 200 },
    { id: "4", title: "Sapiens", author: "Yuval Noah Harari", category: "History", status: "Available", year: 2011, cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400", addedAt: new Date(2026, 3, 2).toISOString(), borrowCount: 150 },
    { id: "5", title: "Prisoners of Geography", author: "Tim Marshall", category: "Geography", status: "Available", year: 2015, cover: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=400", addedAt: new Date(2026, 4, 1).toISOString(), borrowCount: 95 },
    { id: "6", title: "Introduction to Algorithms", author: "CLRS", category: "CS", status: "Available", year: 2009, cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400", addedAt: new Date(2026, 4, 12).toISOString(), borrowCount: 110 },
  ];

  // API Routes
  app.get("/api/books", (req, res) => {
    res.json(books);
  });

  app.post("/api/books", (req, res) => {
    const newBook = { 
      ...req.body, 
      id: Date.now().toString(),
      addedAt: new Date().toISOString(),
      borrowCount: Math.floor(Math.random() * 50)
    };
    books.push(newBook);
    res.status(201).json(newBook);
  });

  app.put("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const index = books.findIndex((b) => b.id === id);
    if (index !== -1) {
      books[index] = { ...books[index], ...req.body };
      res.json(books[index]);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  });

  app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    books = books.filter((b) => b.id !== id);
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
