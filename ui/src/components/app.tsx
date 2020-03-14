import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { startClock } from '../store/actions';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    clockLastUpdate: number;
    clockLight: boolean;
}

interface DispatchProps {
    startCounter: () => any;
}

type Props = OwnProps & DispatchProps & StateProps;

class App extends React.Component<Props> {
    private _timer: number | undefined;

    public componentDidMount = () => {
        this.props.startCounter()
    };


    public componentWillUnmount = () => {
        clearInterval(this._timer);
    };

    public render = () => this.props.children;

}


const mapDispatchToProps = (dispatch: any) => {
    return {
        startCounter: () => dispatch(startClock()),
        
    };
};

const AppContainer = withRouter(connect(
    null,
    mapDispatchToProps,
)(App) as any);

export { App, AppContainer };
