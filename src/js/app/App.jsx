import React from "react";
import store from "./store.js";
import { eventsSlice } from "../services/qws/events.js";
import { newsSlice } from "../services/qws/news.js";
import { serversSlice } from "../services/qws/servers.js";
import { streamsSlice } from "../services/qws/streams.js";
import { forumPostsSlice } from "../services/qws/forumPosts.js";
import ServerOverview from "../servers/Overview.jsx";
import Events from "../Events.jsx";
import ForumPosts from "../ForumPosts.jsx";
import News from "../News.jsx";
import Streams from "../Streams.jsx";
import Servers from "../servers/Servers.jsx";

const AppHeader = () => {
  return (
    <div className="my-3 animation-fade-in-down">
      <div className="flex items-center space-x-4">
        <div className="column is-narrow">
          <a href="/" className="flex pt-1">
            <img src="/assets/img/qtvlogo.svg" width="82" height="59" />
          </a>
        </div>
        <div className="column is-8-mobile is-9-tablet is-10-desktop is-10-widescreen is-narrow-fullhd">
          <ServerOverview />
        </div>
        <div className="column">
          <Streams />
        </div>
      </div>
    </div>
  );
};

const AppFooter = () => {
  return (
    <div className="columns-2 my-6">
      <div className="mb-3">
        <a href="https://www.quakeworld.nu/">QuakeWorld.nu</a>
        <span className="px-1"> • </span>
        <a href="https://discord.quake.world/">Discord</a>
        <span className="px-1"> • </span>
        <a href="https://www.twitch.tv/quakeworld">Twitch</a>
        <span className="px-1"> • </span>
        <a href="https://www.quakeworld.nu/wiki/Overview">Wiki</a>
      </div>
      <div className="text-right">
        <a href="https://github.com/vikpe/qw-hub">View on GitHub</a>
      </div>
    </div>
  );
};

function startPollingDataSources() {
  store.dispatch(
    streamsSlice.endpoints.getStreams.initiate(
      {},
      { subscriptionOptions: { pollingInterval: 15500 } }
    )
  );

  store.dispatch(
    serversSlice.endpoints.getMvdsv.initiate(
      {},
      { subscriptionOptions: { pollingInterval: 5000 } }
    )
  );

  const MINUTE = 1000 * 60;
  const scrapeOptions = {
    subscriptionOptions: { pollingInterval: 15 * MINUTE },
  };
  store.dispatch(eventsSlice.endpoints.getEvents.initiate({}, scrapeOptions));
  store.dispatch(newsSlice.endpoints.getNews.initiate({}, scrapeOptions));
  store.dispatch(
    forumPostsSlice.endpoints.getForumPosts.initiate({}, scrapeOptions)
  );
}

export const App = () => {
  startPollingDataSources();

  return (
    <>
      <AppHeader />
      <Servers />
      <div className="animation-fade-in-delayed">
        <hr className="my-12 border-blue-600/50" />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <News />
          <ForumPosts />
          <Events />
        </div>
        <hr className="my-6 border-blue-600/50" />
        <AppFooter />
      </div>
    </>
  );
};

export default App;
