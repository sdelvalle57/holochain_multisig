import React from 'react';
import styled from 'react-emotion';

import { colors } from '../styles';
import { InnerContainer } from './container';
import { ApolloError } from 'apollo-client';

export interface ErrorProps {
    error: ApolloError
}

const Error: React.FC<ErrorProps> = ({ error}) => {
  return (
    <Container>
      <InnerContainer>
        <h3>Error</h3>
        <h4>{error.message}</h4>
        {error.graphQLErrors.map(err => {
          return(
            <div>
              <p>{err.extensions.code}</p>
              <p>{err.extensions.exception.error}</p>
            </div>
          )
        })}
        
      </InnerContainer>
    </Container>
  );
}

export default Error;

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('footer')({
  flexShrink: 0,
  marginTop: 'auto',
  backgroundColor: 'white',
  color: colors.textSecondary,
  position: 'sticky',
  bottom: 0,
});


