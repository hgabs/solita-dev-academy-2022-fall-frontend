import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const getBackendUrl = () => 'http://localhost:8000/api/';

export const bicycleStationApi = createApi({
  reducerPath: 'bicycleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBackendUrl()
  }),
  tagTypes: ['Station', 'Journey'],
  endpoints: (builder) => ({
    getAllStations: builder.query({
      query: ({ keyword, page, limit }) => ({
        url: 'stations',
        params: { keyword, page, limit }
      }),
      providesTags: [{ type: 'Station', id: 'LIST' }]
    }),
    getAllJourneys: builder.query({
      query: ({ id, date, page, limit, field, sort, filter, operator, value }) => ({
        url: 'journeys',
        params: { id, date, page, limit, field, sort, filter, operator, value }
      }),
      providesTags: [{ type: 'Journey', id: 'LIST' }]
    }),
    getStationById: builder.query({
      query: (id) => ({
        url: `stations/${id}`
      }),
      providesTags: ['Station']
    }),
    getStationTopDepartures: builder.query({
      query: (id) => ({
        url: `stations/${id}/departures`,
      })
    }),
    getStationTopArrivals: builder.query({
      query: (id) => ({
        url: `stations/${id}/arrivals`,
      })
    })
  })
});

export const {
  useGetAllStationsQuery,
  useGetAllJourneysQuery,
  useGetStationByIdQuery,
  useGetStationTopDeparturesQuery,
  useGetStationTopArrivalsQuery,
} = bicycleStationApi;
