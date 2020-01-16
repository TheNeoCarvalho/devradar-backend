import {
  Router
} from 'express'
import Dev from './models/Dev'
import axios from 'axios'

const routes = Router()

routes.post('/dev', async (req, res) => {
  const {
    github_username,
    techs
  } = req.body

  const response = await axios.get(`https://api.github.com/users/${github_username}`)

  const {
    name = login, avatar_url, bio
  } = response.data

  const techsArray = techs.split(',').map(tech => tech.trim())

  const dev = await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray
  })

  return res.status(200).json(dev)

})

routes.get('/devs', async (req, res) => {
  const devs = await Dev.find();

  return res.status(200).json({
    devs
  })

})

module.exports = routes