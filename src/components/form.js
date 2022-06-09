import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Col, Form, Button } from 'react-bootstrap';
import {decimalToRoman, romanToDecimal} from '../features/convertSlice';

function FormConverter() {
  const [optionNumber, setOptionNumber] = useState('romanos');
  const [payload, setPayload] = useState('');
  const result = useSelector(state => state.convert.value);
  const dispatch = useDispatch(); 

  const convert = (e) => {
    e.preventDefault();
    
    if(optionNumber === 'decimal') {
      dispatch(decimalToRoman(payload));
    }else{
      dispatch(romanToDecimal(payload));
    }
  }

  const changeNumber = (e) => { 
    if(optionNumber === 'romanos'){
      setOptionNumber('decimal');
    }else{
      setOptionNumber('romanos');
    }
  }

  return (
    <Col>
      <Form onSubmit={e => convert(e)}>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{optionNumber}</Form.Label>
          <Form.Control type="text" onChange={e => setPayload(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{optionNumber === 'romanos' ? 'Decimales' : 'Romanos'}</Form.Label>
          <Form.Control type="text" value={result} disabled />
        </Form.Group>
      
        <Button variant="primary" type="submit">
          Convertir
        </Button>
        <Button variant="secondary" type="reset" onClick={changeNumber}>{optionNumber}</ Button>
      </Form>
    </Col>
  );
}

export default FormConverter;
