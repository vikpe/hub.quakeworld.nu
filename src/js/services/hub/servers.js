import { hubSlice } from "./hub.js";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { transformResponseData } from "./serverTransforms.js";
import { compareServers } from "./serverSort.js";

const serversAdapter = createEntityAdapter({
  selectId: (server) => server.address,
  sortComparer: compareServers,
});
const initialState = serversAdapter.getInitialState();

// Define a service using a base URL and expected endpoints
export const serversSlice = hubSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMvdsv: builder.query({
      query: () => "servers/mvdsv",
      transformResponse: (responseData) => {
        return serversAdapter.setAll(
          initialState,
          transformResponseData(responseData)
        );
      },
    }),
  }),
});

const selectServersResult = serversSlice.endpoints.getMvdsv.select({});
const selectServersData = createSelector(
  [selectServersResult],
  (result) => result.data
);

export const { selectAll: selectAllServers, selectById: selectServerByAddress } =
  serversAdapter.getSelectors(
    (state) => selectServersData(state) ?? initialState
  );
