// === AUTO MENU TRIGGERS ===
const triggerWords = ["start", "offers", "data", "minutes", "virusi", "rada", "niaje"];
if (triggerWords.includes(lower)) {
  await sock.sendMessage(from, {
    text: `🌐 *Welcome To VIRUSI DATA SOLUTIONS* 🌐

Chagua huduma unayotaka kwa kuandika nambari:

1. 📡 LIKE OFFERS
2. ✉️ FOLLOWERS Offers
3. 📞 SUBSCRIBERS Offers
4. 🖼 All Offers
5. 🛒 Buy for Another Number`,
    contextInfo: {
      mentionedJid: [from],
      externalAdReply: {
        title: "MAKAMESCO DIGITAL OFFERS",
        body: "Affordable LIKES FOLLOWERS SUBS",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
  return;
}
