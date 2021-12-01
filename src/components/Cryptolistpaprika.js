import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoPaprika'
import Loader from './Loader'

const Cryptolistpaprika = ({ simplified }) => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery()

  console.log('list:', cryptosList)

  if (isFetching) return <Loader />

  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptosList?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card title={currency.name} hoverable>
                <p>symbol: {currency.symbol}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptolistpaprika
