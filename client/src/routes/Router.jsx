import {BrowserRouter, Route, Routes} from "react-router-dom"
import routes from "./routes.jsx";
import Navigation from "./Navigation/Navigation.jsx";
import styles from "./Router.module.scss";

const Router = () => {
    return (
        <BrowserRouter>
            <Navigation/>
            <div className={styles.content}>
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