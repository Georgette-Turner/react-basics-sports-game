// An App component under which all other components will be added
function App (props) {
  return (
    <div>
      <h1>Welcome to the Sports Game starter!</h1>
      <em>This file represents the way your code should look after completing the <strong>Setup</strong> steps in the instructions.</em>
    </div>
  )
}



// Render the App
ReactDOM.render(
  <App />,
  document.getElementById('root')
)