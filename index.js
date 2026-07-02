// ============================================
//          𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺 BOT — INDEX.JS
//         Main Entry Point
//         Developer:  𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺 
// ============================================

'use strict';

const fs         = require('fs');        // Built-in — no install needed
const path       = require('path');      // Built-in — no install needed
const config     = require('./config/config');
const logger     = require('./utils/logger');

// ─── Print Banner ─────────────────────────────
logger.banner();

// ─── Ensure Required Directories Exist ───────
const dirs = ['./sessions', './database', './assets', './logs'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
logger.info('Directories verified.');

// ─── Anti-Crash Handler ───────────────────────
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err.message);
});
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason?.message || reason);
});
logger.info('Anti-crash handler enabled.');

// ─── Validate Telegram Token ──────────────────
if (!config.telegram.token) {
  logger.error('❌ Telegram bot token not set!');
  logger.error('   Open config/config.js and set your token.');
  process.exit(1);
}

// ─── Start Telegram Bot ───────────────────────
let telegramBot;
try {
  const TelegramBot = require('node-telegram-bot-api');
  telegramBot = new TelegramBot(config.telegram.token, { polling: true });
  logger.success('Telegram bot started successfully!');
} catch (err) {
  logger.error('Failed to start Telegram bot:', err.message);
  process.exit(1);
}

// ─── Load Telegram Handlers ───────────────────
try {
  const { initTelegram } = require('./telegram/bot');
  initTelegram(telegramBot);
  logger.success('Telegram handlers loaded.');
} catch (err) {
  logger.error('Failed to load Telegram handlers:', err.message);
  process.exit(1);
}

// ─── Restore Saved WhatsApp Sessions ─────────
const { restoreAllSessions } = require('./core/whatsapp');
(async () => {
  try {
    await restoreAllSessions(telegramBot);
    logger.success('All saved sessions restored.');
  } catch (err) {
    logger.error('Session restore error:', err.message);
  }
})();

// ─── Express Keep-Alive Server ────────────────
try {
  const express = require('express');
  const app     = express();

  app.get('/', (req, res) => {
    res.json({
      bot:       ' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺',
      developer: ' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺',
      version:   config.version,
      status:    'running',
      uptime:    Math.floor(process.uptime()) + 's',
    });
  });

  app.get('/ping', (req, res) => res.send('pong'));

  app.listen(config.port, () => {
    logger.success(`Web server running on port ${config.port}`);
  });
} catch (err) {
  logger.warn('Express server not started:', err.message);
}

// ─── Graceful Shutdown ────────────────────────
process.on('SIGINT', () => { logger.warn('Shutting down...'); process.exit(0); });
process.on('SIGTERM', () => { logger.warn('Shutting down...'); process.exit(0); });

logger.success(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺 ᴍᴅ Bot is fully initialized and running!');
