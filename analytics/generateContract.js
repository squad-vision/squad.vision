const Arweave = require("arweave");
const fs = require("fs");

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

function getWallets() {
  const data = fs.readFileSync("./02.03.2021-20.11/wallets.json");
  return JSON.parse(data);
}

function normalizeBalances(walletArray) {
  let updatedBalances = {};
  for (const [address, value] of Object.entries(walletArray)) {
    const roundedBalance = Math.round(value);
    if (roundedBalance > 0) {
      updatedBalances = {
        ...updatedBalances,
        [address]: roundedBalance
      };
    }
  }
  return updatedBalances;
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
      ["quorum", 0.5],
      ["support", 0.5],
      ["voteLength", 2160],
      ["lockMinLength", 129600],
      ["lockMaxLength", 1051200],
      ["communityAppUrl", "https://squad.vision"],
      ["communityDiscussionLinks", ["https://verto.exchange/chat"]],
      ["communityDescription", "An unstoppable social protocol 🌍"],
      ["communityLogo", "--------TATE TODO--------"],
      ["siteDeployment", "--------TATE TODO--------"]
    ]
  }
}

const wallets = getWallets();
const trueBalances = normalizeBalances(wallets);
console.log(generateInitialState(trueBalances));