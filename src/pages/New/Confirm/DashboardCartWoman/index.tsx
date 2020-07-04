import React, { useState, useEffect } from 'react';
import FeatherIcon from 'react-native-vector-icons/MaterialIcons';


import { View, TouchableOpacity } from 'react-native';

import formatValue from '../../../../util/formatValue';
import { useCart } from '../../../../hooks/cart';
import api from '../../../../services/api';

import FloatingCart from '../../../../components/FloatingCart';

import {
  Container,
  ProductContainer,
  ProductImage,
  ProductList,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
} from './styles';

interface ProductData {
  id: string;
  name: string;
  image_url: string;
  price: number;
  gender: number;
}

const DashboardCartWoman: React.FC = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('/categories/1');

      setProducts(response.data);
    }

    loadProducts();
  }, []);

  function handleAddToCart(item: ProductData): void {
    addToCart(item);
  }

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
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }} />
              <ProductTitle>{item.name}</ProductTitle>
              <PriceContainer>
                <ProductPrice>{formatValue(item.price)}</ProductPrice>
                <ProductButton
                  testID={`add-to-cart-${item.id}`}
                  onPress={() => handleAddToCart(item)}
                >
                  <FeatherIcon size={20} name="add" color="#C4C4C4" />
                </ProductButton>
              </PriceContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
};

export default DashboardCartWoman;


