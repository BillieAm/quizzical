import Question from "./Question";
import Button from "./Button";
import data from "./data";

function App() {
  return (
    <div className="App">
      <Question content={data} />
      <Button />

      {/* 
      <h1>Quizzical</h1>
      <p>Test yourself with 5 trivia questions</p>
      <Button />
       */}
    </div>
  );
}

export default App;
