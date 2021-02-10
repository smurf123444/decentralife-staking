import React from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'

function Wallet() {
  const wallet = useWallet()
  const blockNumber = wallet.getBlockNumber()
//https://github.com/aragon/use-wallet
  return (
    <>
      {wallet.status === 'connected' ? (
        <div>
          <div>Account: {wallet.account}</div>
          <button onClick={() => wallet.reset()}>Connected</button>
        </div>
      ) : (
        <div>
          <button onClick={() => wallet.connect()}>Connect</button>
        </div>
      )}
    </>
  )
}

// Wrap everything in <UseWalletProvider />
export default () => (
  <UseWalletProvider
    chainId={42}
    connectors={{
      // This is how connectors get configured
      portis: { dAppId: 'my-dapp-id-123-xyz' },
    }}
  >
    <Wallet />
  </UseWalletProvider>
)