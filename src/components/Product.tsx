'use client'

import { Flex, Box, Image, Text, Button, NumberInput, Input, useNumberInput, HStack } from '@chakra-ui/react'
import { ChangeEvent, LegacyRef, useEffect, useRef } from 'react'

export interface ProductProps {
    imageSource: string,
    name: string
    price: number,
    priceKind: PriceKind
}

export interface ProductPropsWithCallback extends ProductProps {
    onUpdate: (value: number) => void;
}

export enum PriceKind {
    Kilogram,
    Unitary
}

export function Product({
    imageSource,
    name,
    price,
    priceKind,
    onUpdate
} : ProductPropsWithCallback) {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, htmlProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 100,
    })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    let iRef = useRef();

    useEffect(() => {
        // @ts-nocheck
        const value: number = iRef.current.value ?? 0;

        onUpdate(value)
    })

    return (
        <Flex direction="column" maxW='120px'>
            <Image src={imageSource} w='120px' h='120px' overflow='hidden' objectFit='cover' borderRadius='10%' border='2px solid black'/>

            <Text fontSize='lg' fontWeight='bolder'>{name}</Text>

            <Text fontWeight='light'>R$ {(new Number(price).toFixed(2))} / {(priceKind === PriceKind.Kilogram) ? 'quilo' : 'unidade'}</Text>

            <HStack>
                <Button {...dec}>-</Button>
                <Input {...input} padding={0} textAlign='center' ref={iRef}/>
                <Button {...inc}>+</Button>
            </HStack>
        </Flex>
    );
}