import { style } from '@vanilla-extract/css';

export const table = style({
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
    padding: 30,
});
