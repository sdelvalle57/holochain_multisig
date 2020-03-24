import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from '@reach/router';

import {InnerContainer, StyledLink} from './global-containers';

import {GET_ALL_MULTISIGS} from '../queries';
import { Multisigs } from '../__generated__/Multisigs';
import styled from 'react-emotion';

import {Error} from '.'

interface DashboardProps extends RouteComponentProps {
}

const MyMultisigs: React.FC<DashboardProps> = () => {

  const { 
    data, 
    loading, 
    error
  } = useQuery<
  Multisigs
  >(GET_ALL_MULTISIGS);

  
  if (loading) return null;
  if (error) return <Error error={error} />;
  if (data?.getMyMultisigs.length === 0) return null;
  return (
    <Fragment>
            <Container>
                <h3>My Multisigs</h3><br/>
                {
                    data?.getMyMultisigs.map(el => {
                        return (
                            <StyledLink to={`/created/${el?.address}`} >
                                <h3>{el?.title?.toUpperCase()}</h3>
                                <h4>{el?.description}</h4>
                                <p><div><strong>Required: </strong>{el?.required}</div></p>
                                <p><div><strong>Owner: </strong>{el?.creator}</div></p>
                                <p>
                                    <h4><strong>Signatories</strong></h4>
                                    {
                                        el?.signatories.map(s => <div>{s}</div>)
                                    }
                                </p>
                            </StyledLink>
                        )
                    })
                }
                
                
            </Container>
      </Fragment>
  )
}

export default MyMultisigs;

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    margin: '0 auto',
    textAlign: 'center',
  });

