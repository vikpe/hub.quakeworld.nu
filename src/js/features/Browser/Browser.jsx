import React from "react";
import { connect } from "react-redux";
import browserSlice from "./slice";
import { filterServers } from "../../common/util";
import Filters from "./Filters";
import Overview from "./Overview";
import { Server } from "./Server";

const serverEntriesProvider = {
  get: () => {
    const url = "/data/busy.json";
    const options = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      redirect: "follow",
    };
    return fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  },
};

const BrowserHeader = () => (
  <div className="my-3">
    <div className="columns is-mobile is-vcentered is-multiline">
      <div className="column is-narrow">
        <a href="/">
          <img src="/assets/img/qtvlogo.png" width="177" height="64" />
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

class Browser extends React.Component {
  componentDidMount() {
    const fetchAndupdateServers = () => {
      return serverEntriesProvider
        .get()
        .then((servers) => this.props.updateServers({ servers }));
    };

    fetchAndupdateServers();
  }

  render() {
    const { servers } = this.props;

    return (
      <React.Fragment>
        <BrowserHeader />
        <BrowserTiles servers={servers} />
      </React.Fragment>
    );
  }
}

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
