import { style } from '@vanilla-extract/css';

export const game = style({
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url("../../assets/background.jpg")',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});
