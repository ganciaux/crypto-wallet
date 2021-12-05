import React from 'react'

const CryptoOperations = ({ currency }) => {
  console.log(currency)
  return (
    <div>
      <h4>
        {currency.name}: {currency.current_price}€
      </h4>
      <table className="crypto-table">
        <thead>
          <th>Timestamp (UTC)</th>
          <th>Transaction</th>
          <th>Currency</th>
          <th>Amount</th>
          <th>To Currency</th>
          <th>To Amount</th>
          <th>Native Currency</th>
          <th>EURO</th>
          <th>USD</th>
          <th>Kind</th>
        </thead>
        <tbody>
          {currency.operations?.operations?.map((operation) => {
            return (
              <tr key={operation}>
                <td>{operation['Timestamp (UTC)']}</td>
                <td>{operation['Transaction Description']}</td>
                <td>{operation['Currency']}</td>
                <td>
                  {operation['Amount']}
                  {operation['Transaction Kind'] === 'crypto_purchase'
                    ? ` (${(
                        parseFloat(operation['Native Amount']) /
                        parseFloat(operation['Amount'])
                      ).toFixed(3)}€)`
                    : ''}
                </td>
                <td>{operation['To Currency']}</td>
                <td>
                  {operation['To Amount']}
                  {operation['Transaction Kind'] === 'crypto_exchange'
                    ? ` (${(
                        parseFloat(operation['Native Amount']) /
                        parseFloat(operation['To Amount'])
                      ).toFixed(3)}€)`
                    : ''}
                </td>
                <td>{operation['Native Currency']}</td>
                <td>{operation['Native Amount']}</td>
                <td>
                  {parseFloat(operation['Native Amount (in USD)']).toFixed(2)}
                </td>
                <td>{operation['Transaction Kind']}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CryptoOperations
