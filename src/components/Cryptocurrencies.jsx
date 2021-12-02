import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Pagination } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const Cryptocurrencies = ({ simplified }) => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    count: simplified ? 10 : 100,
    offset: 0,
  })
  console.log('pagination: ', pagination)
  const [cryptos, setCryptos] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const { data: cryptosList, isFetching } = useGetCryptosQuery(pagination)

  const handlePageChange = (page, pageSize) => {
    setPagination({ page, pageSize, count: pageSize, offset: page * pageSize })
    console.log('change pagination: ', pagination)
  }

  useEffect(() => {
    //setCryptos(cryptosList?.data?.coins)

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm),
    )

    setCryptos(filteredData)
  }, [cryptosList, searchTerm])

  if (isFetching) return <Loader />

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    alt="crypto"
                    className="crypto-image"
                    src={currency.iconUrl}
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <br />
      <Pagination
        current={pagination.page}
        pageSize={pagination.pageSize}
        defaultCurrent={1}
        total={14000}
        onChange={handlePageChange}
      />
    </>
  )
}

export default Cryptocurrencies
