import {gql} from '@apollo/client'

export function xfEnterAndExitWithAccount(tits){
  const LOAD_XFENTERS = gql`
{
    xfLobbyEnters(where: {memberAddr: "${tits}"}){
      id
      timestamp
      memberAddr
      data0
      rawAmount
      enterDay
    }
    xfLobbyExits(where: {memberAddr: "${tits}"}){
      id
      timestamp
      xfAmount
      memberAddr
      data0
    }
  }
  `
  return(LOAD_XFENTERS)
}
export function xfLobbyDailyData(){
  const LOAD_XFDAILYDATA = gql`
{
 dailyDataUpdates(orderDirection:desc)
  {
    beginDay
    payoutPerTShare
    endDay
    lobbyEth
    lobbyHexPerEth
    lobbyHexAvailable
    shares
    payout
  }
  }
  `
  return(LOAD_XFDAILYDATA)
}
/*
export const LOAD_XFENTERS = gql`
{
    xfLobbyEnters(where: {memberAddr: "${}"}){
      id
      timestamp
      memberAddr
      data0
      rawAmount
      enterDay
    }
  }
  `
  */
 export function xfExitWithAccount(tits){
  const LOAD_XFEXITS = gql`
{
  xfLobbyExits(where: {memberAddr: "${tits}"}){
    id
    timestamp
    xfAmount
    memberAddr
    data0
  }
  }
  `
  return(LOAD_XFEXITS)
}

export function stakeEndWithAccount(tits){
  const LOAD_STAKEEND = gql`
  {
    stakeEnds(where: {stakerAddr: "${tits}"}) {
      id
      stakerAddr
      stakeId
      stakedHearts
      payout
      penalty
      daysLate
      servedDays
      stakedHearts
      stakedShares
      prevUnlocked
    }
  }
  `
  return(LOAD_STAKEEND)
}

export function stakeStartAndEndWithAccount(tits){
  const LOAD_STAKESTARTANDEND = gql`
  {
  stakeStarts(where: {stakerAddr: "${tits}"}) {
    id
    stakerAddr
    stakeId
    data0
    stakedDays
    stakeTShares
    startDay
    endDay
    stakedHearts
  }
  stakeEnds(where: {stakerAddr: "${tits}"}) {
    id
    stakerAddr
    stakeId
    stakedHearts
    payout
    penalty
    daysLate
    servedDays
    stakedHearts
    stakedShares
    prevUnlocked
  }
}
  `
  return(LOAD_STAKESTARTANDEND)
}