import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Card, Row, Col, Input, Select, Divider, Modal, Button } from 'antd'
import Loader from './Loader'

import crypto_com_extract from '../data/crypto_com_currencies.json'
import { useGetCryptosQuery } from '../services/cryptoCoinApi'
import CryptoHistory from './CryptoHistory'

const Cryptolistcoinapi = () => {
  const { Option } = Select
  const { data: cryptosCoinApi, isFetching, isSuccess } = useGetCryptosQuery()

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
        {cryptosCoinApi?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Card
              className=""
              title=""
              extra={<img alt="crypto" className="crypto-image" src="" />}
              hoverable
            >
              <p>Name:</p>
              <p>symbol:</p>
              <p>id:</p>
              <p>Price (Now):€</p>
              <p>Price (Buy):€</p>
              <p>Market Cap:</p>
              <p>Daily Change: %</p>
              <p>Crypto:</p>
              <p>Buy: $</p>
              <p>Current:€</p>
              <p>{JSON.stringify(currency)}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptolistcoinapi
