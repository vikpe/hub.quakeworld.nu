import React from "react";
import { connect } from "react-redux";
import browserSlice from "./slice";
import { filterServers } from "../../common/util";
import Filters from "./Filters";
import Overview from "./Overview";
import { Server } from "./Server";
import ServerDataSource from "./ServerDataSource";

const BrowserHeader = () => (
  <div className="my-3">
    <div className="columns is-mobile is-vcentered is-multiline">
      <div className="column is-narrow">
        <a href="/" className="is-flex" id="app-logo-link">
          <img src="/assets/img/qtvlogo.svg" width="82" height="59" />
        </a>
      </div>
      <Filters />
      <div className="column has-text-right-desktop">
        <Overview />
      </div>
    </div>
  </div>
);

const BrowserTiles = (props) => {
  const { servers } = props;
  const hasServers = servers.length > 0;

  return (
    <div className="app-grid">
      {hasServers &&
        servers.map((entry, index) => {
          return <Server key={index} server={entry} />;
        })}
      {!hasServers && <span className="has-text-grey">(no results found)</span>}
    </div>
  );
};

const Browser = (props) => {
  const { servers } = props;

  return (
    <React.Fragment>
      <ServerDataSource />
      <BrowserHeader />
      <BrowserTiles servers={servers} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  servers: filterServers(
    state.browser.servers,
    state.browser.ui.filters,
    state.browser.ui.favorites.servers
  ),
});
const mapDispatchToProps = {
  updateServers: browserSlice.actions.updateServers,
};

const BrowserComponent = connect(mapStateToProps, mapDispatchToProps)(Browser);

export default BrowserComponent;
