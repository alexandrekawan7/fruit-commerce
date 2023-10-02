'use client'

import { Image, Flex, VStack, HStack, Spacer, IconButton, Grid, GridItem, Heading, SimpleGrid, Box, Text, Container, Button, Divider, AbsoluteCenter, useDisclosure, Alert, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import { useState, createElement, useRef, MutableRefObject } from 'react'

import { PriceKind, Product, ProductProps } from '../components/Product';

import useCart from '../hooks/useCart';

const productList: Array<ProductProps> = [
  {
    imageSource: '/img/maca.jpg',
    name: 'Maçã',
    price: 1.00,
    priceKind: PriceKind.Unitary
  },
  {
    imageSource: '/img/tomate.jpg',
    name: 'Tomate',
    price: 5.90,
    priceKind: PriceKind.Kilogram
  },
  {
    imageSource: '/img/cebola.jpg',
    name: 'Cebola',
    price: 5.50,
    priceKind: PriceKind.Kilogram
  },
  {
    imageSource: '/img/laranja.jpg',
    name: 'Laranja',
    price: 2.00,
    priceKind: PriceKind.Unitary
  }
];

export default function Home() {
  const productsAndPrices: Map<string, number> = new Map<string, number>();

  productList.forEach((product) => {
    productsAndPrices.set(product.name, product.price);
  });

  const [cart, setCartItem] = useCart(productsAndPrices);

  const products: React.ReactElement[] = [];

  productList.forEach((props
    : ProductProps) => {

    products.push(createElement(Product, {
      onUpdate: (value) => {
        setCartItem(props.name, value)
      },
      ...props
    }))
  })

  let subTotal = 0;

  const items: React.ReactElement[] = [];

  cart.forEach((numberOfProducts, productName) => {
    subTotal += numberOfProducts * (productsAndPrices.get(productName) ?? 0);

    if (numberOfProducts != 0) {
      items.push(<Flex w='100%' padding={1} justifyContent='space-between' border='1px solid black'>
        <Text>{productName}</Text>

        <Text>{numberOfProducts}</Text>
      </Flex>)
    }


  });

  items.push(<Container pr={0} mr={0} textAlign='right'>Total: R$ {(new Number(subTotal).toFixed(2))}</Container>)

  const { isOpen: isConfirmationOpen, onOpen: onConfirmationOpen, onClose: onConfirmationClose } = useDisclosure();
  let confirmationCancelRef = useRef(null);

  const { isOpen: isQRCodeOpen, onOpen: onQRCodeOpen, onClose: onQRCodeClose } = useDisclosure();
  let QRCodeCancelRef = useRef(null);



  return (
    <VStack alignItems="center" h='100vh' w='100vw'>
      <Box>
        <Flex alignItems="center" justifyContent="space-between" w="100vw" h="10vh" bgColor="#000">
          <Box padding={2}>
            <Heading size='md' color='#fff'>Sacolão Shop</Heading>
          </Box>
          <Box padding={2}>
            <Text color="#fff">R$ {(new Number(subTotal)).toFixed(2)}</Text>
          </Box>
        </Flex>
      </Box>


      <Box>
        <Flex direction="row" flexWrap="wrap" justifyContent='center' gap='8px'>
          {products}
        </Flex>
      </Box>

      <AbsoluteCenter>
        <AlertDialog
          isOpen={isConfirmationOpen}
          leastDestructiveRef={confirmationCancelRef}
          onClose={onConfirmationClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>
                Deseja mesmo comprar esses itens?
              </AlertDialogHeader>

              <AlertDialogBody>
                <VStack w='100%'>
                  {items}
                </VStack>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={confirmationCancelRef} onClick={onConfirmationClose}>
                  Não
                </Button>
                <Button colorScheme='green' ml={3} onClick={() => {
                  onConfirmationClose()
                  onQRCodeOpen()
                }}>
                  Sim
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </AbsoluteCenter>

      <AbsoluteCenter>
        <AlertDialog
          isOpen={isQRCodeOpen}
          leastDestructiveRef={QRCodeCancelRef}
          onClose={onQRCodeClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>
                
              </AlertDialogHeader>

              <AlertDialogBody>
                <Flex alignItems='center' justifyContent='center'>
                <Image src="/img/qr.svg" w='20vw' h='20vw'></Image>
                </Flex>
                
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onQRCodeClose} ref={QRCodeCancelRef}>Fechar</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </AbsoluteCenter>


      <Box position='relative' w='100vw' h='15vh' marginTop='10vh' bottom={0} left={0}>
        <Flex flexDirection='column' justifyContent='space-between' alignItems='center'>
          <Divider w='80vw' color='#000' mb={4} />
          <Button bg={(subTotal !== 0.00) ? '#000' : '#d5d5d5'} color='#fff' disabled={subTotal === 0.00} onClick={(subTotal !== 0.00) ? onConfirmationOpen : () => { }}>Fazer pedido</Button>
        </Flex>
      </Box>

    </VStack>
  )
}
