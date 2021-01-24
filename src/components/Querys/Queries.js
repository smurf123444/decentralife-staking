import {gql} from '@apollo/client'

export const LOAD_XFENTERS = gql`
{
    xfLobbyEnters(where: {memberAddr: "0x5bC8bf5A75D221fF30b2c2B2a7235D6aeEFF4A84"}){
      id
      timestamp
      memberAddr
      data0
      rawAmount
      enterDay
    }
  }
  `