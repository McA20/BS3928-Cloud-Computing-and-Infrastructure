const config = {};

config.host = process.env.HOST || "https://waqqlycosmosdb.documents.azure.com:443/";
config.authKey =
  process.env.AUTH_KEY || "8EOC45OSDf2mInKSPpmko2839DxkiHRO6XjM7yVSsBd7h0M6Gjgkhcl6oPN559fEMHJpkcxwJ43BACDbPtHgvQ==";
config.databaseId = "Waqqly";
config.containerId = "DogWalker";

if (config.host.includes("https://localhost:")) {
  console.log("Local environment detected");
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
}

module.exports = config;