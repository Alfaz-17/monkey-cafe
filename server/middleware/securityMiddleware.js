// Security and Performance Middleware Configuration
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Security Headers
export const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false, // Allow embedding if needed
});

// Rate Limiting - General API
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate Limiting - Strict for Authentication
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes  
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: 'Too many login attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate Limiting - Orders
export const orderLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 orders per minute
    message: 'Too many orders, please slow down.',
    standardHeaders: true,
    legacyHeaders: false,
});
