import { TextField } from '@mui/material';


export function PrimaryInput(props) {
    return <TextField
        sx={{
            input: { color: "#fa9c1e" },
            label: { color: "#fa9c1e" },
            margin: 1
        }}
        {...props}
    />
}

