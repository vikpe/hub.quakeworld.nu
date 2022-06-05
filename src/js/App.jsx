import React from "react";
import ServerFilters from "./features/Servers/Filters.jsx";
//import Overview from "./features/Servers/Overview.jsx";
import ServerTiles from "./features/Servers/Servers.jsx";
import Streams from "./features/Streams/Streams.jsx";

const AppHeader = () => {
  return (
    <div className="my-3 animation-fade-in-down">
      <div className="columns is-mobile is-vcentered is-multiline">
        <div className="column is-narrow">
          <a
            href="/home/vikpe/code/qw-server-browser/public"
            className="is-flex"
            id="app-logo-link"
          >
            <img src="/assets/img/qtvlogo.svg" width="82" height="59" />
          </a>
        </div>
        <ServerFilters />
        <div className="column has-text-right-desktop">{/*<Overview />*/}</div>
      </div>

      <Streams />
    </div>
  );
};

export const App = () => (
  <>
    <AppHeader />
    <ServerTiles />
  </>
);

export default App;
