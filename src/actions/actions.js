
import axios from 'axios';
import {FETCH_TASKS_SUCCESS,FETCH_TASKS_FAILURE} from './actionTypes';

export const addTask = (text) => {
  return (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    return axios.post(`${apiUrl}`, { text })
      .then(response => {
        dispatch(fetchTasks());                                                                                                                           // Fetch tasks after adding a new task
      })
      .catch(error => {
        dispatch(fetchTasksFailure(error));                                                                                                                   // Dispatch error action
      });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    return axios.delete(`${apiUrl}/${id}`)
      .then(response => {
        dispatch(fetchTasks());                                                                                                                        // Fetch tasks after deleting a task
      })
      .catch(error => {
        dispatch(fetchTasksFailure(error));                                                                                                              // Dispatch error action
      });
  };
};

export const editTask = (id, newText) => {
  return (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    return axios.put(`${apiUrl}/${id}`, { text: newText })
      .then(response => {
        dispatch(fetchTasks());                                                                                                                           // Fetch tasks after editing a task
      })
      .catch(error => {
        dispatch(fetchTasksFailure(error));                                                                                                              // Dispatch error action
      });
  };
};

export const updateTask = (id, newText) => {
  return (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    return axios.patch(`${apiUrl}/${id}`, { text: newText })
      .then(response => {
        dispatch(fetchTasks());                                                                                                                         // Fetch tasks after updating a task
      })
      .catch(error => {
        dispatch(fetchTasksFailure(error));                                                                                                               // Dispatch error action
      });
  };
};

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: { tasks },
});

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: { error },
});

export const fetchTasks = () => {
  return (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    return axios.get(`${apiUrl}`)
      .then(response => {
        dispatch(fetchTasksSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchTasksFailure(error));
      });
  };
};
