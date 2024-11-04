import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70vw',
});

export const table = style({
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridTemplateColumns: 'repeat(3, 340px)',
    columnGap: 10,
    rowGap: 10,
    padding: 30,
});

export const teamA = style({
    backgroundColor: '#00059940',
});

export const teamB = style({
    backgroundColor: '#99000d40',
});

export const buttons = style({
    display: 'flex',
    gap: 20,
    padding: 20,
});
