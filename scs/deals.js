const { adams } = require('../Ibrahim/adams');

adams(
  {
    nomCom: "deals",
    reaction: "✅",
    categorie: "User"
  },
  async (dest, zk, commandeOptions) => {
    const { msg } = commandeOptions;

    try {
      await zk.sendMessage(dest, {
        image: { url: "https://makamescodigitalsolutions.com " },
        caption: "🖼 *Boost offers.",
        quoted: msg
      });
    } catch (err) {
      console.error("❌ Error sending image:", err);
      await zk.sendMessage(dest, {
        text: "⚠️ error.",
        quoted: msg
      });
    }
  }
);
