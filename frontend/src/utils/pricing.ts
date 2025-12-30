// Cotação atual do dólar (USD) para Real (BRL)
// Valor mínimo em reais que queremos atingir
const MIN_PRICE_BRL = 2.0

// Cotação atual: 1 USD = X BRL
// Atualmente: 2 BRL = 0.36 USD, então 1 USD ≈ 5.56 BRL
// Para calcular: MIN_PRICE_BRL / USD_TO_BRL_RATE = 0.36 USD
// USD_TO_BRL_RATE = 2.0 / 0.36 ≈ 5.56
const USD_TO_BRL_RATE = 5.56 // Atualize esta constante conforme a cotação atual

// Calcula o preço mínimo em USD baseado na cotação atual
export const getMinPriceUSD = (): number => {
  return MIN_PRICE_BRL / USD_TO_BRL_RATE
}

// Formata o preço mínimo para exibição
export const formatMinPrice = (): string => {
  const minPrice = getMinPriceUSD()
  return `$${minPrice.toFixed(2)} USD`
}

// Atualiza a cotação (pode ser chamado quando a cotação mudar)
export const updateExchangeRate = (_newRate: number): void => {
  // Esta função pode ser usada para atualizar a cotação dinamicamente
  // Por enquanto, mantemos como constante, mas pode ser expandido
  // para buscar de uma API de cotação
}

// Retorna a cotação atual
export const getCurrentExchangeRate = (): number => {
  return USD_TO_BRL_RATE
}

