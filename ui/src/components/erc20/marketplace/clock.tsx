import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: ${props => props.theme.componentsTheme.background};
    display: flex;
    flex-direction: column;
    min-height: 100%;
    color: white;
`;

interface OwnProps {
    lastUpdate: number;
    light: boolean;
}

export default class Clock extends React.Component<OwnProps> {

    public format(t: Date): String {
        return `${this.pad(t.getUTCHours())}:${this.pad(t.getUTCMinutes())}:${this.pad(t.getUTCSeconds())}`
    }

    public pad(n: number): String {
        if(n < 10) {
            return `0${n}`;
        } else {
            return n.toString()
        }
    }


    
    render() {
        const { lastUpdate } = this.props;
        return(
            <Container>
                {this.format(new Date(lastUpdate))}
            </Container>
        )
    }
}