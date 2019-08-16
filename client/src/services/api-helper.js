import axios from 'axios';

const baseUrl = 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl
})


export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  console.log(resp);
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  return resp.data
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    const resp = await api.get('/users/verify');
    return resp.data;
  }
  return false;
}

export const fetchTopics = async () => {
  const resp = await api.get('/topics/')
  return resp.data
}

export const showTopic = async (id) => {
  const resp = await api.show(`/topics/${id}`);
  return resp.data;
}

export const createTopic = async (data) => {
  const resp = await api.post('/topics', { topic: data })
  return resp.data
}

export const destroyTopic = async (id) => {
  const resp = await api.delete(`/topics/${id}`)
  return resp.data
}

export const fetchComments = async (id) => {
  const resp = await api.get(`/topics/${id}/comments`)
  return resp.data
}

export const createComment = async (id, data) => {
  const resp = await api.post(`/topics/${id}/comments`, data)
  return resp.data
}

export const destroyComment = async (id) => {
  const resp = await api.delete(`/topics/${id}/comments/${id}`) 
  return resp.data
}

export const editComment = async (id, data) => {
  const resp = await api.put(`/topics/${id}/comments/${id}`, data)
  return resp.data
}