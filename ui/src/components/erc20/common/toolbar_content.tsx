import React from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import styled, { withTheme } from 'styled-components';

import { ReactComponent as LogoSvg } from '../../../assets/icons/erc20_logo.svg';
import { Config } from '../../../common/config';
import { UI_GENERAL_TITLE } from '../../../common/constants';
import { Logo } from '../../../components/common/logo';
import { separatorTopbar, ToolbarContainer } from '../../../components/common/toolbar';
import { goToHome, goToWallet } from '../../../store/actions';
import { Theme } from '../../../themes/commons';

interface DispatchProps {
    onGoToHome: () => any;
    onGoToWallet: () => any;
}

interface OwnProps {
    theme: Theme;
}

type Props = DispatchProps & OwnProps;


const LogoHeader = styled(Logo)`
    ${separatorTopbar}
`;

const LogoSVGStyled = styled(LogoSvg)`
    path {
        fill: ${props => props.theme.componentsTheme.logoERC20Color};
    }
`;


const ToolbarContent = (props: Props) => {
    const handleLogoClick: React.EventHandler<React.MouseEvent> = e => {
        e.preventDefault();
        props.onGoToHome();
    };
    const generalConfig = Config.getConfig().general;
    const logo = generalConfig && generalConfig.icon ? <ReactSVG src={generalConfig.icon} /> : <LogoSVGStyled />;
    const startContent = (
        <>
            <LogoHeader
                image={logo}
                onClick={handleLogoClick}
                text={(generalConfig && generalConfig.title) || UI_GENERAL_TITLE}
                textColor={props.theme.componentsTheme.logoERC20TextColor}
            />
        </>
    );

    return <ToolbarContainer startContent={startContent} />;
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        onGoToHome: () => dispatch(goToHome()),
        onGoToWallet: () => dispatch(goToWallet()),
    };
};

const ToolbarContentContainer = withTheme(
    connect(
        null,
        mapDispatchToProps,
    )(ToolbarContent),
);

export { ToolbarContent, ToolbarContentContainer };
