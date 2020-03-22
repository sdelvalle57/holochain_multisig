import styled from 'react-emotion';
import { unit } from '../styles';
 
 
 export const SmallContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
  })

 export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
  });