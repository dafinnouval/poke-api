import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./Components/List";
import Detail from "./Components/Detail";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<List />} />
                    <Route path="/detail/:name" element={<Detail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
