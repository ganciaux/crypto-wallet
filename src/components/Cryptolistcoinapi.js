import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Card, Row, Col, Input, Select, Divider, Modal, Button } from 'antd'
import Loader from './Loader'

import crypto_com_extract from '../data/crypto_com_currencies.json'
import { useGetCryptosQuery } from '../services/cryptoGecko'
import CryptoFormat from '../services/cryptoFormat'

import CryptoHistory from './CryptoHistory'

const Cryptolistcoinapi = () => {
  const { Option } = Select
  const [cryptosFormat, setCryptosFormat] = useState([])
  const { data: cryptosApi, isFetching, isSuccess } = useGetCryptosQuery()

  useEffect(() => {
    console.log('UseEffect:', cryptosApi)
    cryptosApi.map((crypto) => {
      console.log(CryptoFormat(crypto, 'gecko'))
      return crypto
    })
  }, [cryptosApi])

  if (isFetching) return <Loader />

  if (isSuccess) {
    console.log('Success!')
  }

  return (
    <>
      <Card title="Crypto.com">
        <p>Purchase:€</p>
        <p>Profit/Loss:</p>
        <p>Total:€</p>
        <p>Currencies:</p>
      </Card>

      <Divider />

      <br />
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptosApi?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.id}>
            <Card
              className=""
              title=""
              extra={<img alt="crypto" className="crypto-image" src="" />}
              hoverable
            >
              <p>Name:{crypto.name}</p>
              <p>symbol:{crypto.symbol}</p>
              <p>id:{crypto.id}</p>
              <p>Price (Now):{crypto.current_price}€</p>
              <p>Price (Buy):€</p>
              <p>Market Cap:{crypto.market_cap}</p>
              <p>Daily Change: %</p>
              <p>Crypto:</p>
              <p>Buy: $</p>
              <p>Current:€</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptolistcoinapi
