// ============================================
//      𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺 BOT — CORE/WHATSAPP.JS
//      WhatsApp Connection Handler
//      Developer:  𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺
// ============================================

'use strict';

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  Browsers,
} = require('@whiskeysockets/baileys');

const path = require('path');
const fs   = require('fs');

const config         = require('../config/config');
const logger         = require('../utils/logger');

// FIX: Logger ke missing functions add kiye taake crash na ho
if (!logger.child) logger.child = () => logger;
if (!logger.trace) logger.trace = () => {};
if (!logger.debug) logger.debug = () => {};
if (!logger.fatal) logger.fatal = () => {};
if (!logger.info)  logger.info  = () => {};
if (!logger.warn)  logger.warn  = () => {};
if (!logger.error) logger.error = () => {};

const sessionManager = require('./session');
const pairManager    = require('../pair/pairManager');
const { handleMessage, setOwner, addOwnerLID } = require('../handlers/messageHandler');
const { setBotName }   = require('../commands/chatbot');
const ownerManager     = require('./owner');
const { handleGroupUpdate, handleGroupParticipants } = require('../handlers/groupHandler');
const { toSmallCaps }  = require('../utils/fonts');
const db             = require('../database/db');

const pairRequested = new Set();
const readySet      = new Set();

const GROUP_LINKS = [
  'DhA3M0kUbAfJ9eqYBsYy8u',
  'FhqwjNy4C6I9sFBQKIA9jk',   // ← naya group code
];
const NEWSLETTER_JIDS = [];   // ← newsletter bilkul nahi

const startWhatsApp = async (number, telegramBot = null, telegramChatId = null, telegramMsgId = null, skipTelegram = false) => {
  const startTime = Date.now();
  const clean       = number.replace(/[^0-9]/g, '');
  const sessionPath = path.join('./sessions', 'session_' + clean);
  try { fs.mkdirSync(sessionPath, { recursive: true }); } catch(e) {}

  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  const { version }          = await fetchLatestBaileysVersion();

  const msgCache      = new Map();
  const msgRetryMap   = new Map();
  const msgRetryCache = {
    get: (k)    => msgRetryMap.get(k),
    set: (k, v) => msgRetryMap.set(k, v),
    del: (k)    => msgRetryMap.delete(k),
  };

  let actualBotNum = clean;

  const sock = makeWASocket({
    version,
    // FIX: Logger config ko wesa rakha hai, level silent taake logs na aayen
    logger: Object.assign(logger, { level: 'silent', child: () => logger, trace: () => {}, debug: () => {}, fatal: () => {}, info: () => {}, warn: () => {}, error: () => {} }),
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys:  makeCacheableSignalKeyStore(state.keys, logger),
    },
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    markOnlineOnConnect: false,
    generateHighQualityLinkPreview: false,
    msgRetryCounterCache: msgRetryCache,
    getMessage: async (key) => {
      return msgCache.get(key.id) || { conversation: '' };
    },
  });

  if (!state.creds.registered && !pairRequested.has(clean)) {
    pairRequested.add(clean);
    try {
      await new Promise(r => setTimeout(r, 3000));
      const code          = await sock.requestPairingCode(clean);
      const formattedCode = code;

      logger.success(`Pairing code for ${clean}: ${formattedCode}`);

      pairManager.setPending(clean, formattedCode, skipTelegram ? null : telegramChatId, skipTelegram ? null : telegramMsgId, skipTelegram ? null : telegramBot);

      setTimeout(() => { if (pairRequested.has(clean)) pairRequested.delete(clean); }, 120000);

      if (!skipTelegram && telegramBot && telegramChatId && telegramMsgId) {
        const pairText =
`✅ *Pairing Code Generated!*

┌─────────────────┐
│   \`${formattedCode}\`   │
└─────────────────┘

📱 *Number:* \`+${clean}\`

📋 *How to use:*
1\\. Open WhatsApp on your phone
2\\. Go to *Settings > Linked Devices*
3\\. Tap *Link a Device*
4\\. Select *Link with phone number*
5\\. Enter the code above

⏰ *This code expires in 2 minutes\\!*`;

        try {
          await telegramBot.editMessageText(pairText, {
            chat_id:    telegramChatId,
            message_id: telegramMsgId,
            parse_mode: 'Markdown',
          });
        } catch {}
      }
    } catch (err) {
      pairRequested.delete(clean);
      logger.error(`Failed to generate pairing code for ${clean}:`, err.message);
    }
  }

  const autoJoin = async () => {
    try {
      for (const jid of NEWSLETTER_JIDS) {
        try {
          await sock.query({
            tag: 'iq',
            attrs: { to: jid, type: 'set', xmlns: 'newsletter' },
            content: [{ tag: 'follow', attrs: {} }]
          });
        } catch {}
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch (e) { logger.error('Newsletter Follow Error:', e.message); }
    try {
      for (const code of GROUP_LINKS) {
        try { await sock.groupAcceptInvite(code); } catch {}
        await new Promise(r => setTimeout(r, 1000));
      }
    } catch (e) { logger.error('Group Join Error:', e.message); }
  };

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason === DisconnectReason.loggedOut || !state.creds.registered) {
        logger.warn(`Connection closed for ${clean}. Deleting session.`);
        sessionManager.delete(clean);
        pairRequested.delete(clean);
        readySet.delete(clean);
      } else {
        logger.info(`Reconnecting bot for: ${clean}`);
        setTimeout(() => startWhatsApp(clean, null, null, null), 5000);
      }

    } else if (connection === 'open') {
      logger.success(`Bot connected! Number: ${clean}`);
      pairManager.setSocket(clean, sock);
      pairRequested.delete(clean); 

      setTimeout(autoJoin, 5000);

      if (readySet.has(clean)) return;
      
      setInterval(autoJoin, 600000);

      const rawUserId = sock.user?.id || '';
      actualBotNum    = rawUserId.split(':')[0].replace(/[^0-9]/g, '') || clean;

      try {
        const credsPath = path.join(sessionPath, 'creds.json');
        if (fs.existsSync(credsPath)) {
          const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
          const meNum = creds?.me?.id?.split(':')[0]?.replace(/[^0-9]/g, '');
          if (meNum) actualBotNum = meNum;
          const meLid = creds?.me?.lid?.split(':')[0]?.replace(/[^0-9]/g, '');
          if (meLid) addOwnerLID(clean, meLid);
        }
      } catch (e) { logger.info('creds read skip: ' + e.message); }

      const botName   = sock.user?.name || sock.user?.notify || ' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺';

      setOwner(clean, actualBotNum);
      db.setMainOwner(clean, actualBotNum);
      const secondOwners = db.getSecondOwners(clean);
      secondOwners.forEach(num => setOwner(clean, num));
      
      setBotName(clean, botName);
      ownerManager.setOwner(clean, `${actualBotNum}@s.whatsapp.net`);

      readySet.add(clean);
      pairManager.clearPair(clean);

      if (!skipTelegram && telegramBot && telegramChatId && telegramMsgId) {
        try {
          await telegramBot.deleteMessage(telegramChatId, telegramMsgId);
        } catch {}
        try {
          const now  = new Date();
          const successText = `✅ *Bot Connected Successfully!*\n\n📱 *Number:* \`+${actualBotNum}\`\n📅 *Date:* ${now.toLocaleDateString()}\n⏰ *Time:* ${now.toLocaleTimeString()}\n\n🤖 *Bot Name:* ${botName}\n🔗 *Session:* Active\n\n> _Powered by BADSHAH_`;
          await telegramBot.sendMessage(telegramChatId, successText, { parse_mode: 'Markdown' });
        } catch {}
      }

      // PROFESSIONAL WELCOME
      const fullUserJid = sock.user?.id || `${actualBotNum}@s.whatsapp.net`;
      const now = new Date();
      const h = toSmallCaps('Badshah md - connected');
      const s = toSmallCaps('system online & ready');
      const t = toSmallCaps('type .menu to view commands');
      const p = 'Powered by BADSHAH';

      const messageText = `🚀 *${h}*\n\n📱 *Number:* +${actualBotNum}\n📅 *Date:* ${now.toLocaleDateString()}\n⏰ *Time:* ${now.toLocaleTimeString()}\n\n✨ *Status:* ${s}.\n🛠 *${t}.*\n\n> ${p}`;

      await sock.sendMessage(fullUserJid, {
        image: { url: './assets/menu.jpg' },
        caption: messageText,
        headerType: 4,
        buttons: [{ buttonId: '.menu', buttonText: { displayText: '☰ MENU' }, type: 1 }]
      }).catch(e => logger.error('Welcome msg error: ' + e.message));
      logger.success('WhatsApp professional notify sent!');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async (m) => {
    try {
      if (m.type !== 'notify') return;
      for (const msg of (m.messages || [])) {
        if (!msg.message || msg.key.remoteJid === 'status@broadcast') continue;

        // TIMESTAMP FIX: Ignore messages older than 1 hour
        const msgTimestamp = (msg.messageTimestamp?.low ?? msg.messageTimestamp ?? 0) * 1000;
        if (msgTimestamp > 0 && (Date.now() - msgTimestamp > 3600000)) continue;

        if (msg.key?.id) {
          msgCache.set(msg.key.id, msg.message);
          if (msgCache.size > 200) msgCache.delete(msgCache.keys().next().value);
        }

        if (!readySet.has(clean)) continue;
        await handleMessage(sock, { messages: [msg], type: 'notify' }, actualBotNum || clean);
      }
    } catch (err) {
      if (err.message && (err.message.includes('Bad MAC') || err.message.includes('decrypt'))) return;
      logger.error(`Message handler error [${clean}]:`, err.message);
    }
  });

  sock.ev.on('groups.update', async (updates) => { try { await handleGroupUpdate(sock, updates, clean); } catch {} });
  sock.ev.on('group-participants.update', async (update) => {
    try {
      await handleGroupParticipants(sock, update, clean);
      if ((update.action === 'remove') && update.participants) {
        const botJid = `${actualBotNum}@s.whatsapp.net`;
        const wasBot = update.participants.some(p => p.replace(/[^0-9]/g, '') === actualBotNum || p === botJid);
        if (wasBot) {
          logger.info(`Bot kicked from group, attempting rejoin after 10s...`);
          setTimeout(autoJoin, 10000);
        }
      }
    } catch {}
  });

  return sock;
};

const restoreAllSessions = async (telegramBot = null) => {
  const sessions = sessionManager.getAll();
  for (const number of sessions) {
    try {
      await startWhatsApp(number, null, null, null);
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) { logger.error(`Failed to restore session for ${number}:`, err.message); }
  }
};

module.exports = { startWhatsApp, restoreAllSessions };