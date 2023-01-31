import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from '../styles/details.module.css'
import Link from 'next/link'
import { motion } from 'framer-motion';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'
import Web3 from "web3";
import { abi } from './abi';
const web3 = new Web3(Web3.givenProvider);
export default function Details() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const [wallet, setWallet] = useState()
  const location = useRouter();
  const event = location.query;
  // console.log(location.query)
  const { address, connector, isConnected } = useAccount()
  // const { data: ensAvatar } = useEnsAvatar({ address })
  // const { data: ensName } = useEnsName({ address })

  // const { disconnect } = useDisconnect()

  // if (isConnected) {
  //  setWallet(address)
  // }
  const mintNow = async (contractAddress) => {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const response = await contract.methods
      .mint(address, 1, 1, "0x12")
      .send({ from: address });
    //const tokenId = response.events.Transfer.returnValues.tokenId;
    alert(
      // `NFT successfully minted. Contract address - ${contractAddress} and Token ID - ${tokenId}`
      `NFT successfully minted. Contract address - ${contractAddress}`
    );
    console.log(response)

  }
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


      <div>

      </div>

      <div className={styles.cardBox}>
        <div className={styles.detailCard} >
          <div

            className={styles.detailCardImg} >
            {/* {event.image} */}
            <motion.img
              initial="hidden" animate="visible" variants={{
                hidden: {
                  scale: .8,
                  opacity: 0
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: .2
                  }
                },
              }}
              src={event.image} />
            {/* <p className='topic'>
{event.name}
</p> */}
            <motion.div
              initial="hidden" animate="visible" variants={{
                hidden: {
                  scale: .8,
                  opacity: 0
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: .3
                  }
                },
              }}
              className={styles.topic}>

              {event.name}

            </motion.div>
          </div>
          <div className={styles.detailCardBox} >
            {!isConnected ? <div></div> :
              <div className={styles.mint}>
                <button onClick={() => mintNow(event.contract)}
                  className={styles.walletbtn}
                >
                  MINT
                </button>
              </div>
            }

            <motion.div className={styles.descriptionBox}
              initial="hidden" animate="visible" variants={{
                hidden: {
                  scale: .8,
                  opacity: 0
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: .4
                  }
                },
              }}
            >

              <div

                className={styles.description}>
                Description:
              </div>

              <div style={{ marginTop: 20 }}>
                {event.description}

              </div>
            </motion.div>
            <div

              className={styles.boxRow}>


              <motion.div
                initial="hidden" animate="visible" variants={{
                  hidden: {
                    scale: .8,
                    opacity: 0
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: .4
                    }
                  },
                }}
                className={styles.websiteBox} >
                <div className={styles.websiteLine}>
                  Website:
                </div>

                <div>

                  <a target="_blank" href={event.website}>
                    <img className={styles.svgs} src='/icons8-internet-30-w.png' alt='' />
                  </a>

                </div>
              </motion.div>
              <motion.div
                initial="hidden" animate="visible" variants={{
                  hidden: {
                    scale: .8,
                    opacity: 0
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: .4
                    }
                  },
                }}
                className={styles.dateBox} >
                <div className={styles.dateLine}>
                  Date:
                </div>

                <div className={styles.dateData}>
                  {event.date}

                </div>
              </motion.div>
              <motion.div
                initial="hidden" animate="visible" variants={{
                  hidden: {
                    scale: .8,
                    opacity: 0
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: .4
                    }
                  },
                }}
                className={styles.linkBox} >
                <div className={styles.redirectLine}>
                  Watch:
                </div>

                <div>
                  <a target="_blank" href={event.redirect}>
                    <img className={styles.svgs} src='/icons8-youtube-w.svg' alt='' />
                  </a>

                </div>
              </motion.div>
            </div>


          </div>
        </div>

      </div>



    </div>
  )
}
