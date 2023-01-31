import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from '../styles/details.module.css'
import Link from 'next/link'

import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
   
export default function Details() {
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
    const [wallet,setWallet]=useState()
    const location = useRouter();
    const event = location.query; 
    // console.log(location.query)
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })

    const { disconnect } = useDisconnect()
   
    // if (isConnected) {
    //  setWallet(address)
    // }
   
  return (
    <div className={styles.component}>
      
   
        <div>
        {/* <button  className={styles.walletbtn} >
          Connect Wallet
        </button> */}
        
        </div>

        <div className={styles.wallets}>
      {connectors.map((connector) => (
        <div>

        <button
        className={styles.walletbtn} 
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
        </div>

      ))}
 
    </div>
    {error ? <div>{error.message}</div>:<div>{address}</div>}

    <div>
     
    </div>
    <div className={styles.topic}>

{event.name}

</div>
        <div className={styles.cardBox}>
        <div className={styles.detailCard} >
         <div className={styles.detailCardImg} >
{/* {event.image} */}
<img src={event.image}/>
{/* <p className='topic'>
{event.name}
</p> */}
         </div>
         <div className={styles.detailCardBox} >

         <div className={styles.descriptionBox} >
        <div className={styles.description}>
         Description:
            </div>
            
            <div style={{marginTop:20}}>
            {event.description}

            </div>
</div>
<div className={styles.boxRow}>

         <div className={styles.dateBox} >
            <div className={styles.dateLine}>
         Date:
            </div>
            
            <div className={styles.dateData}>
            {event.date}

            </div>
            </div>
            <div className={styles.websiteBox} >
            <div className={styles.websiteLine}>
         Website:
            </div>
            
            <div>
           
            <a target="_blank" href= {event.website}>
                <img src='/icons8-internet-30.png' alt=''/>
            </a>

            </div>
            </div>
            <div className={styles.linkBox} >
            <div className={styles.redirectLine}>
         Watch:
            </div>
            
            <div>
            <a target="_blank" href= {event.redirect}>
                <img src='/icons8-youtube.svg' alt=''/>
            </a>

            </div>
            </div>
        </div>

        
        </div>
        </div>

        </div>
  

        
    </div>
  )
}
