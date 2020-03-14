import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import { themeBreakPoints, themeDimensions } from '../../themes/commons';

interface OwnProps {
    centerContent?: React.ReactNode;
    startContent: React.ReactNode;
}


type Props = OwnProps;

export const separatorTopbar = css`
    &:after {
        background-color: ${props => props.theme.componentsTheme.topbarSeparatorColor};
        content: '';
        height: 26px;
        margin-left: 17px;
        margin-right: 17px;
        width: 1px;
    }
    &:last-child:after {
        display: none;
    }
`;

const ToolbarWrapper = styled.div`
    align-items: center;
    background: ${props => props.theme.componentsTheme.topbarBackgroundColor};
    border-bottom: 1px solid ${props => props.theme.componentsTheme.topbarBorderColor};
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    height: ${themeDimensions.toolbarHeight};
    justify-content: space-between;
    padding: 0 ${themeDimensions.horizontalPadding};
    position: sticky;
    top: 0;
    z-index: 123;
`;

const ToolbarStart = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;

    @media (min-width: ${themeBreakPoints.xxl}) {
        min-width: 33.33%;
    }
`;

const Toolbar = (props: Props) => {
    const { startContent } = props;

    
    return (
        <ToolbarWrapper>
            <ToolbarStart>{startContent}</ToolbarStart>
        </ToolbarWrapper>
    );
};



const ToolbarContainer = connect(null)(Toolbar);

export { Toolbar, ToolbarContainer };
