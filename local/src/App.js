import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import home from "./components/home";
import productslists from "./components/productslists";
import productsinfo from "./components/productsinfo";
import productsadd from  "./components/productsadd";
import productsedit from "./components/productsedit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainMenu />
        <div className="container">
          <MainRoute />
        </div>
      </BrowserRouter>
    </div>
  );
}


function MainMenu(){
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="/">Thaivb.NET</a>
      <button 
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#MainMenu"
        aria-controls="MainMenu"
        aria-expanded="false"
        aria-labal="Toggle Navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="MainMenu">
        <div className="navbar-nav me-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/productslists">รายการสินค้าทั้งหมด</a>
          </li>
        </div>

      </div>
    </nav>
  )
}

function MainRoute(){
  return (
    <Switch>
      <Route exact path="/" component={home}/>
      <Route exact path="/productslists" component={productslists}/>
      <Route exact path="/products/:id" component={productsinfo}/>
      <Route exact path="/productsadd" component={productsadd}/>
      <Route exact path="/productsedit/:id" component={productsedit}/>
    </Switch>
  )
}
export default App;
