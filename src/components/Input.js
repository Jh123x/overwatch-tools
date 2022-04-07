import { createTheme, Input, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';


const theme = createTheme({
    palette: {
        main: {
            color: orange[50],
        }
    }
})

export function PrimaryInput(props) {
    return <ThemeProvider theme={theme}>
        <Input
        style={{
            color: "#fa9c1e"
        }}
        {...props}
    />
    </ThemeProvider>
}

