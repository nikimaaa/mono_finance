import {BrowserRouter, Route, Routes} from "react-router-dom"
import routes from "./routes.jsx";
import Navigation from "./Navigation/Navigation.jsx";
import styles from "./Router.module.scss";
import TopBar from "./TopBar/TopBar.jsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Navigation/>
            <div className={styles.content}>
                {/*<TopBar/>*/}
                <Routes>
                    {
                        routes.map(({path, element}) => (
                            <Route path={path} element={element} key={path}/>
                        ))
                    }
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Router;