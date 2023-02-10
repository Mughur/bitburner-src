import { Corporation } from "./Corporation";
import { CorporationUpgrade } from "./data/CorporationUpgrades";

export function calculateUpgradeCost(corporation: Corporation, upgrade: CorporationUpgrade, amount: number): number{
    const baseCost = upgrade.basePrice;
    const priceMult = upgrade.priceMult;
    const level = corporation.upgrades[upgrade.index];
    let cost = 0;
    for (let n=level; n<level+amount; n++){
        cost += baseCost*Math.pow(priceMult,n)
    }
    return cost;
}

export function calculateMaxAffordableUpgrade(corporation: Corporation, upgrade: CorporationUpgrade, amount?: number): number{
    if (amount === 0)return 0;
    if (calculateMaxAffordableUpgrade(corporation,upgrade, 1) < corporation.funds) return 0;

    let n = 1;
    while(calculateMaxAffordableUpgrade(corporation,upgrade, n*2) < corporation.funds && amount? n<amount:true) n *= 2;
    for (let i=n/2; i >=1 ;i/=2 ){
        if (calculateMaxAffordableUpgrade(corporation,upgrade, n+i) < corporation.funds) n += i;
    }

    return n;
}