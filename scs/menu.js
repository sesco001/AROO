const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { adams } = require(__dirname + "/../Ibrahim/adams");
const { format } = require(__dirname + "/../Ibrahim/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../config");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

// Function to fetch GitHub repo data
const fetchGitHubStats = async () => {
    try {
        const repo = 'Devibraah/BWM-XMD';
        const response = await axios.get(`https://api.github.com/repos/${repo}`);
        const forks = response.data.forks_count;
        const stars = response.data.stargazers_count;
        const totalUsers = (forks * 2) + (stars * 2);
        return { forks, stars, totalUsers };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 }; 
    }
};

adams({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../Ibrahim/adams");
    var coms = {};
    var mode = s.MODE.toLowerCase() === "public" ? "🌍 Public" : "🔒 Private";

    cm.map((com) => {
        const categoryUpper = com.categorie.toUpperCase();
        if (!coms[categoryUpper]) coms[categoryUpper] = [];
        coms[categoryUpper].push(com.nomCom);
    });

    moment.tz.setDefault(`${s.TZ}`);
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const hour = moment().hour();

    let greeting = "🌙 Good Night";
    if (hour >= 0 && hour <= 11) greeting = "🌅 Good Morning";
    else if (hour >= 12 && hour <= 16) greeting = "☀️ Good Afternoon";
    else if (hour >= 16 && hour <= 21) greeting = "🌆 Good Evening";

    const { totalUsers } = await fetchGitHubStats();
    const formattedTotalUsers = totalUsers.toLocaleString();

    let infoMsg = `
╭─────◆◇◆────◆
🤖🦠 *MAKAMESCO MD* 🦠🤖
╰─────◆◇◆────◆

🕹 *Mode:* ${mode}  
🛠 *Prefix:* [ ${prefixe} ]  
💻 *Platform:* ${os.platform()}  
📅 *Date:* ${date}  
⏰ *Time:* ${temps}  
⚡ *RAM:* ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}  
👥 *Total Users:* ${formattedTotalUsers}  

🎭 *${greeting}, ${nomAuteurMessage}!*  
`;

    let menuMsg = `${readmore}  
╭🦠 *MAKAMESCO MENU* 🦠╮\n\n`;

    const sortedCategories = Object.keys(coms).sort();
    sortedCategories.forEach((cat) => {
        menuMsg += `🎭 *${cat}* 🎭\n╭─────◆◇◆─────╮`;
        coms[cat].forEach((cmd) => {
            menuMsg += `\n│ 🔹 *${cmd}*`;
        });
        menuMsg += `\n╰─────◆◇◆─────╯\n\n`;
    });

    menuMsg += `
⚡──────────🦠
*© MAKAMESCO WORLD*
🦠──────────⚡`;

    try {
        // Send image with full caption (infoMsg + menuMsg)
        await zk.sendMessage(dest, { 
            image: { url: "https://url.bwmxmd.online/Adams.wj2ctigt.jpg" },
            caption: infoMsg + menuMsg,
            contextInfo: { forwardingScore: 999, isForwarded: true }
        }, { quoted: ms });

        // Send audio with caption
        await zk.sendMessage(dest, { 
            audio: { 
                url: "https://url.bwmxmd.online/Adams.1wzh7u8n.m4"
            }, 
            mimetype: 'audio/mp4', 
            ptt: true,
            caption: "🎶🦠SESCO SONG🦠🎶",
            contextInfo: { forwardingScore: 999, isForwarded: true }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Menu Error: " + e);
        repondre("❌ Menu Error: " + e);
    }
});
