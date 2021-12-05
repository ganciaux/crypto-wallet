import React, { useEffect, useState } from 'react'
import millify from 'millify'
import {
  Card,
  Badge,
  Row,
  Col,
  Input,
  Select,
  Divider,
  Modal,
  Button,
} from 'antd'

import { useGetCryptosQuery } from '../services/cryptoCoinranking'
import Loader from './Loader'

import crypto_com_currencies from '../data/crypto_com_currencies.json'
import CryptoModal from './CryptoModal'

const Cryptocurrencies = () => {
  const { Option } = Select
  const { data: cryptosApi, isFetching, isSuccess } = useGetCryptosQuery()
  const [cryptos, setCryptos] = useState()
  const [cryptosWithOperations, setCryptosWithOperations] = useState([])
  const [operationIsLoaded, setOperationIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [result, setResult] = useState({})
  const [profitAndLoss, setProfitAndLoss] = useState('all')
  const [sortingBy, setSortingBy] = useState('current')
  const [coinId, setCoinId] = useState(1)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = (id) => {
    setIsModalVisible(true)
    setCoinId(id)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  function compare(a, b) {
    if (sortingBy === 'name') {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    } else if (sortingBy === 'profit') {
      return b.operations.total.profit - a.operations.total.profit
    } else if (sortingBy === 'rank') {
      return a.market_cap_rank - b.market_cap_rank
    } else if (sortingBy === 'current') {
      return false
      //return b.operations?.total?.current - a.operations?.total?.current
    }
  }

  useEffect(() => {
    setCryptos(cryptosApi?.data?.coins)

    const filteredData = cryptosWithOperations?.filter(
      (item) =>
        (item.name.toLowerCase().includes(searchTerm) ||
          item.symbol.toLowerCase().includes(searchTerm)) &&
        (profitAndLoss === 'all' ||
          (profitAndLoss === 'profit' && item.operations?.total?.profit > 0) ||
          (profitAndLoss === 'loss' && item.operations?.total?.profit < 0)),
    )

    filteredData.sort(compare)
    setCryptos(filteredData)

    setResult(
      filteredData.reduce(
        (acc, currency) => {
          if (isNaN(currency.operations?.total.profit)) {
            return acc
          } else {
            if (currency.operations?.total.profit > 0)
              acc.profit += currency.operations?.total.profit
            else acc.loss += currency.operations?.total.profit
            return acc
          }
        },
        { loss: 0.0, profit: 0.0 },
      ),
    )
  }, [cryptosWithOperations, searchTerm, profitAndLoss, sortingBy])

  if (isFetching) return <Loader />

  if (isSuccess && operationIsLoaded === false) {
    const cryptosApiWithOperations = cryptosApi?.data?.coins?.map(
      (currency) => {
        const operations = crypto_com_currencies.coins.find(
          (curr) => curr.symbol.toLowerCase() === currency.symbol.toLowerCase(),
        )
        if (operations) {
          operations.total.profit = parseFloat(
            operations.total.coins * currency.price -
              operations.total.fiat.euro,
          )
          operations.total.percent =
            (operations.total.profit / operations.total.fiat.euro) * 100

          operations.total.current =
            operations.total.profit + operations.total.fiat.euro
        }

        return { ...currency, operations }
      },
    )
    setOperationIsLoaded(true)
    setCryptosWithOperations(cryptosApiWithOperations)
  }

  function handlePage(value) {
    setProfitAndLoss(value)
  }

  function handleSortingBy(value) {
    setSortingBy(value)
  }

  return (
    <>
      <Card title="Crypto.com">
        <p>Purchase: {crypto_com_currencies.total_purchase.euro.toFixed(2)}€</p>
        <p>
          {' '}
          Profit/Loss: {(result.profit + result.loss).toFixed(2)}€
          <span className="crypto-text-profit">
            {'+'}
            {result.profit?.toFixed(2)}€
          </span>
          <span className="crypto-text-loss">{result.loss?.toFixed(2)}€</span>
          <Badge
            count={result.loss?.toFixed(2)}
            style={{ backgroundColor: '#a0d911' }}
          />
          <Badge
            count={result.loss?.toFixed(2)}
            style={{ backgroundColor: '##f5222d' }}
          />
        </p>
        <p>
          Total:{' '}
          {(
            crypto_com_currencies.total_purchase.euro +
            result.profit +
            result.loss
          ).toFixed(2)}
          €
        </p>
        <p>Currencies: {crypto_com_currencies.coins.length}</p>
      </Card>

      <Divider />

      <Row gutter={[32, 32]}>
        <Col xs={24} sm={12} lg={6}>
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Select
            style={{ width: '50%' }}
            defaultValue={profitAndLoss}
            onChange={handlePage}
          >
            <Option value="loss">loss</Option>
            <Option value="profit">profit</Option>
            <Option value="all">{'profit&loss'}</Option>
          </Select>
          <Select
            style={{ width: '50%' }}
            defaultValue={sortingBy}
            onChange={handleSortingBy}
          >
            <Option value="name">sort by name</Option>
            <Option value="rank">sort by rank</Option>
            <Option value="profit">sort by profit</Option>
            <Option value="current">sort by current</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Card
              className={
                currency.operations?.total?.profit > 0
                  ? 'crypto-profit'
                  : 'crypto-loss'
              }
              title={`${currency.rank}. ${currency.name}`}
              extra={
                <img
                  alt="crypto"
                  className="crypto-image"
                  src={currency.image}
                />
              }
              hoverable
            >
              <p>Name: {currency.name}</p>
              <p>symbol: {currency.symbol}</p>
              <p>id: {currency.uuid}</p>
              <p>Price (Now): {currency.price}€</p>
              <p>
                Price (Buy):{' '}
                {(
                  currency.operations?.total?.fiat.euro /
                  currency.operations?.total?.coins
                ).toFixed(2)}
                €
              </p>
              <p>Market Cap: {millify(currency.marketCap)}</p>
              <p>Daily Change: {currency.change}%</p>
              <p>
                Crypto: {currency.operations?.total?.coins} {currency.symbol}
              </p>
              <p>
                Buy: {currency.operations?.total?.fiat.euro.toFixed(2)}€{' / '}
                {currency.operations?.total?.fiat.usd.toFixed(2)}$
              </p>
              <p>
                Current: {/*currency.operations.total.current.toFixed(2)*/}€
              </p>
              <p>
                {currency.operations?.total?.profit > 0 ? 'Profit: ' : 'Loss: '}
                {currency.operations?.total?.profit?.toFixed(2)} (
                {currency.operations?.total?.percent?.toFixed(2)}%)
              </p>
            </Card>
            <Button type="primary" onClick={() => showModal(currency.uiid)}>
              Details
            </Button>
          </Col>
        ))}
      </Row>
      <Modal
        title="Crypto details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'75%'}
      >
        coinId: {coinId}
        {<CryptoModal coinId={coinId} />}
      </Modal>
    </>
  )
}

export default Cryptocurrencies
