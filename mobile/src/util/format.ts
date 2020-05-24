const Intl = require('react-native-intl');

const formatPrice = (value: number): string => {
  return new Intl.Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export default formatPrice;
