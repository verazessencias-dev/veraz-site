exports.handler = async function (event) {
  const headersCORS = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const cepRaw = (event.queryStringParameters && event.queryStringParameters.cep) || "";
  const cep = cepRaw.replace(/\D/g, "");

  if (cep.length !== 8) {
    return {
      statusCode: 400,
      headers: headersCORS,
      body: JSON.stringify({ error: "CEP inválido. Envie os 8 números." }),
    };
  }

  const token = process.env.MELHOR_ENVIO_TOKEN;
  if (!token) {
    return {
      statusCode: 500,
      headers: headersCORS,
      body: JSON.stringify({ error: "Token do Melhor Envio não configurado no servidor." }),
    };
  }

  const payload = {
    from: { postal_code: "05041000" },
    to: { postal_code: cep },
    products: [
      {
        id: "veraz-frasco",
        width: 6,
        height: 15,
        length: 6,
        weight: 0.25,
        insurance_value: 100,
        quantity: 1,
      },
    ],
    options: { receipt: false, own_hand: false },
  };

  try {
    const resp = await fetch(
      "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "VERAZ Essencias (contato@verazessencias.com.br)",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await resp.json();

    if (!Array.isArray(data)) {
      return {
        statusCode: 502,
        headers: headersCORS,
        body: JSON.stringify({ error: "Resposta inesperada do Melhor Envio.", detail: data }),
      };
    }

    const options = data
      .filter((o) => !o.error && o.price)
      .map((o) => ({
        service: o.name,
        company: o.company && o.company.name,
        price: parseFloat(o.custom_price || o.price),
        deliveryTime: o.custom_delivery_time || o.delivery_time,
      }))
      .sort((a, b) => a.price - b.price);

    return {
      statusCode: 200,
      headers: headersCORS,
      body: JSON.stringify({ options }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: headersCORS,
      body: JSON.stringify({ error: "Falha ao consultar o Melhor Envio.", detail: String(err) }),
    };
  }
};
