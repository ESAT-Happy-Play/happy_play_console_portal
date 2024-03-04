
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';


/*IOS Switch:
    Pass any prop that works with switches.
    Pass size: "small" | "medium" (default)
*/


const CustomSwitch = styled((props) => {
    return (
        <Switch disableRipple {...props}
            sx={{
                width: props.size == "small" ? 31.5 : 42,
                height: props.size == "small" ? 20.5 : 26,
                '& .MuiSwitch-thumb': {
                    boxSizing: 'border-box',
                    width: props.size == "small" ? 16.5 : 22,
                    height: props.size == "small" ? 16.5 : 22,
                },
                '& .MuiSwitch-switchBase': {
                    '&.Mui-checked': {
                        transform: props.size == "small" ? 'translateX(11px)' : 'translateX(16px)',
                        color: '#fff',
                    },
                }
            }}
        />
    )
})(({ theme }) => ({
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export const IOSSwitch = (props) => {
    return (
        <CustomSwitch {...props} />
    );
}
