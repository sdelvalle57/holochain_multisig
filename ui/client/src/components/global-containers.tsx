import styled, { css } from 'react-emotion';
import { unit, colors, } from '../styles';
import { Link } from '@reach/router';
import { lighten } from 'polished';
 
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

  export const InnerContainer = styled('div')({
    display: 'block',
    alignItems: 'center',
    maxWidth: 600,
    backgroundColor: 'white',
    padding: unit * 2.5,
    margin: '1em auto',
  });


  const cardClassName = css({
    padding: `${unit * 4}px ${unit * 5}px`,
    borderRadius: 7,
    color: 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  const padding = unit * 2;
  export const StyledLink = styled(Link)(cardClassName, {
    display: 'inline-block',
    width: 650,
    margin: '0  auto',
    ':hover': {
      backgroundColor: lighten(0.1, colors.primary),
    },
    padding: padding,
    backgroundColor: colors.primary,
    textDecoration: 'none',
    ':not(:last-child)': {
      marginBottom: padding * 2,
    },
  });


  export const StyledForm = styled('form')({
    width: '100%',
    maxWidth: 406,
    padding: unit * 3.5,
    borderRadius: 3,
    boxShadow: '6px 6px 1px rgba(0, 0, 0, 0.25)',
    color: colors.text,
    backgroundColor: 'white',
  });
  
  export const StyledInput = styled('input')({
    width: '100%',
    marginBottom: unit * 2,
    padding: `${unit * 1.25}px ${unit * 2.5}px`,
    border: `1px solid ${colors.grey}`,
    fontSize: 16,
    outline: 'none',
    ':focus': {
      borderColor: colors.primary,
    },
  });

  
  