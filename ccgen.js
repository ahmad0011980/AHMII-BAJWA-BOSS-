'use strict';

const toSmallCaps = (text) => {
    const map = {
        'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ꜰ','g':'ɢ','h':'ʜ','i':'ɪ','j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ',
        'n':'ɴ','o':'ᴏ','p':'ᴘ','q':'ǫ','r':'ʀ','s':'s','t':'ᴛ','u':'ᴜ','v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ',
        'A':'ᴀ','B':'ʙ','C':'ᴄ','D':'ᴅ','E':'ᴇ','F':'ꜰ','G':'ɢ','H':'ʜ','I':'ɪ','J':'ᴊ','K':'ᴋ','L':'ʟ','M':'ᴍ',
        'N':'ɴ','O':'ᴏ','P':'ᴘ','Q':'ǫ','R':'ʀ','S':'s','T':'ᴛ','U':'ᴜ','V':'ᴠ','W':'ᴡ','X':'x','Y':'ʏ','Z':'ᴢ'
    };
    return text.split('').map(c => map[c] || c).join('');
};

const generateLuhn = (prefix, length = 16) => {
    let cc = prefix.split('').map(Number);
    while (cc.length < length - 1) cc.push(Math.floor(Math.random() * 10));
    let sum = 0, shouldDouble = true;
    for (let i = cc.length - 1; i >= 0; i--) {
        let digit = cc[i];
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    cc.push((10 - (sum % 10)) % 10);
    return cc.join('');
};

const ccgen = async (ctx) => {
    const { args, reply } = ctx;
    if (args.length < 2) return reply(toSmallCaps("⚠️ ᴜsᴀɢᴇ: .ɢᴇɴ <ʙɪɴ> <ᴀᴍᴏᴜɴᴛ> ʀɴᴅ"));

    const bin = args[0];
    const amount = parseInt(args[1]);
    const firstDigit = bin[0];

    // Card Type Validation
    let cardType = "";
    let cvvLength = 3;
    let cardLength = 16;

    if (firstDigit === '4') cardType = "Visa Generated Cards";
    else if (firstDigit === '5') cardType = "Mastercard Generated Cards";
    else if (firstDigit === '3') { cardType = "Amex Generated Cards"; cvvLength = 4; cardLength = 15; }
    else if (firstDigit === '6') cardType = "Unionpay Generated Cards";
    else return reply(toSmallCaps("⚠️ ᴄᴀʀᴅs ɴᴏᴛ ᴀᴄᴄᴇᴘᴛᴇᴅ."));

    if (amount > 50) return reply(toSmallCaps("⚠️ ᴍᴀxɪᴍᴜᴍ ʟɪᴍɪᴛ ɪs 50 ᴄᴀʀᴅs."));

    const mode = args[2] ? args[2].toLowerCase() : 'rnd';
    let results = [];

    for (let i = 0; i < amount; i++) {
        const card = generateLuhn(bin, cardLength);
        let mm, yyyy, cvv;

        if (mode === 'rnd') {
            mm = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
            yyyy = String(new Date().getFullYear() + Math.floor(Math.random() * 5));
            cvv = cvvLength === 4 ? Math.floor(Math.random() * 9000) + 1000 : Math.floor(Math.random() * 900) + 100;
        } else {
            if (args.length < 5) return reply(toSmallCaps("⚠️ ɪɴᴠᴀʟɪᴅ ᴄᴜsᴛᴏᴍ ғᴏʀᴍᴀᴛ."));
            mm = args[2]; yyyy = args[3]; cvv = args[4];
        }
        results.push(`${card}|${mm}|${yyyy}|${cvv}`);
    }

    const title = toSmallCaps(" 𝑨𝑯𝑴𝑰𝑰 𝑩𝑨𝑱𝑾𝑨 𝑩𝑶𝑺𝑺  cc generator");
    const header = toSmallCaps(cardType + ":");
    
    reply(`*${title}*\n\n*${header}*\n\n${results.join('\n')}`);
};

module.exports = { ccgen };