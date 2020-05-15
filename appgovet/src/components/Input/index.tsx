import React, {useEffect, useRef} from 'react';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';

import {Container, TextInput, Icon} from './styles';

interface InputValueReference {
  value: string;
}

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputRef {
  focus(): void;
}

/*Como vou receber a REF dele aqui e ela não é passada como um parâmetro comum, temos que
criar um compeonente do tipo RefForwardingComponent pois com ele eu consigo acessar a REF
que vem como um parâmetro separado das props*/
const Input:React.RefForwardingComponent<InputRef, InputProps> = ({name, icon, ...rest}, ref) => {
//const Input:React.FC<InputProps> = ({name, icon, ...rest}) => {

  const inputElementRef = useRef<any>(null);

  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue});

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputValueRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputValueRef.current.clear();
      }
    })
  }, [fieldName, registerField]);

  return(
    <Container>
      <Icon name={icon} size={20} color='#666360' />
      <TextInput
        ref={inputElementRef}
        placeholderTextColor='#666360'
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
}

export default Input;
