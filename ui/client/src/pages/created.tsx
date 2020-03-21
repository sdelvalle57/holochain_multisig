import React, { Fragment } from 'react';

import { RouteComponentProps } from '@reach/router';
import {CreateMultisig_createMultisig} from './__generated__/CreateMultisig';


import {Container} from '../components/container';

interface CreatedProps extends RouteComponentProps {
}

const Created: React.FC<CreatedProps> = () => {

  return (
    <Fragment>
      <Container>
        <Container>
          <h1>My Multisig</h1><br/>
          <p>
            <h4>Address: </h4>
          </p>
          </Container>
      </Container>
      </Fragment>
  )
}

export default Created;
