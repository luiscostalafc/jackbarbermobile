import React, { useMemo } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import navigations from '../../../services/navigations';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { View } from 'react-native';

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
	TotalProductsText,
	ConfirmButton,
  SubtotalValue,
} from './styles';

import { useCart } from '../../../hooks/cart';

import formatValue from '../../../util/formatValue';

interface Product {
  id: string;
  name: string;
  avatar_id: number;
  price: number;
  gender: number;
  quantity: number;
}

const CartMan: React.FC = (item) => {


  const { increment, decrement, products } = useCart();

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  const cartTotal = useMemo(() => {
    const total = products.reduce(
      (totalValue, { price, quantity }) => totalValue + price * quantity,
      0,
    );

    return formatValue(total);
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
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }: { item: Product }) => (
            <Product>
              <ProductImage source={{ uri: item.avatar.path }} />
              <ProductTitleContainer>
                <ProductTitle>{item.name}</ProductTitle>
                <ProductPriceContainer>
                  <ProductSinglePrice>
                    {formatValue(item.price)}
                  </ProductSinglePrice>

                  <TotalContainer>
                    <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                    <ProductPrice>
                      {formatValue(item.price * item.quantity)}
                    </ProductPrice>
                  </TotalContainer>
                </ProductPriceContainer>
              </ProductTitleContainer>
              <ActionContainer>
                <ActionButton
                  testID={`increment-${item.id}`}
                  onPress={() => handleIncrement(item.id)}
                >
                  <MaterialIcons name="add" color="#E83F5B" size={16} />
                </ActionButton>
                <ActionButton
                  testID={`decrement-${item.id}`}
                  onPress={() => handleDecrement(item.id)}
                >
                  <MaterialCommunityIcons name="minus" color="#E83F5B" size={16} />
                </ActionButton>
              </ActionContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <TotalProductsContainer>
        <MaterialIcons name="shopping-cart" color="#fff" size={24} />
        <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
				<ConfirmButton onPress={() => {
						navigations.navigate('SelectProviderMan');
					}}>
						<MaterialCommunityIcons name="check-bold" color="#fff" size={30} />
					</ConfirmButton>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default CartMan;
