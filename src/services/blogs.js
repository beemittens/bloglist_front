import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async likedBlog => {
  const config = { headers: { Authorization: token } }
  
  const blog = {
    user: likedBlog.user.id,
    title: likedBlog.title,
    author: likedBlog.author,
    url: likedBlog.url,
    likes: likedBlog.likes + 1
  }

  const response = await axios.put(`${baseUrl}/${likedBlog.id}`, blog, config)
  return response.data
}

const remove = async removedBlog => {
  const config = { headers: { Authorization: token } }
  await axios.delete(`${baseUrl}/${removedBlog.id}`, config)
} 

export default { getAll, create, like, remove, setToken }