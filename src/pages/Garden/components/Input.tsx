import {
  Box,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

interface InputProps extends ChakraInputProps {
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, ...props }: InputProps, ref) => {
    return (
      <Box pos={'relative'}>
        <ChakraInput
          fontWeight={'medium'}
          _placeholder={{ color: 'gray.400' }}
          minH={'56px'}
          borderBottom={'1px solid'}
          borderColor={'gray.100'}
          borderRadius={0}
          variant={'unstyled'}
          ref={ref}
          onWheel={(e) => e.currentTarget.blur()}
          autoComplete={'off'}
          {...props}
        />
        {errorMessage && (
          <Text
            pos={'absolute'}
            top={'60px'}
            color={'error'}
            fontSize={'14px'}
            fontWeight={'medium'}
          >
            {errorMessage}
          </Text>
        )}
      </Box>
    );
  },
);

export default Input;
