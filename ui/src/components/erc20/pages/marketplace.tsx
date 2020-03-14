import React from 'react';

import { ColumnNarrow } from '../../common/column_narrow';
import { Content } from '../common/content_wrapper';
import { WalletBalanceContainer } from '../marketplace/wallet_balance';

class Marketplace extends React.PureComponent {
    public render = () => {
        return (
            <Content>
                <ColumnNarrow>
                    <WalletBalanceContainer />
                </ColumnNarrow>
            </Content>
        );
    };
}

export { Marketplace };
