import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoGecko'
import Loader from './Loader'

import crypto_com_currencies from '../data/crypto_com_currencies.json'

const Cryptocurrencies = () => {
  const {
    data: cryptosApi,
    isFetching,
    isSuccess,
  } = useGetCryptosQuery()
  const [cryptos, setCryptos] = useState()
  const [cryptosWithOperations, setCryptosWithOperations] = useState([])
  const [operationIsLoaded, setOperationIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [result, setResult] = useState(0.0)

  useEffect(() => {
    const filteredData = cryptosWithOperations?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm),
    )
    setCryptos(filteredData)
    
    setResult(filteredData.reduce((acc, currency)=>{
      if (isNaN(currency.operations?.total.profit))
        return acc
      else 
        return acc+currency.operations?.total.profit
      },0.0).toFixed(2))
  }, [cryptosWithOperations, searchTerm])

  if (isFetching) return <Loader />

  if (isSuccess && operationIsLoaded === false) {
    console.log('Add crypto.com operations...')
    const cryptosApiWithOperations = cryptosApi?.map((currency) => {
      const operations = crypto_com_currencies.coins.find(
        (curr) => curr.symbol.toLowerCase() === currency.symbol,
      )
      if (operations){
        console.log('- ', currency.symbol, ': ', operations )
        operations.total.profit = parseFloat((operations.total.coins*currency.current_price ) - operations.total.fiat.euro);
      }
        
      return { ...currency, operations }
    })
    setOperationIsLoaded(true)
    setCryptosWithOperations(cryptosApiWithOperations)
  }

  return (
    <>
      <div className="search-crypto">
        <Input
          placeholder="Search Cryptocurrency"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>
      <div>result: {result}</div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.market_cap_rank}. ${currency.name}`}
                extra={<img alt="crypto" className="crypto-image" src={currency.image} />}
                hoverable
              >
                <p>Price: {currency.current_price}</p>
                <p>Market Cap: {millify(currency.market_cap)}</p>
                <p>Daily Change: {currency.price_change_percentage_24h}%</p>
                <p>Crypto: {currency.operations?.total?.crypto}</p>
                <p>Buy (EUR): {currency.operations?.total?.fiat.euro}</p>
                <p>Buy (USD): {currency.operations?.total?.fiat.usd}</p>
                <p>Profit: {currency.operations?.total?.profit?.toFixed(2)}</p>
                {/*
                <p>
                {currency.operations?.operations.map((operation) => (
                <>{operation['Timestamp (UTC)']};{operation['Transaction Kind']};{operation['Currency']};{operation['Amount']};{operation['To Currency']};{operation['To Amount']}<br/></>
                ))}
                </p>
                */}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
