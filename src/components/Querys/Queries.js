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