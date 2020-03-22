import styled, { keyframes } from 'react-emotion';
import { size } from 'polished';

import { ReactComponent as LoadingLogo } from '../assets/loading.svg';
import { colors } from '../styles';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled(LoadingLogo)(size(64), {
  display: 'block',
  margin: 'auto',
  fill: colors.grey,
  path: {
    transformOrigin: 'center',
    animation: `${spin} 1s linear infinite`,
  },
});

export default Loading;
