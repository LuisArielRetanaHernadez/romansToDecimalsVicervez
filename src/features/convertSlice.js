import { createSlice } from '@reduxjs/toolkit'


export const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    value: '',
  },
  reducers: {
    romanToDecimal: (state, action) => {
      const conversion = {
        M: 1000,
        D: 500,
        C: 100,
        L: 50,
        X: 10,
        V: 5,
        I: 1,
      };  

      const repetRomans = [0, 0]
      let arr = action.payload.toUpperCase().split("");
      let total = 0;
      let current, currentValue, next, nextValue, err;

      for (let i = 0; i < arr.length; i++) {

        current = arr[i];
        currentValue = conversion[current];
        next = arr[i + 1];
        nextValue = conversion[next];

        if(
          currentValue + nextValue === 10 
          || (current === 'V' && currentValue < nextValue)
          ) { 
            err = true;
            break;
          }
    
        if (repetRomans[0] === current) repetRomans[1] += 1;

        if (repetRomans[1] >= 3) {
          err = true;
          break;
        }
        
        if (repetRomans[0] !== current) {
          repetRomans[0] = current;
          repetRomans[1] = 0;
        }

        console.log(repetRomans)

        if (currentValue < nextValue) {
          total -= currentValue;
        } else {
          total += currentValue;
        }
      } 
      state.value = err ? '' : total;
    },
    decimalToRoman: (state, action) => {
      let
      values = [1, 5, 10, 50, 100, 500, 1000],
      letras = ['I', 'V', 'X', 'L', 'C', 'D', 'M'],
      res = [],
      num, letra, val, pos, insert
  
      for(let i = 6; i >= 0;i--) {
        num = values[i];
        letra = letras[i];

        if(action.payload >= num) {
        let r = Math.floor(action.payload / num); 
    
        action.payload -= r * num; 
    
        if(r < 4){
          while(r--){
            res.push(letra);
          }
        } else {
          val = res.pop(); // Última letra
          pos = (val ? letras.indexOf(val) : i) + 1; 
    
          insert = letra + (letras[pos] || 'M'); 
    
          res.push(insert);
        }
        } else {
      
          res.push('');
        }
      }
  
      state.value = res.join('');
    }
  }  
})

export const { romanToDecimal, decimalToRoman } = convertSlice.actions

export default convertSlice.reducer