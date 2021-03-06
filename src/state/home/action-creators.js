import {
  HOME_GET_FAILED,
  HOME_GET_REQUEST,
  HOME_GET_SUCCESS,
  HOME_UPDATE_CURRENT_QUERY,
  HOME_UPDATE_QUERY,
  HOME_UPDATE_SCROLL_OFFSET,
} from '../../constants/actions';

export const homeGetRequest = () => ({
  type: HOME_GET_REQUEST,
});

export const homeGetSuccess = (params) => ({
  type: HOME_GET_SUCCESS,
  ...params,
});

export const homeGetFailed = () => ({
  type: HOME_GET_FAILED,
});

export const homeUpdateCurrentQuery = (currentQuery) => ({
  type: HOME_UPDATE_CURRENT_QUERY,
  currentQuery,
});

export const homeUpdateQuery = (query) => ({
  type: HOME_UPDATE_QUERY,
  query,
});

export const homeUpdateScrollOffset = (scrollOffset) => ({
  type: HOME_UPDATE_SCROLL_OFFSET,
  scrollOffset,
});
