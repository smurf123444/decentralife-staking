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
  export const LOAD_XFEXITS = gql`
{
  xfLobbyExits(where: {memberAddr: "0x5bc8bf5a75d221ff30b2c2b2a7235d6aeeff4a84"}){
    id
    timestamp
    xfAmount
    memberAddr
    data0
  }
  }
  `