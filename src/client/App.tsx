import React from "react";
import AddressBar from "./components/AddressBar";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <AddressBar
        onAddressSubmit={async () => {
          // TODO
        }}
      />
    </>
  );
}

export default App;
