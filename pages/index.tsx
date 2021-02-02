import Head from "next/head";
import { useEffect, useState } from "react";
import { Page, Card, Input, Button } from "@verto/ui";
import { Grid } from "@geist-ui/react";
import { allEmojis } from "../utils/emojis";

import styles from "../styles/Home.module.sass";

function chooseEmoji() {
  return allEmojis[Math.floor(Math.random() * (allEmojis.length - 1))];
}

export default function Home() {
  const [emojis, setEmojis] = useState(["👶", "👶"]);
  
  useEffect(() => {
    setEmojis([chooseEmoji(), chooseEmoji()]);
    setInterval(() => {
      setEmojis([chooseEmoji(), chooseEmoji()]);
    }, 4000)
  }, []);
  return (
    <>
      <Head>
        <title>$QUAD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Grid.Container justify="center" gap={2}>
          <Grid xs={24} sm={10}>
            <div className="emojis">
              <Grid.Container justify="center" gap={4}>
                <Grid className={styles.emoji}>{emojis[0]}</Grid>
                <Grid className={styles.emoji}>{emojis[1]}</Grid>
              </Grid.Container>
            </div>
          </Grid>
          <Grid xs={24} sm={10}>
            <h1 className={styles.handwriting}>$QUAD</h1>
            <h3>An Unstoppable Social Protocol.</h3>
          </Grid>
          <Grid xs={24} sm={12}>
            <Card shadow hoverable>
              <h2>About</h2>
              <p>
                People deserve to earn proportional to the value they create, of any kind.
              </p>
              <p>By applying this concept to everything from artists to developers, a complete incentive-circle can be created.</p>
              <p><span className={styles.currency}>$QUAD</span> powers the creation of social applications built on Arweave in a decentralized, democratic way.</p>
            </Card>
          </Grid>
          <Grid xs={24} sm={12}>
            <Card shadow hoverable>
              <h2>Goal</h2>
              <p>Fund decentralized, censorship-resistant social projects that power <a className={styles.link} href="arweave.net/nMoePGNxaLNYA_32kzK6-dZYBeGXXCXLrf9vRyxld8I">ownership economies</a></p>
              <p>If you're building a social application and need funding, rally the Arweave community to vote on funding your project with <span className={styles.currency}>$QUAD</span> tokens.</p>
            </Card>
          </Grid>
          <Grid xs={24} sm={12}>
            <Card design="Geist">
              <p>If you own <span className={styles.currency}>AR</span>, you likely own <span className={styles.currency}>$QUAD</span>.</p>
              <Input label="Your Wallet Address" />
              <Button shadow type="primary" className={styles.submit}>Check your Balance</Button>
              <Grid.Container gap={2}>
                <Grid xs={12}>
                  <Button type="success" className={styles.submit}>Buy / Sell</Button>
                </Grid>
                <Grid xs={12}>
                  <Button type="default" className={styles.submit}>cXYZ</Button>
                </Grid>
              </Grid.Container>
            </Card>
          </Grid>
          <Grid xs={12} sm={12}>
            <div>
              <h2>Protocol Tokenomics</h2>
              <ul>
                <li>
                  Token holders are financially incentivized to adopt the protocol
              </li>
                <li>
                  Developers are incentivized to produce social media applications around the protocol
              </li>
                <li>
                  Token holders are incentivized to stake the tokens to vote on proposals such as funding developers, updating site content (this!), & changing community settings.
              </li>
              </ul>
            </div>
          </Grid>
          <Grid xs={24}>
            <h2>Spec</h2>
            <Grid.Container gap={1} className={styles.spec}>
              <Grid xs={24} sm={8}>
                <Card design="Geist">
                  <h5>Profiles ➡️ Social Tokens</h5>
                  <p>Users become their own PSTs, where "following" another user mints a token for them to give to that person.</p>
                </Card>
              </Grid>
              <Grid xs={24} sm={8}>
                <Card design="Geist">
                  <h5>Posts ➡️ NFTs</h5>
                  <p>These <i>tokens</i> can either be collectively owned by holders of your social token, or they can be sold to other users.</p>
                </Card>
              </Grid>
              <Grid xs={24} sm={8}>
                <Card design="Geist">
                  <h5>Likes ➡️ Tips</h5>
                  <p>When someone gives another user a "like," a token holder of that person earns in the form of a tip.</p>
                </Card>
              </Grid>
              <Grid xs={24}>
                <Card shadow>
                  <h4>Takeaways</h4>
                  <ul>
                    <li>
                      You’re incentivized to only follow people creating value & will “follow” you back (often friends).
                    </li>
                    <li>
                      You could buy into the revenue stream of a user. 
                    </li>
                    <li>
                      You could grow your personal value and a community, simultaneously.
                    </li>
                    <li>
                      Friends would generate income for you.
                    </li>
                  </ul>
                </Card>
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid xs={24}>
            <h2>Community Proposals</h2>
          </Grid>
        </Grid.Container>
      </Page>
    </>
  )
}
