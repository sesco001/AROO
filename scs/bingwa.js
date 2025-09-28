const { adams } = require('../Ibrahim/adams');

adams(
  {
    nomCom: "boost",
    reaction: "✅",
    categorie: "User"
  },
  async (dest, zk, commandeOptions) => {
    const { repondre } = commandeOptions;

    try {
      await zk.sendMessage(dest, {
        text: "📣 *MAKAMESCO DIGITAL SOLUTIONs*\n\nChoose your best  👇",
        footer: "Till: 8855502 | Help: +254700505700",
        title: "💡 Choose",
        buttonText: "📋 AVAILABLE",
        sections: [
          {
            title: "📡 LIKE OFFERS",
            rows: [
              {
                title: "📶 FOLLOWERS Deals",
                rowId: "followers_deals"
              },
              {
                title: "🖼 All Offers (Image)",
                rowId: "all_offers"
              }
            ]
          },
          {
            title: "VIEWS",
            rows: [
              {
                title: "View Deals",
                rowId: "view_deals"
              },
              {
                title: "✉️ subscribers Deals",
                rowId: "sub_deals"
              }
            ]
          },
          {
            title: "🛒 Nunua Sasa",
            rows: [
              {
                title: "🛒 Buy Now",
                rowId: "buy_now"
              }
            ]
          }
        ],
        headerType: 1
      });

      // Handle responses to buttons (replies)
      zk.ev.on("messages.upsert", async (msgUpdate) => {
        const msg = msgUpdate.messages?.[0];
        if (!msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage) return;

        const selection = msg.message?.conversation || msg.message?.extendedTextMessage?.text;

        switch (selection) {
          case "data_deals":
            await repondre("");
            break;
          case "all_offers":
            await zk.sendMessage(dest, {
              image: { url: "https://makamescodigitalsolutions.com" },
              caption: "🖼 *ALL OFFERS* - MAKAMESCO DIGITAL  SOLUTIONS"
            });
            break;
          case "minutes_deals":
            await repondre("like DEALS*\n\n1000 @3/= valid forever");
            break;
          case "sms_deals":
            await repondre("followers");
            break;
          case "buy_now":
            await repondre("🛒 Tembelea: https://makamescodigitalsolutions.com\nor dm 254769995625.");
            break;
        }
      });

    } catch (err) {
      console.log(err);
      await repondre("⚠️ error.");
    }
  }
);
