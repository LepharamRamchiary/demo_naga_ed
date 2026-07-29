import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import hpp from "hpp";
import { xss } from "express-xss-sanitizer";
import helmet from "helmet";
import { limiter } from "./utils/rateLimit.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { ApiError } from "./utils/ApiError.js";

dotenv.config();

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);

// Cookie parser middleware to read incoming cookies
app.use(cookieParser());

// json data
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: true, limit: "40mb" }));

// Protects against HTTP Parameter Pollution
app.use(hpp());
app.use(xss());

// Security headers
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// General API rate limiting
app.use(limiter);

app.set("query parser", "extended");

// routes import
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1", authRoutes);
app.use("/api/v1/users", userRoutes);

// health check
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

// 404 handler for unmatched routes
app.use((req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

// error handler
app.use(errorHandler);

export { app };
