const { existsSync } = require("fs")
const { config } = require("dotenv")
const fetch = require("node-fetch")

global.fetch = fetch

if (existsSync(".env.local")) {
  config({ path: ".env.local" })
}

if (existsSync(".settings.local")) {
  config({ path: ".settings.local" })
}
