/*
 * © 2026 SeXyxeon (VOIDSEC)
 *
 * ⚠️ COPYRIGHT NOTICE
 * This source code is protected under copyright law.
 * Any form of re-uploading, recoding, modification,
 * selling, or redistribution WITHOUT explicit permission
 * from the original author is strictly prohibited.
 *
 * ❌ NO CREDIT = NO PERMISSION
 * ❌ DO NOT CLAIM THIS CODE AS YOUR OWN
 *
 * ✔️ Usage or modification is allowed ONLY
 * with prior permission and proper credit.
 *
 * OFFICIAL LINKS (ONLY):
 * YouTube   : https://youtube.com/@voidsec7718
 * Instagram : sabir._7718
 * Telegram  : https://t.me/SABIR7718
 * GitHub    : https://github.com/SABIR7718
 * WhatsApp  : +91 73650 85213
 *
 * Violations may result in DMCA takedown
 * or termination of the Telegram bot.
 */
 

const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const {
    log
} = require("@sabir7718/log");

const S7HaTeSY = process.env.BOT_TOKEN;

const SYHaTe = new TelegramBot(S7HaTeSY, {
    polling: true
});

const HaTeSY = express();

const PORT = process.env.PORT || 3000;

const START_TIME = Date.now();

HaTeSY.get("/", (req, res) => {
    const uptime = Math.floor((Date.now() - START_TIME) / 1000);

    res.json({
        status: "online",
        uptime: `${uptime}s`,
        time: new Date().toLocaleString(),
        owner: "SABIR7718"
    });
});

process.on("unhandledRejection", (reason, promise) => {
    log("error", "CRITICAL", `Unhandled Rejection at: ${promise} | Reason: ${reason}`);
});

process.on("uncaughtException", (error) => {
    log("error", "CRITICAL", `Uncaught Exception: ${error.message}`);
});

HaTeSY.listen(PORT, () => {
    log("info", "SYSTEM", `Server running on port ${PORT}`);
});

function SABIR7718(text) {
    const S7 = /\(emoji\)(\d+)\(\/emoji\)/g;

    let SY = "";
    let HaTe = [];
    let lastIndex = 0;
    let match;

    while ((match = S7.exec(text)) !== null) {
        const before = text.slice(lastIndex, match.index);

        SY += before;

        const offset = [...SY].length;

        SY += "😀";

        HaTe.push({
            type: "custom_emoji",
            offset,
            length: 2,
            custom_emoji_id: match[1]
        });

        lastIndex = match.index + match[0].length;
    }

    SY += text.slice(lastIndex);

    return {
        text: SY,
        entities: HaTe
    };
}

SYHaTe.onText(/^\/start$/, async (msg) => {
    const uptime = Math.floor((Date.now() - START_TIME) / 1000);

    await SYHaTe.sendMessage(
        msg.chat.id,
        `✨ <b>PREMIUM EMOJI BOT BY S7</b> ✨
──────────────────────────

<blockquote>⏰ <b>Time:</b> ${new Date().toLocaleString()}
🚀 <b>Uptime:</b> ${uptime}s</blockquote>

📖 <b>USAGE GUIDE</b>

🔹 <b>Target Yourself:</b>
<code>/emoji me (emoji)[emoji_id](/emoji) Your Message</code>

🔹 <b>Target Specific User:</b>
<code>/emoji [user_id] (emoji)[emoji_id](/emoji) Your Message</code>

💡 <b>Real Example (Click to Copy):</b>
<code>/emoji me (emoji)5375385315949158491(/emoji) Hello</code>

──────────────────────────
<i>Status: Active & Optimized</i> ⚡`, {
            parse_mode: 'HTML'
        }
    );


});

SYHaTe.onText(/^\/emoji(?:\s+(.+))?/, async (msg, match) => {
    try {
        const S7HaTe = match[1];

        if (!S7HaTe) {
            return SYHaTe.sendMessage(
                msg.chat.id,
                `❌ <b>Wrong Usage!</b>\n\n<code>/emoji me (emoji)5375385315949158491(/emoji)Hello</code>`, {
                    parse_mode: 'HTML'
                }
            );
        }

        const args = S7HaTe.split(" ");

        let target = msg.chat.id;

        if (
            args[0] !== "me" &&
            /^-?\d+$/.test(args[0])
        ) {
            target = args.shift();
        } else if (args[0] === "me") {
            args.shift();
        }

        const content = args.join(" ");

        const parsed = SABIR7718(content);

        await SYHaTe.sendMessage(
            target,
            parsed.text, {
                entities: parsed.entities
            }
        );

        log("info", "SYSTEM", `Message sent to ${target}`);

    } catch (e) {
        console.log(e);

        log("error", "SYSTEM", e.message);
    }
});

if (process.env.URL) {

    (async () => {
        try {
            const res = await fetch(process.env.URL);
            log('info', 'PING', `Pinged: ${process.env.URL} | Status: ${res.status}`);
        } catch (err) {
            log('error', 'PING', err.message);
        }
    })();

    setInterval(async () => {
        try {
            const res = await fetch(process.env.URL);
            log('info', 'PING', `Pinged: ${process.env.URL} | Status: ${res.status}`);
        } catch (err) {
            log('error', 'PING', err.message);
        }
    }, 5 * 60 * 1000);
}
