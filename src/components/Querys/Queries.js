import {gql} from '@apollo/client'

export function xfEnterWithAccount(tits){
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
  }
  `
  return(LOAD_XFENTERS)
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

export function stakeStartWithAccount(tits){
  const LOAD_STAKESTART = gql`
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
}
  `
  return(LOAD_STAKESTART)
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