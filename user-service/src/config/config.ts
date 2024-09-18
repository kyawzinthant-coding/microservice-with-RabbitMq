import { config } from "dotenv";

const configFile = "./.env";
config({ path: configFile });

const { PORT, JWT_SECRET, MONGO_URI, MESSAGE_BROKER_URL, NODE_ENV } =
  process.env;

export default { PORT, JWT_SECRET, MONGO_URI, MESSAGE_BROKER_URL, NODE_ENV };
