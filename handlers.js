// ============================================
//      𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺 BOT — TELEGRAM/HANDLERS.JS
//     Telegram Message & Command Handlers
// ============================================

'use strict';

const config      = require('../config/config');
const { toSmallCaps } = require('../utils/fonts');
const pairManager = require('../pair/pairManager');
const sessionManager = require('../core/session');

// ─── /start Handler ───────────────────────────
const handleStart = async (bot, chatId, userId, firstName, verifiedUsers) => {

  const alreadyVerified = verifiedUsers.get(userId);

  const welcomeText =
`🤖 *Welcome to ${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')} Bot!*

Hello *${firstName}* 👋

THIS IS SHEHRYAR MD BOT & THIS HAS SO MANY FEATURES & THIS BOT MADE BY SHEHRYAR & ZAIN

━━━━━━━━━━━━━━━━━━━━
👨‍💻 *Developer:* ${toSmallCaps('Badshah')}
🔖 *Version:* ${config.version}
━━━━━━━━━━━━━━━━━━━━

${alreadyVerified ? '✅ You are already verified!' : '🔐 Please verify below to continue 👇'}`;

  // ─── Inline Buttons ───────────────────────
  const keyboard = alreadyVerified
    ? {
        inline_keyboard: [
          [
            { text: '📢 ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ 1', url: config.channels.channel1 },
            { text: '📢 ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ 2', url: config.channels.channel2 },
          ],
        ],
      }
    : {
        inline_keyboard: [
          [
            { text: '✅ ᴠᴇʀɪꜰʏ', callback_data: 'verify' },
          ],
          [
            { text: '📢 ᴄʜᴀɴɴᴇʟ 1', url: config.channels.channel1 },
            { text: '📢 ᴄʜᴀɴɴᴇʟ 2', url: config.channels.channel2 },
          ],
        ],
      };

  await bot.sendMessage(chatId, welcomeText, {
    parse_mode:   'Markdown',
    reply_markup: keyboard,
  });
};

// ─── After Verify Handler ─────────────────────
const handleVerify = async (bot, chatId, firstName) => {

  const text =
`✅ *Verification Successful!*

Welcome *${firstName}*! You now have full access to *${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')}* bot.

━━━━━━━━━━━━━━━━━━━━
📋 *Available Commands:*

🔗 /reqpair \`<number>\` — Connect WhatsApp
❓ /help — Show all commands
📊 /status — Bot status
━━━━━━━━━━━━━━━━━━━━

*Example:*
\`/reqpair 923001234567\`
_(Include country code, no + or spaces)_`;

  await bot.sendMessage(chatId, text, {
    parse_mode: 'Markdown',
  });
};

// ─── /help Handler ────────────────────────────
const handleHelp = async (bot, chatId) => {

  const text =
`📖 *${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')} — Help Menu*

━━━━━━━━━━━━━━━━━━━━
🤖 *Telegram Commands:*

/start — Start the bot
/reqpair \`<number>\` — Generate WhatsApp pairing code
/status — Check active connections
/help — Show this menu

━━━━━━━━━━━━━━━━━━━━
📱 *WhatsApp Commands:*

Type *.menu* on WhatsApp to see all available commands.

━━━━━━━━━━━━━━━━━━━━
📝 *How to Connect:*

1️⃣ Send \`/reqpair 923001234567\`
2️⃣ Copy the pairing code
3️⃣ Open WhatsApp → Settings → Linked Devices
4️⃣ Link a Device → Link with Phone Number
5️⃣ Enter the pairing code

⏰ Code expires in *2 minutes*

━━━━━━━━━━━━━━━━━━━━
👨‍💻 *Developer:* ${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')}`;

  await bot.sendMessage(chatId, text, {
    parse_mode: 'Markdown',
  });
};

// ─── /status Handler ──────────────────────────
const handleStatus = async (bot, chatId) => {

  const activeCount  = pairManager.activeCount();
  const pendingCount = pairManager.pendingCount();
  const sessionCount = sessionManager.count();
  const uptime       = Math.floor(process.uptime());
  const uptimeStr    = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`;

  const text =
`📊 *${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')} — Bot Status*

━━━━━━━━━━━━━━━━━━━━
🟢 *Status:* Online
⚡ *Version:* ${config.version}
⏱️ *Uptime:* ${uptimeStr}

━━━━━━━━━━━━━━━━━━━━
📱 *Connections:*
✅ Active:  ${activeCount}
⏳ Pending: ${pendingCount}
💾 Sessions: ${sessionCount}

━━━━━━━━━━━━━━━━━━━━
👨‍💻 *Developer:* ${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')}`;

  await bot.sendMessage(chatId, text, {
    parse_mode: 'Markdown',
  });
};

module.exports = {
  handleStart,
  handleVerify,
  handleHelp,
  handleStatus,
};
