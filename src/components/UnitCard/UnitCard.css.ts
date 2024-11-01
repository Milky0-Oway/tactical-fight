import { style } from '@vanilla-extract/css';

export const card = style({
    display: 'flex',
    padding: '10px 20px',
    width: 300,
    height: 150,
    gap: '10px',
    alignItems: 'center',
    ':hover': {
        backgroundColor: '#444',
        cursor: 'pointer',
    },
});

export const cardText = style({
    width: 200,
});

export const hpText = style({
    position: 'relative',
    zIndex: 2,
    top: 22,
    left: 10,
});

export const hp = style({
    maxWidth: '100%',
    height: 25,
    borderRadius: 20,
    backgroundColor: '#d40214',
});

export const hpOutline = style({
    border: '2px solid black',
    overflow: 'hidden',
    position: 'relative',
    top: -20,
    height: 25,
    borderRadius: 20,
});

export const possible = style({
    backgroundColor: '#a85128',
});

export const dead = style({
    backgroundColor: 'black',
});

export const defend = style({
    backgroundColor: '#c77614',
});

export const paralyzed = style({
    backgroundColor: '#3c32a8',
});

export const current = style({
    backgroundColor: '#32a852',
});

export const selected = style({
    backgroundColor: '#91143e',
});

export const image = style({
    height: 100,
    width: 100,
});
