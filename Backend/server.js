import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const ySocketIO = new YSocketIO(io);

ySocketIO.initialize();

app.get('/health', (req, res) => {
    res.status(200).json({
        message: "Server is Healthy",
        success: true
    });
});

httpServer.listen(3000, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("Server is running on port 3000");
    }
});