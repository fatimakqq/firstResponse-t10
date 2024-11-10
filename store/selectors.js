import { createSelector } from 'reselect';

const getState = state => state;

export const getHomeItems = createSelector(getState, state => state.homeItems);
export const getLists = createSelector(getState, state => state.lists);
export const getNotifications = createSelector(getState, state => state.notifications);
export const getSettings = createSelector(getState, state => state.settings);
export const getCalendar = createSelector(getState, state => state.calendar);
export const getConverter = createSelector(getState, state => state.converter);

export const getEmLogInfo = createSelector(getState, state => state.emLogInfo);
export const getCalendarInfo = createSelector(getState, state => state.calendarInfo);