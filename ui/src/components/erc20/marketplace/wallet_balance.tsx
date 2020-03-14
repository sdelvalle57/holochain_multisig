import React from 'react';
import { connect } from 'react-redux';

import Clock from './clock';

import { getClockLastUpdate, getClockLight, getCount } from '../../../store/selectors';

import { StoreState } from '../../../util/types';


interface StateProps {
    clockLastUpdate: number;
    clockLight: boolean;
    count: number;
}

type Props = StateProps;

class WalletBalance extends React.Component<Props> {
    public render = () => {
        const { clockLastUpdate, clockLight } = this.props;
        return (
            <Clock lastUpdate={clockLastUpdate} light={clockLight} />
        );
    };
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        clockLastUpdate: getClockLastUpdate(state),
        clockLight: getClockLight(state),
        count: getCount(state)
    };
};


const WalletBalanceContainer = connect(
    mapStateToProps,
    null,
)(WalletBalance);

export { WalletBalance, WalletBalanceContainer };
