const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const express = require("express");
const app = express();

app.use(express.json());

const bot = new Telegraf(TOKEN);

bot.on(message("text"), (ctx) => ctx.reply("Hello"));

app.post("/api/bot", async (req, res) => {
  try {
    await bot.handleUpdate(req.body, res);
  } catch (err) {
    console.error("Error handling update:", err);
    res.status(500).send("Error processing update");
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Bot is running");
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  const webhookUrl = `https://DOMAIN/api/bot`;
  try {
    await bot.telegram.setWebhook(webhookUrl);
    console.log(`Webhook set to ${webhookUrl}`);
  } catch (err) {
    console.error("Error setting webhook:", err);
  }
});
