const Arweave = require("arweave");
const cliProgress = require("cli-progress");
const moment = require("moment");
const fetch = require("node-fetch");
const { run } = require("ar-gql");
const fs = require("fs");

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const prog = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

(async () => {
  const start = moment();

  const raw = await fetch("https://arweave.net/wallet_list");
  const res = await raw.json();
  console.log(
    `Fetched wallet data at ${moment().format("h:mm A on MMM DD, YYYY")}\n`
  );

  const wallets = {};
  let totalAR = 0;
  let activeTotalAR = 0;
  prog.start(res.length, 0);
  for (let i = 0; i < res.length; i++) {
    const entry = res[i];

    const balance = parseFloat(client.ar.winstonToAr(entry.balance));
    totalAR += balance;

    if (entry.last_tx !== "") {
      try {
        const data = (
          await run(
            `
        query($addr: String!) {
          transactions(owners: [$addr], first: 1) {
            edges {
              node {
                block {
                  timestamp
                }
              }
            }
          }
        }
        `,
            { addr: entry.address }
          )
        ).data.transactions.edges;
        if (data.length === 1) {
          if (data[0].node.block) {
            const time = moment.unix(data[0].node.block.timestamp);
            const duration = moment.duration(start.diff(time));

            if (duration.asMonths() < 6) {
              wallets[entry.address] = balance;
              activeTotalAR += balance;
            }
          } else {
            wallets[entry.address] = balance;
            activeTotalAR += balance;
          }
        }
      } catch {
        // oh well ...
      }
    }
    prog.update(i + 1);
  }

  console.log();
  console.log(`Total wallets:  ${res.length}`);
  console.log(`Active wallets: ${Object.keys(wallets).length}`);

  console.log();
  console.log(`Total in circulation:          ${totalAR} AR`);
  console.log(`Amount held by active wallets: ${activeTotalAR} AR`);

  fs.writeFileSync("./wallets.json", JSON.stringify(wallets, undefined, 2));
  console.log(`\nOutput written to file: "./wallets.json"`);

  const end = moment();
  const duration = moment.duration(end.diff(start));
  console.log(`\nProgram took ${duration.humanize()} to execute.`);
})();
