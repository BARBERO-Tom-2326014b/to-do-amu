import logo from './logo.svg';
import './App.css';
import './components/Taches/taches.css';
import Header from "./components/Header/Header";
import Taches from "./components/Taches/Taches";
import Footer from "./components/Footer/Footer";
import todo from './todos.json';







function App() {
    const taches = todo.taches;

    const categorie = todo.categories;
    const relation = todo.relations;


  return (
      <>

        <Header taches={taches}/>

        <Taches taches={taches} categorie={categorie} relation={relation} />


      </>
  );
}

export default App;
