// ============================================
//      𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺 BOT — COMMANDS/MENU.JS
//      .menu Command — Full Command List
// ============================================

'use strict';

const fs      = require('fs');
const path    = require('path');
const config  = require('../config/config');
const { toSmallCaps } = require('../utils/fonts');
const db            = require('../database/db'); 

const run = async (ctx) => {
  const { sock, msg, from, botNum, isGroup, react } = ctx;

  await react('⏳');

  // ─── Animation: 1 Second Total ────
  if (isGroup) {
    const { key } = await sock.sendMessage(from, { text: '✨ BADSHAH ᴍᴅ ɪs sᴛᴀʀᴛɪɴɢ...' }, { quoted: msg });
    
    const frames = [
      { p: '25%',  b: '▰▱▱▱▱▱▱▱▱▱', s: '🔌 ᴄᴏɴɴᴇᴄᴛɪɴɢ...' },
      { p: '50%',  b: '▰▰▰▰▰▱▱▱▱▱', s: '📥 ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴅᴀᴛᴀ...' },
      { p: '75%',  b: '▰▰▰▰▰▰▰▰▱▱', s: '⚙️ ᴘʀᴏᴄᴇssɪɴɢ...' },
      { p: '100%', b: '▰▰▰▰▰▰▰▰▰▰', s: '✅ ᴅᴏɴᴇ!' }
    ];

    for (const frame of frames) {
      let loadingText = `╭━━〔 ⌬ © 𓆩 BADSHAH-ＭＤ 𓆪 〕━━┈⊷
┃✮│ ${frame.b} ${frame.p}
┃✮│ ${frame.s}
╰━━━━━━━━━━━━━━┈⊷`;
      await sock.sendMessage(from, { edit: key, text: loadingText });
      await new Promise(resolve => setTimeout(resolve, 250)); 
    }
  }

  const prefix = config.prefix;
  const time = new Date().toLocaleTimeString('en-PK', { timeZone: 'Asia/Karachi' });
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const user = msg.pushName || 'User';
  const botMode = db.getBotMode(botNum.replace(/[^0-9]/g,''));

  const menuText =
`╭━━〔𓆩 B A  D S H A H-ＭＤ 𓆪〕━━┈⊷
┃✮╭────────────────
┃✮│ ʙᴏᴛ ɴᴀᴍᴇ : *BASDHAH ᴍᴅ*
┃✮│ ᴜsᴇʀ : *${user}*
┃✮│ ᴅᴇᴠ : *BASDHAH*
┃✮│ ᴍᴏᴅᴇ : *${botMode === 'public' ? 'ᴘᴜʙʟɪᴄ' : 'ᴘʀɪᴠᴀᴛᴇ'}*
┃✮│ ᴘʀᴇғɪx : *[ ${prefix} ]*
┃✮│ ᴛɪᴍᴇ : *${time}*
┃✮│ ᴅᴀᴛᴇ : *${date}*
┃✮╰────────────────
╰━━━━━━━━━━━━━━━┈⊷
          ʜᴇʏ ${user}
  𓆩 B A D S H A H-ＭＤ 𓆪 ᴀᴛ ʏᴏᴜʀ sᴇʀᴠɪᴄᴇ

╔═══ 🌐 ${toSmallCaps('general')} ═══╗
│  ${toSmallCaps('menu')}     — ${toSmallCaps('view all commands')}
│  ${toSmallCaps('ping')}     — ${toSmallCaps('check bot response')}
│  ${toSmallCaps('alive')}    — ${toSmallCaps('check bot status')}
│  ${toSmallCaps('info')}     — ${toSmallCaps('bot information')}
│  ${toSmallCaps('uptime')}   — ${toSmallCaps('bot running time')}
│  ${toSmallCaps('speed')}    — ${toSmallCaps('response speed test')}
│  ${toSmallCaps('owner')}    — ${toSmallCaps('owner information')}
│  ${toSmallCaps('pair')}     — ${toSmallCaps('re-pair bot session')}
╚════════════════════╝

╔═══ 👑 ${toSmallCaps('owner only')} ═══╗
│  ${toSmallCaps('mode')}         — ${toSmallCaps('switch public / private')}
│  ${toSmallCaps('addowner')}     — ${toSmallCaps('add a sudo owner')}
│  ${toSmallCaps('removeowner')}  — ${toSmallCaps('remove sudo owner')}
│  ${toSmallCaps('antidelete')}   — ${toSmallCaps('toggle antidelete')}
│  ${toSmallCaps('chatbotdm')}    — ${toSmallCaps('toggle ai in dm')}
│  ${toSmallCaps('chatbotgroup')} — ${toSmallCaps('toggle ai in groups')}
│  ${toSmallCaps('broadcast')}    — ${toSmallCaps('broadcast a message')}
│  ${toSmallCaps('block')}        — ${toSmallCaps('block a user')}
│  ${toSmallCaps('unblock')}      — ${toSmallCaps('unblock a user')}
│  ${toSmallCaps('restart')}      — ${toSmallCaps('restart the bot')}
│  ${toSmallCaps('afk')}          — ${toSmallCaps('set away status')}
│  ${toSmallCaps('pnotify')}      — ${toSmallCaps('promote notification')}
│  ${toSmallCaps('dnotify')}      — ${toSmallCaps('demote notification')}
│  ${toSmallCaps('restrict')}     — ${toSmallCaps('restrict a user')}
│  ${toSmallCaps('unrestrict')}   — ${toSmallCaps('unrestrict a user')}
╚════════════════════╝

╔═══ 👥 ${toSmallCaps('group')} ═══╗
│  ${toSmallCaps('kick')}     — ${toSmallCaps('remove a member')}
│  ${toSmallCaps('add')}      — ${toSmallCaps('add a member')}
│  ${toSmallCaps('promote')}  — ${toSmallCaps('promote to admin')}
│  ${toSmallCaps('demote')}   — ${toSmallCaps('demote from admin')}
│  ${toSmallCaps('mute')}     — ${toSmallCaps('mute the group')}
│  ${toSmallCaps('unmute')}   — ${toSmallCaps('unmute the group')}
│  ${toSmallCaps('tagall')}   — ${toSmallCaps('mention all members')}
│  ${toSmallCaps('hidetag')}  — ${toSmallCaps('silent mention all')}
│  ${toSmallCaps('groupinfo')}— ${toSmallCaps('group details')}
│  ${toSmallCaps('setname')}  — ${toSmallCaps('change group name')}
│  ${toSmallCaps('setdesc')}  — ${toSmallCaps('change group description')}
│  ${toSmallCaps('setppgc')}  — ${toSmallCaps('set group profile photo')}
│  ${toSmallCaps('linkgc')}   — ${toSmallCaps('get invite link')}
│  ${toSmallCaps('revokegc')} — ${toSmallCaps('reset invite link')}
│  ${toSmallCaps('antilink')} — ${toSmallCaps('toggle anti-link filter')}
│  ${toSmallCaps('warn')}     — ${toSmallCaps('warn a member')}
│  ${toSmallCaps('resetwarn')}— ${toSmallCaps('reset member warnings')}
│  ${toSmallCaps('welcome')}  — ${toSmallCaps('toggle welcome message')}
│  ${toSmallCaps('bye')}      — ${toSmallCaps('toggle goodbye message')}
╚════════════════════╝

╔═══ 🎬 ${toSmallCaps('media')} ═══╗
│  ${toSmallCaps('play')}     — ${toSmallCaps('stream audio by name')}
│  ${toSmallCaps('video')}    — ${toSmallCaps('stream video by name')}
│  ${toSmallCaps('song')}     — ${toSmallCaps('download audio')}
│  ${toSmallCaps('gif')}      — ${toSmallCaps('search and send gif')}
│  ${toSmallCaps('tomp3')}    — ${toSmallCaps('convert video to mp3')}
╚════════════════════╝

╔═══ 🖼️ ${toSmallCaps('sticker')} ═══╗
│  ${toSmallCaps('sticker')}  — ${toSmallCaps('convert image to sticker')}
│  ${toSmallCaps('toimg')}    — ${toSmallCaps('convert sticker to image')}
│  ${toSmallCaps('stickerinfo')}— ${toSmallCaps('sticker metadata')}
│  ${toSmallCaps('emojimix')} — ${toSmallCaps('mix two emojis')}
╚════════════════════╝

╔═══ ⬇️ ${toSmallCaps('downloader')} ═══╗
│  ${toSmallCaps('ytmp3')}    — ${toSmallCaps('youtube to mp3')}
│  ${toSmallCaps('ytmp4')}    — ${toSmallCaps('youtube to mp4')}
│  ${toSmallCaps('tiktok')}   — ${toSmallCaps('download tiktok video')}
│  ${toSmallCaps('instagram')}— ${toSmallCaps('download instagram media')}
│  ${toSmallCaps('facebook')} — ${toSmallCaps('download facebook video')}
│  ${toSmallCaps('twitter')}  — ${toSmallCaps('download twitter media')}
│  ${toSmallCaps('terabox')}  — ${toSmallCaps('download from terabox')}
╚════════════════════╝

╔═══ 🔍 ${toSmallCaps('search')} ═══╗
│  ${toSmallCaps('google')}   — ${toSmallCaps('search the web')}
│  ${toSmallCaps('weather')}  — ${toSmallCaps('get weather info')}
│  ${toSmallCaps('wiki')}     — ${toSmallCaps('search wikipedia')}
│  ${toSmallCaps('lyrics')}   — ${toSmallCaps('find song lyrics')}
│  ${toSmallCaps('image')}    — ${toSmallCaps('search images')}
│  ${toSmallCaps('wallpaper')}— ${toSmallCaps('search wallpapers')}
│  ${toSmallCaps('siminfo')}  — ${toSmallCaps('sim number lookup')}
│  ${toSmallCaps('cnicinfo')} — ${toSmallCaps('cnic data lookup')}
╚════════════════════╝

╔═══ 🎮 ${toSmallCaps('fun')} ═══╗
│  ${toSmallCaps('joke')}     — ${toSmallCaps('get a random joke')}
│  ${toSmallCaps('quote')}    — ${toSmallCaps('get a random quote')}
│  ${toSmallCaps('fact')}     — ${toSmallCaps('get a random fact')}
│  ${toSmallCaps('8ball')}    — ${toSmallCaps('ask the magic ball')}
│  ${toSmallCaps('dare')}     — ${toSmallCaps('dare challenge')}
│  ${toSmallCaps('truth')}    — ${toSmallCaps('truth question')}
│  ${toSmallCaps('ship')}     — ${toSmallCaps('ship two people')}
│  ${toSmallCaps('rate')}     — ${toSmallCaps('rate anything')}
╚════════════════════╝

╔═══ 🛠️ ${toSmallCaps('utility')} ═══╗
│  ${toSmallCaps('tts')}      — ${toSmallCaps('text to speech')}
│  ${toSmallCaps('translate')}— ${toSmallCaps('translate any language')}
│  ${toSmallCaps('qr')}       — ${toSmallCaps('generate qr code')}
│  ${toSmallCaps('calc')}     — ${toSmallCaps('calculate expression')}
│  ${toSmallCaps('shorturl')} — ${toSmallCaps('shorten a url')}
│  ${toSmallCaps('reverse')}  — ${toSmallCaps('reverse a text')}
│  ${toSmallCaps('fancy')}    — ${toSmallCaps('stylish text fonts')}
│  ${toSmallCaps('viewonce')} — ${toSmallCaps('bypass view once')}
╚════════════════════╝

> ${toSmallCaps('Powered by BADSHAH')}`;

  const contextInfo = {
  forwardingScore: 999,
  isForwarded: true
};

  const menuImagePath = path.resolve(config.assets.menuImage);
  const menuAudioPath = path.resolve(config.assets.menuAudio);

  if (fs.existsSync(menuImagePath)) {
    await sock.sendMessage(from, {
      image: fs.readFileSync(menuImagePath),
      caption: menuText,
      contextInfo: contextInfo
    }, { quoted: msg });
  } else {
    await sock.sendMessage(from, { 
      text: menuText,
      contextInfo: contextInfo
    }, { quoted: msg });
  }

  if (fs.existsSync(menuAudioPath)) {
    await sock.sendMessage(from, {
      audio: fs.readFileSync(menuAudioPath),
      mimetype: 'audio/mp4',
      ptt: false,
    }, { quoted: msg });
  }

  await react('✅');
};

module.exports = { run };
