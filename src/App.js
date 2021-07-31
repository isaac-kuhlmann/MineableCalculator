/* 
  FOR WEB DEVLOPER:
  - The only requirement for the calculator is the "crypto-price" node_module
  - REACT is used here only to retrieve the number of Mineable tokens from user input
  - If you aren't using React, retrieve the number of tokens from the user, then pass this number to calculateRewards
      to return daily rewards in BTC and USD
*/

/* React Specific (not needed for calculator) */
import './App.css';
import React, { useState } from 'react';
/* ------------------------------------------ */

// THIS IS NECESARRY FOR CALCULATOR
require('crypto-price')
let price = require('crypto-price')

// Constants for calculation
const ALPHA_RATE = 0.352
const ALPHA_ELECTRIC = 2200

const BETA_RATE = 1.246
const BETA_ELECTRIC = 8440

const MINE_SUPPLY = 21000000

/*
  Calculates Mineable rewards during the Alpha Phase

  @param tokens = number of Mineable tokens
  @param btcPrice = btc price (get from the getBitcoinPrice function)
  @returns Alpha Rewards object structured as {usd: <usd-reward>, btc: <btc-reward>}
*/
const alphaReward = (tokens, btcPrice) => {
  let currentRate = ALPHA_RATE - (ALPHA_ELECTRIC / btcPrice)
  let btcReward = (tokens / MINE_SUPPLY) * currentRate
  let usdReward =  btcReward * btcPrice
  return {usd: usdReward, btc: btcReward}
}

/*
  Calculates Mineable rewards during the Beta Phase

  @param tokens = number of Mineable tokens
  @param btcPrice = btc price (get from the getBitcoinPrice function)
  @returns Beta Rewards object structured as {usd: <usd-reward>, btc: <btc-reward>}
*/
const betaReward = (tokens, btcPrice) => {
  let currentRate = BETA_RATE - (BETA_ELECTRIC / btcPrice)
  let btcReward = (tokens / MINE_SUPPLY) * currentRate
  let usdReward = btcReward * btcPrice
  return {usd: usdReward, btc: btcReward}
}


/* 
  Starter Function for Calculation

  Uses the crypto-price node_module to retrieve bitcoin price
  
  @param tokens = number of mineable (This is where to pass the user input)

*/
const calculateRewards = (tokens) => {
  // crypto-price node_module function
  price.getCryptoPrice('USD', 'BTC')
  .then(obj => { 
    let btcPrice = obj.price
    // TODO: DISPLAY tokens BACK TO USER
    console.log('Amount of Mineable: ' + tokens)
    let alphaDaily = alphaReward(tokens, btcPrice)
    let betaDaily = betaReward(tokens, btcPrice)

    // TODO: DISPLAY alphaDaily AND betaDaily BACK TO USER
    
    // The following is just logging the rewards
    // Log Daily Rewards
    console.log('Alpha Daily USD: ' + alphaDaily.usd)
    console.log('Alpha Daily BTC: ' + alphaDaily.btc)
    console.log('Beta Daily USD: ' + betaDaily.usd)
    console.log('Beta Daily BTC: ' + betaDaily.btc)

    // Log Weekly Rewards
    console.log('Alpha Weekly USD: ' + alphaDaily.usd * 7)
    console.log('Alpha Weekly BTC: ' + alphaDaily.btc * 7)
    console.log('Beta Weekly USD: ' + betaDaily.usd * 7)
    console.log('Beta Weekly BTC: ' + betaDaily.btc * 7)

    // Log Montly Rewards (30 days)
    console.log('Alpha Monthly USD: ' + alphaDaily.usd * 30)
    console.log('Alpha Monthly BTC: ' + alphaDaily.btc * 30)
    console.log('Beta Monthly USD: ' + betaDaily.usd * 30)
    console.log('Beta Monthly BTC: ' + betaDaily.btc * 30)

    // Log Yearly Rewards
    console.log('Alpha Yearly USD: ' + alphaDaily.usd * 365)
    console.log('Alpha Yearly BTC: ' + alphaDaily.btc * 365)
    console.log('Beta Yearly USD: ' + betaDaily.usd * 365)
    console.log('Beta Yearly BTC: ' + betaDaily.btc * 365)
  })
  .catch(err => {
    console.log(err)
  })

}


// REACT SPECIFIC
// Not necesary for calculations
function App() {
  const [mine, setMine] = useState(0);
  
  // Execute the calculateRewards function
  const handleSubmit = (e) => {
    calculateRewards(mine)
  }

  const handleChange = (e) => {
    setMine(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* Retrieve Mineable Amount from User*/}
        <input type="text" placeholder="Mineable Amount" onChange={handleChange}></input>
        <button onClick={handleSubmit}>Submit</button>
      </header>
    </div>
  );
}

export default App;
