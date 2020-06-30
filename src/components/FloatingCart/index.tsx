import React, { useState, useMemo } from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../util/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    const total = products.reduce(
      (totalValue, { price, quantity }) => totalValue + price * quantity,
      0,
    );

    return total;
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const total = products.reduce(
      (totalQuantity, { quantity }) => totalQuantity + quantity,
      0,
    );

    return total;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{formatValue(cartTotal)}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
