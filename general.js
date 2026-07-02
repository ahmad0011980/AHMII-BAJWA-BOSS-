// ============================================
//       𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺BOT — COMMANDS/GENERAL.JS
//      General Commands — ping, alive, info...
// ============================================

'use strict';

const os      = require('os');
const config  = require('../config/config');
const { toSmallCaps, toBold } = require('../utils/fonts');
const ownerManager  = require('../core/owner');
const pairManager   = require('../pair/pairManager');
const sessionManager = require('../core/session');

// ─── .ping ────────────────────────────────────
const ping = async (ctx) => {
  const { sock, from, msg, react } = ctx;
  await react('⏳');
  const start = Date.now();
  const sent = await sock.sendMessage(from, { text: '🏓 *Pong!*' }, { quoted: msg });
  const end = Date.now();
  await sock.sendMessage(from, { 
    text: `⚡ *Response Time:* ${end - start}ms`, 
    edit: sent.key 
  });
  await react('✅');
};

// ─── .alive ───────────────────────────────────
const alive = async (ctx) => {
  const { sock, from, msg, botNum, react } = ctx;
  await react('🤖');

  const uptime  = Math.floor(process.uptime());
  const hours   = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;

  const text =
`╔══════════════════════╗
║   ${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')} — Online  ║
╚══════════════════════╝

✅ *Bot is Alive & Running!*

⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s
📱 *Connections:* ${pairManager.activeCount()}
🔖 *Version:* v${config.version}
👨‍💻 *Dev:* ${toSmallCaps('badshah')}`;

  await sock.sendMessage(from, { text });
};

// ─── .info ────────────────────────────────────
const info = async (ctx) => {
  const { sock, from, msg, botNum, react } = ctx;
  await react('ℹ️');

  const mem      = process.memoryUsage();
  const ramUsed  = (mem.rss / 1024 / 1024).toFixed(1);
  const platform = os.platform();
  const nodeVer  = process.version;
  const cpuModel = os.cpus()[0]?.model?.split(' ').slice(0, 3).join(' ') || 'Unknown';
  const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
  const freeRam  = (os.freemem() / 1024 / 1024 / 1024).toFixed(1);

  const text =
`🤖 *${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')} — Bot Info*

━━━━━━━━━━━━━━━━━━━━
📛 *Name:* ${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')}
👨‍💻 *Developer:* ${toSmallCaps('badshah')}
🔖 *Version:* v${config.version}
🌐 *Platform:* WhatsApp Multi-Device

━━━━━━━━━━━━━━━━━━━━
💻 *System Info:*
🖥️ CPU: ${cpuModel}
🧠 RAM Used: ${ramUsed} MB
💾 Total RAM: ${totalRam} GB
🆓 Free RAM: ${freeRam} GB
🔧 Node.js: ${nodeVer}
📟 OS: ${platform}

━━━━━━━━━━━━━━━━━━━━
📊 *Bot Stats:*
✅ Active: ${pairManager.activeCount()}
💾 Sessions: ${sessionManager.count()}
⏳ Pending: ${pairManager.pendingCount()}`;

  await sock.sendMessage(from, { text });
};

// ─── .speed ───────────────────────────────────
const speed = async (ctx) => {
  const { sock, from, msg, react } = ctx;
  await react('⚡');

  const start    = Date.now();
  const sentMsg  = await sock.sendMessage(from, { text: '⏳ *Calculating speed...*' });
  const end      = Date.now();
  const pingMs   = end - start;

  const mem      = process.memoryUsage();
  const ramUsed  = (mem.rss / 1024 / 1024).toFixed(1);

  await sock.sendMessage(from, {
    text:
`⚡ *${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')} — Speed Test*

🏓 *Ping:* ${pingMs}ms
🧠 *RAM:* ${ramUsed} MB
📶 *Status:* ${pingMs < 500 ? '🟢 Excellent' : pingMs < 1000 ? '🟡 Good' : '🔴 Slow'}`,
  });
};

// ─── .uptime ──────────────────────────────────
const uptime = async (ctx) => {
  const { reply, react } = ctx;
  await react('⏱️');

  const uptimeSec = Math.floor(process.uptime());
  const days      = Math.floor(uptimeSec / 86400);
  const hours     = Math.floor((uptimeSec % 86400) / 3600);
  const minutes   = Math.floor((uptimeSec % 3600) / 60);
  const seconds   = uptimeSec % 60;

  await reply(
    `⏱️ *${toSmallCaps(' 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺')} Uptime*\n\n` +
    `🕐 *${days}d ${hours}h ${minutes}m ${seconds}s*\n\n` +
    `_Running continuously since last start_`
  );
};

// ─── .owner ───────────────────────────────────
const owner = async (ctx) => {
  const { sock, from, msg, react } = ctx;
  await react('👑');

  const developerNumber = '923';
  
  await sock.sendMessage(from, {
    text: `👑 *${toSmallCaps('developer details')}*

👨‍💻 *${toSmallCaps('developer')}:* BADSHAH
🌐 *${toSmallCaps('channel')}:* https://whatsapp.com/channel/0029VbCMDmHGJP8F9D3sUi2X`
  }, { quoted: msg });

  const vcard = 
    'BEGIN:VCARD\n' +
    'VERSION:3.0\n' +
    'FN:𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥\n' +
    'ORG:BADSHAH\n' +
    'TEL;type=CELL;type=VOICE;waid=' + developerNumber + ':+' + developerNumber + '\n' +
    'END:VCARD';

  await sock.sendMessage(from, {
    contacts: {
      displayName: '𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥',
      contacts: [{ vcard }]
    }
  }, { quoted: msg });
};

// ─── .pair ────────────────────────────────────
const pair = async (ctx) => {
  const { sock, from, msg, args, reply, react } = ctx;

  // Clean number: + hataya, spaces hataye, dashes hataye
  const number = args[0]?.replace(/\+/g, '').replace(/[\s-]/g, '');

  if (!number || number.length < 10) {
    return reply(`❌ *Usage:* \`${config.prefix}pair 923001234567\``);
  }

  const statusMsg = await reply(`⏳ *Generating code for +${number}...*`);

  try {
    const { startWhatsApp } = require('../core/whatsapp');
    await startWhatsApp(number, null, null, null, true);

    await new Promise(r => setTimeout(r, 3000));

    const pending = pairManager.getPending(number);
    if (pending?.code) {
      await sock.sendMessage(from, { 
        text: `✅ *Pairing Code Generated!*\n\n📱 *Number:* \`+${number}\`\n🔑 *Code:* \`${pending.code}\`\n\n*Steps:*\n1. Open WhatsApp Settings\n2. Linked Devices → Link a Device\n3. Link with Phone Number\n4. Enter the code above\n\n⏰ _Code expires in 2 minutes_`, 
        edit: statusMsg.key 
      });
      await reply(`\`${pending.code}\``);
    } else {
      await sock.sendMessage(from, { text: `❌ *Failed to generate code.*`, edit: statusMsg.key });
    }
  } catch (err) {
    await sock.sendMessage(from, { text: `❌ *Error:* ${err.message}`, edit: statusMsg.key });
  }
};

module.exports = { ping, alive, info, speed, uptime, owner, pair };