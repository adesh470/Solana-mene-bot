
const { Telegraf } = require('telegraf');
const axios = require('axios');
const trackedUsers = [
    "blknoiz06", "LarpVonTrier", "artsch00lreject", "Poe_Ether",
    "thecexoffender", "arrogantfrfr", "larpalt", "iambroots", "UniswapVillain"
];
const memeKeywords = ["$pepe", "$rekt", "$wojak", "$jeet", "$doge", "$shib", "launch", "mint", "just dropped"];

const bot = new Telegraf(process.env.BOT_TOKEN);
const TELEGRAM_USER_ID = process.env.TELEGRAM_USER_ID;

bot.start((ctx) => {
    if (ctx.message.from.id.toString() === TELEGRAM_USER_ID) {
        ctx.reply("✅ Meme Coin Alert Bot Activated!");
    } else {
        ctx.reply("❌ You are not authorized to use this bot.");
    }
});

async function fetchRecentTweets() {
    // Simulated tweets for demo (replace with Twitter API stream)
    const sampleTweets = [
        { username: "LarpVonTrier", text: "Launching $REKT now! Big alpha incoming 🚀" },
        { username: "iambroots", text: "just dropped $WOJAK live on Solana" }
    ];

    for (const tweet of sampleTweets) {
        if (trackedUsers.includes(tweet.username)) {
            const matches = memeKeywords.filter((word) =>
                tweet.text.toLowerCase().includes(word.toLowerCase())
            );
            if (matches.length > 0) {
                const token = matches.find((w) => w.startsWith("$")) || "unknown";
                const msg = `🚨 Tweet by @${tweet.username}

"${tweet.text}"

🪙 Token: ${token}
🔗 Dex: https://dexscreener.com/solana`;
                await bot.telegram.sendMessage(TELEGRAM_USER_ID, msg);
            }
        }
    }
}

setInterval(fetchRecentTweets, 60000); // Check every 60 seconds
bot.launch();
