var fs = require('fs')

const formatValue = (string) => {
  const value = parseFloat(string)
  if (Number.isNaN(value) == true) return 0.0
  else return value
}

const getCurrencyTotal = (currency, filter = {}) => {
  const total = { crypto: 0.0, euro: 0.0 }
  const { key, value } = filter
  currency.operations.forEach((operation) => {
    let sum = true
    if (key !== undefined && value !== undefined) {
      if (operation[key] === value) {
        sum = false
      }
    }
    if (sum === true) {
      if (operation['Currency'] === currency.label) {
        total.crypto += formatValue(operation['Amount'])
        if (
          operation['To Currency'].length > 0 &&
          operation['To Currency'] !== currency.label &&
          formatValue(operation['Amount']) < 0
        ) {
          total.euro -= formatValue(operation['Native Amount']).toFixed(2)
        } else {
          total.euro += formatValue(operation['Native Amount']).toFixed(2)
        }
      } else if (operation['To Currency'] === currency.label) {
        total.crypto += formatValue(operation['To Amount'])
        total.euro += formatValue(operation['Native Amount'])
      }
    }
  })
  return total
}

const getTotal = (operations, data, filter = {}) => {
  const { key, value } = filter
  const total = operations.reduce(function (acc, cur) {
    if (key !== undefined && value !== undefined) {
      if (cur[key] === value) {
        return acc + formatValue(cur[data])
      } else return acc
    } else {
      return acc + formatValue(cur[data])
    }
  }, 0.0)
  return total.toFixed(2)
}

const operationsSet = (result, value, key) => {
  if (value[key].length > 0) {
    const data = result.find((data) => data['label'] === value[key])
    if (data === undefined) {
      result.push({ label: value[key], operations: [{ ...value }] })
    } else {
      data['operations'].push(value)
    }
  }
}

export const read = (data) => {
  let headers = []
  let result = {
    operations: [],
    currencies: [],
    transactionKind: [],
    total_purchase: 0.0,
  }

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
        operationsSet(result.currencies, cell, 'Currency')
        operationsSet(result.currencies, cell, 'To Currency')
        operationsSet(result.transactionKind, cell, 'Transaction Kind')
        result.operations.push(cell)
      }
    }
  })

  result.currencies.forEach((currency) => {
    currency.total = getCurrencyTotal(currency, {
      key: 'Transaction Kind',
      value: 'lockup_lock',
    })
  })

  result.total_purchase = getTotal(result.operations, 'Native Amount', {
    key: 'Transaction Kind',
    value: 'crypto_purchase',
  })

  return result
}

export const write = (file, data) => {
  fs.writeFile(`${__dirname}${file}`, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}

//const data = fs.readFileSync(`${__dirname}${file}`, 'utf8')
