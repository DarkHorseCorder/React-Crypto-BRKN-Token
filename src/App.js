import './App.css';
import {   Routes , Route } from 'react-router-dom';
import routes from './pages/index'
import Provider, {UserContext} from './components/provider/UserProvider';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {

    return (
        <Provider>
            <Header/>
            <Routes >
                {
                    routes.map((data,index) => (
                        <Route onUpdate={() => window.scrollTo(0, 0)} exact={true} path={data.path} element={data.component} key={index} />
                    ))
                }
            </Routes>
            <Footer/>
        </Provider>
    );
}

export default App;
