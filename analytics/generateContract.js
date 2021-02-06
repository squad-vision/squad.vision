const Arweave = require("arweave");
const fs = require("fs");
const fetch = require("node-fetch");
const cliProgress = require("cli-progress");
const { parse } = require("path");

const prog = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

async function getWallets() {
  // Counting variables
  let totalSQUAD = 0;
  let addressCount = 0;

  // Pull all wallets
  let allBalances = {};
  const raw = await fetch("https://arweave.net/wallet_list");
  let res = await raw.json();
  prog.start(res.length, 0);

  // Iterate through wallets
  for (let i = 0; i < res.length; i++) {
    // If wallet is wallet
    if (res[i].address.length > 40) {
      res[i].balance = parseFloat(res[i].balance);
      res[i].balance = client.ar.winstonToAr(res[i].balance);

      // If 0.1 < wallet balance < 1 then round up
      if (res[i].balance >= 0.1 && res[i].balance <= 1) res[i].balance = 1;
      res[i].balance = Math.round(res[i].balance);
      // If the wallet has a balance
      if (res[i].balance > 0) {
        // Add to balances object
        allBalances = {
          ...allBalances,
          [res[i].address]: res[i].balance,
        };

        // Increment the counters
        totalSQUAD += res[i].balance;
        addressCount++;
      }
    }
    prog.update(i + 1);
  }

  console.log("Total $QUAD \n\n\n", totalSQUAD);
  console.log("\n\n\nNumber of addresses", addressCount);
  return allBalances;
}

function generateInitialState(balances) {
  return {
    name: "SQUAD",
    ticker: "QUAD",
    balances,
    vault: {},
    votes: [],
    roles: {},
    settings: [
      ["quorum", 0.3],
      ["support", 0.5],
      ["voteLength", 5040],
      ["lockMinLength", 4320],
      ["lockMaxLength", 1051200],
      ["communityAppUrl", "https://squad.vision"],
      ["communityDiscussionLinks", ["https://verto.exchange/chat"]],
      ["communityDescription", "An unstoppable social protocol 🌍"],
      ["communityLogo", "00gT33gZpgWK4HMS0AuEy8OXC5_xyQjyJCsX6ps0iuM"],
      ["siteDeployment", ""],
    ],
  };
}

(async () => {
  console.log("Fetching wallets");
  const wallets = await getWallets();
  const contract = generateInitialState(wallets);
  fs.writeFileSync("./state.json", JSON.stringify(contract, undefined, 2));
  console.log(`\nOutput written to file: "./state.json"`);
})();
