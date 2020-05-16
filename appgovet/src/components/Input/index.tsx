import React, {
                useEffect,
                useRef,
                forwardRef,
                useState,
                useCallback,
                useImperativeHandle //Recurso de conhecimento já mais avançado, serve para passar uma funcao para o componente PAI
                } from 'react';
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

  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleInputFocused = useCallback(() => {setIsFocused(true)}, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);

  }, []);

  const inputElementRef = useRef<any>(null);

  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue});

  /*ref + função que retorna as informações a serem jogadas na REF. Aqui vem a implementação
  que o componente filho faz e que pode ser acessada pelo componente pai através da REF. Essa
  é  forma de um componente pai acessar um conteúdo do componente filho, o mais comum é o filho
  acessar o conteúdo do componente PAI e esse conteúdo é passado através das props*/
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }));

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
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#666360'} />
      <TextInput
        ref={inputElementRef}
        placeholderTextColor='#666360'
        defaultValue={defaultValue}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
}

export default forwardRef(Input);
