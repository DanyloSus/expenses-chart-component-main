import Graphic from "./Elements/Graphic";
import Header from "./Elements/Header";
import data from "./Data/data.json";

const App = () => {
  return (
    <main>
      <Header />
      <Graphic data={data} />
    </main>
  );
};

export default App;
