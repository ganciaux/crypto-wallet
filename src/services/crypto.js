var fs = require('fs')

const formatValue = (string) => {
  const value = parseFloat(string)
  if (Number.isNaN(value) == true) return 0.0
  else return value
}

const getCurrencyTotal = (currency) => {
  const total = { coins: 0.0, fiat: {euro: 0.0, usd:0.0}, profit:0.0 }

  currency.operations.forEach((operation) => {
    if (operation['Transaction Kind']!=='lockup_lock')
    {
      if (operation['Currency'] === currency.symbol) {
        total.coins += formatValue(operation['Amount'])
        if (
          operation['To Currency'].length > 0 &&
          operation['To Currency'] !== currency.symbol &&
          formatValue(operation['Amount']) < 0
        ) {
          total.fiat.euro -= formatValue(operation['Native Amount'])
          total.fiat.usd -= formatValue(operation['Native Amount (in USD)'])
        } else {
          total.fiat.euro += formatValue(operation['Native Amount'])
          total.fiat.usd += formatValue(operation['Native Amount (in USD)'])
        }
      } else if (operation['To Currency'] === currency.symbol) {
        total.coins += formatValue(operation['To Amount'])
        total.fiat.euro += formatValue(operation['Native Amount'])
        total.fiat.usd += formatValue(operation['Native Amount (in USD)'])
      } else{
        /* */
      }
      console.log('getCurrencyTotal: ', currency.symbol, ': ', total);
    }
  })
  
  return total
}

const getTotal = (operations) => {
  const total = operations.reduce((acc, cur) => {
    if (cur['Transaction Kind']==='crypto_purchase'){
      const euro=acc['euro']+formatValue(cur['Native Amount']);
      const usd=acc['usd']+formatValue(cur['Native Amount (in USD)']);
      console.log(cur['Transaction Kind'], ': ', cur['Transaction Description'], ': ', cur['Amount'])
      return {euro, usd}
    } else
      return acc;
    }, {euro:0.0, usd:0.0})
  return total
}
	
const operationsSet = (result, value, key) => {
  if (value[key].length > 0) {
    const data = result.find((data) => data['symbol'] === value[key])
    if (data === undefined) {
      result.push({ symbol: value[key], operations: [{ ...value }] })
    } else {
      data['operations'].push(value)
    }
  }
}

const read = (file) => {
  let headers = []
  let result = {
    currencies: {
      coins:[],
      total_purchase: 0.0,
    },
    history:[],
  }

  const data = fs.readFileSync(`${__dirname}${file}`, 'utf8')

  const lines = data.toString().split('\r\n')
  lines.forEach((line, index) => {
    if (line.length > 0) {
      const cells = line.split(',')
      if (index === 0) {
        headers = cells
      } else {
        const cell = cells.reduce(
          (acc, cur, index) => ({ ...acc, [headers[index]]: cur }),
          {},
        )
        operationsSet(result.currencies.coins, cell, 'Currency')
        operationsSet(result.currencies.coins, cell, 'To Currency')
        result.history.push(cell)
      }
    }
  })

  result.currencies.coins.forEach((coin) => {
    coin.total = getCurrencyTotal(coin)
  })
  
  result.currencies.total_purchase = getTotal(result.history)

  return result
}

const write = (file, data) => {
  fs.writeFile(`${__dirname}${file}`, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err)
      return
    }
    else{
      console.log(`${__dirname}${file}: success`)
    }
  })
}

const data = read(`/../data/crypto_transactions_record.csv`, 'utf8')

write('/../data/crypto_com_currencies.json', data.currencies)
write('/../data/crypto_com_history.json', data.history)