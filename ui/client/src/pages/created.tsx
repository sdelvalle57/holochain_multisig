import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from '@reach/router';

import {Container} from '../components/container';

import { GET_MULTISIG } from '../queries';
import { MultisigVariables, Multisig } from '../__generated__/Multisig';
import { Loading } from '../components';

interface CreatedProps extends RouteComponentProps {
    multisigAddress?: string;
}

const Created: React.FC<CreatedProps> = ({multisigAddress}) => {

    const { 
      data, 
      loading, 
      error
    } = useQuery<
    Multisig, MultisigVariables
    >(GET_MULTISIG , {
      variables: {address: multisigAddress || ""}
    });
  
    
    if (loading) return <Loading />;
    if (error || !data) return <p>ERROR {error ? error.message: ""}</p>;
    console.log(data)

  return (
    <Fragment>
      <Container>
        <Container>
          <h1>{data.getMultisig?.title.toUpperCase()}</h1><br/>
          <h3>{data.getMultisig?.description}</h3><br/>
          <p>
            <div><strong>Required: </strong>{data.getMultisig?.required}</div>
            <div><strong>Address: </strong>{multisigAddress}</div>
          </p>

          <p>
            <h4>Signatories</h4>
            {
              data.getMultisig?.owners.map(s => <div>{s}</div>)
            }
          </p>
          </Container>
      </Container>
      </Fragment>
  )
}

export default Created;
