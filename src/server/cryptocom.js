const crypto = require("crypto-js");

const signRequest = (request, apiKey, apiSecret) => {
  const { id, method, params, nonce } = request;

  const paramsString =
    params == null
      ? ""
      : Object.keys(params)
          .sort()
          .reduce((a, b) => {
            return a + b + params[b];
          }, "");

  const sigPayload = method + id + apiKey + paramsString + nonce;

  request.sig = crypto
    .HmacSHA256(sigPayload, apiSecret)
    .toString(crypto.enc.Hex);

  return request;
};

const apiKey = "HmNr3rSBxGoVALNw2VZVEW"; /* User API Key */
const apiSecret = "mP9rXpxZCMdn2DgxseqfsN"; /* User API Secret */

let request = {
  id: 11,
  method: "private/get-order-detail",
  api_key: apiKey,
  params: {
    order_id: 53287421324
  },
  nonce: 1587846358253,
};

const requestBody = JSON.stringify(signRequest(request, apiKey, apiSecret));

console.log(requestBody)