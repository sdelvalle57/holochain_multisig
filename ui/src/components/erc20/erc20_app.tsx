import React from 'react';
import { Route, Switch } from 'react-router';
import { ThemeProvider } from 'styled-components';

import { ERC20_APP_BASE_PATH } from '../../common/constants';
import { GeneralLayout } from '../../components/general_layout';
import { getThemeByName } from '../../themes/theme_meta_data_utils';

import { ToolbarContentContainer } from './common/toolbar_content';
import { Marketplace } from './pages/marketplace';

const toolbar = <ToolbarContentContainer />;

export const Erc20App = () => {
    const themeColor = getThemeByName();

    return (
        <ThemeProvider theme={themeColor}>
            <GeneralLayout toolbar={toolbar}>
                <Switch>
                    <Route exact={true} path={`${ERC20_APP_BASE_PATH}/`} component={Marketplace} />
                </Switch>
            </GeneralLayout>
        </ThemeProvider>
    );
};
