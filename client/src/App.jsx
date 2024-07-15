import styles from './App.module.css'
import Router from "./routes/Router.jsx";
import Navigation from "./routes/Navigation/Navigation.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Provider} from "react-redux";
import store from "./store"

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <Router/>
            </ThemeProvider>
        </Provider>
    )
}

export default App
