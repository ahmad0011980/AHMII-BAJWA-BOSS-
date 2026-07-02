// ============================================
//       𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺 BOT - CONSTANTS & STRINGS
// ============================================

const { toSmallCaps } = require('../utils/fonts');

const CONSTANTS = {

  // ─── Bot Info ────────────────────────────────
  BOT_NAME: toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺'),
  DEVELOPER: toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺'),
  VERSION: '1.0.0',

  // ─── Status Messages ─────────────────────────
  MESSAGES: {
    CONNECTED: `╔═══════════════════════╗
║   ${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')} - CONNECTED   ║
╚═══════════════════════╝

✅ *Bot is now Online!*
📱 WhatsApp connected successfully.`,

    DISCONNECTED: `⚠️ *${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')}* has been disconnected.`,

    UNAUTHORIZED: `❌ *Access Denied!*\nYou are not authorized to use this command.`,

    OWNER_ONLY: `👑 *Owner Only Command!*\nThis command can only be used by the bot owner.`,

    WAIT: `⏳ *Please wait...*`,

    ERROR: `❌ *An error occurred!*\nPlease try again later.`,

    INVALID_CMD: `❌ *Invalid command usage!*\nType *.menu* to see all commands.`,
  },

  // ─── Telegram Messages ───────────────────────
  TELEGRAM: {
    WELCOME: (firstName) =>
`🤖 *Welcome to ${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')} Bot!*

Hello *${firstName}* 👋

THIS IS PROFESSIONAL & MULTI FEATURES MD BOT 
THIS MD BOT MADE BY SHEHRYAR & ZAIN

━━━━━━━━━━━━━━━━━━
👨‍💻 *Developer:* ${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')}
🔖 *Version:* 1.0.0
━━━━━━━━━━━━━━━━━━

Please verify below to continue 👇`,

    VERIFIED: (firstName) =>
`✅ *Verification Successful!*

Welcome *${firstName}*! You now have full access to *${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')}* bot.

━━━━━━━━━━━━━━━━━━
📋 *Available Commands:*

🔗 /reqpair \`<number>\` — Generate WhatsApp pairing code
❓ /help — Show all commands
📊 /status — Check bot status
━━━━━━━━━━━━━━━━━━

_Type /reqpair followed by your number to connect WhatsApp_
_Example: /reqpair 923001234567_`,

    GENERATING_PAIR: (number) =>
`⏳ *Generating Pairing Code...*

📱 *Number:* \`+${number}\`
🔄 *Status:* Processing...

_Please wait a moment_`,

    PAIR_CODE_READY: (number, code) =>
`✅ *Pairing Code Generated!*

📱 *Number:* \`+${number}\`
🔑 *Your Pairing Code:*

┌─────────────────┐
│   \`${code}\`   │
└─────────────────┘

📋 *How to use:*
1. Open WhatsApp on your phone
2. Go to *Settings > Linked Devices*
3. Tap *Link a Device*
4. Select *Link with phone number*
5. Enter the code above

⏰ *This code expires in 2 minutes!*`,

    PAIR_EXPIRED: `❌ *Pairing Code Expired!*\nPlease generate a new code using /reqpair`,

    BOT_CONNECTED: (number) =>
`🎉 *Bot Connected Successfully!*

📱 *Number:* \`+${number}\`
✅ *Status:* Online

You can now use the WhatsApp bot!
Type *.menu* on WhatsApp to see all commands.`,

    INVALID_NUMBER: `❌ *Invalid number format!*\nPlease use: /reqpair 923001234567\n_(Include country code, no + or spaces)_`,
  },

  // ─── Command Categories ───────────────────────
  CATEGORIES: {
    GENERAL: '🌐 General',
    GROUP: '👥 Group',
    MEDIA: '🎬 Media',
    FUN: '🎮 Fun',
    UTILITY: '🛠️ Utility',
    DOWNLOADER: '⬇️ Downloader',
    SEARCH: '🔍 Search',
    STICKER: '🖼️ Sticker',
    ADMIN: '👑 Admin',
    OWNER: '🔒 Owner',
  },

  // ─── Reaction Emojis ─────────────────────────
  REACTIONS: {
    PROCESSING: '⏳',
    SUCCESS: '✅',
    ERROR: '❌',
    WAIT: '🔄',
    DONE: '✔️',
  },
};

module.exports = CONSTANTS;
