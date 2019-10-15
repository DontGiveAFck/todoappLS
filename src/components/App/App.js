import React, { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import './App.css';
import { Container, Fade } from '@material-ui/core';
import Page from "../Page/Page";
import { FADE_TIMEOUT } from '../../constants/constants';

const block = cn('App');

function App() {
    const [fade, setFade] = React.useState(false);

    useEffect(() => {
        setFade(true);
    }, []);

    return (
        <div className={block()} >
            <Fade in={fade} timeout={FADE_TIMEOUT}>
                <Container>
                    <Page/>
                </Container>
            </Fade>
        </div>
    );
}

export default App;
