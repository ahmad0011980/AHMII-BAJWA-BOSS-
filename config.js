// ============================================
//       𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺 BOT - MAIN CONFIGURATION
//   ⚠️  Sari settings yahan se change karo
//       .env file ki zaroorat nahi hai
// ============================================

const config = {

  // ─── Bot Identity ────────────────────────────
  botName:   ' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺',


  // ─── Owner Number (apna WhatsApp number daalo with country code) ──
  // Example: '923001234567' (no + sign, no spaces)
  ownerNumber: '923233972167',   // ← YAHAN APNA NUMBER DAALO
  developer: ' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺',
  prefix:    '.',
  version:   '1.0.0',

  // ─── ⭐ Telegram Settings ─────────────────────
  //  Yahan apna Telegram Bot Token daalo
  telegram: {
    token:     '8593320366:AAF51vyV8GBTtrBmSFRtbWJyJd6BQeF_E_U',   // ← @BotFather se lo
    channelId: '@your_channel_username',          // ← optional
  },

  // ─── WhatsApp Channel Links ──────────────────
  channels: {
  channel1: 'https://whatsapp.com/channel/0029Vb7dRzL002SzaCFGoW1x',
  GROUP: 'https://chat.whatsapp.com/I1XhShKcOJm6FzSOBfw7zB',
},

  // ─── Pairing Code Settings ───────────────────
  pairing: {
    codeExpiry: 120000,   // 2 minutes (ms) — code expire time
    maxRetries: 3,
  },

  // ─── Session Settings ────────────────────────
  sessions: {
    dir:          './sessions',
    cleanupDelay: 5000,   // 5 seconds delay before deleting on logout
  },

  // ─── Database ────────────────────────────────
  database: {
    path: './database/data.json',
  },

  // ─── Bot Behavior ────────────────────────────
  behavior: {
    antiCrash:            true,
    autoRead:             false,
    autoTyping:           true,
    autoRecording:        false,
    deleteCommandMessage: false,
    rejectCalls:          false,
    rejectCallMessage:    '❌ Calls are not accepted on this bot.',
  },

  // ─── Rate Limiting ───────────────────────────
  rateLimit: {
    maxCommands: 10,
    windowMs:    10000,   // per 10 seconds
  },

  // ─── Logging ─────────────────────────────────
  logLevel: 'info',       // 'info' | 'debug' | 'warn' | 'error'

  // ─── Web Server Port ─────────────────────────
  port: 3000,

  // ─── Assets ──────────────────────────────────
  assets: {
    menuImage: './assets/menu.jpg',
    menuAudio: './assets/menu.mp3',
  },

};

module.exports = config;