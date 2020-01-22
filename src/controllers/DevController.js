import Dev from '../models/Dev'
import axios from 'axios'

import parseStringToArray from '../utils/parseStringToArray'

module.exports = {

  async index(req, res) {
    const devs = await Dev.find();

    return res.status(200).json({
      devs
    })

  },

  async store(req, res) {

    const {
      github_username,
      techs,
      latitude,
      longitude
    } = req.body

    let dev = await Dev.findOne({
      github_username
    })

    if (!dev) {

      const response = await axios.get(`https://api.github.com/users/${github_username}`)

      const {
        name = login, avatar_url, bio
      } = response.data

      const techsArray = parseStringToArray(techs)

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location

      })
    }

    return res.status(200).json(dev)

  },
  async delete(req, res) {

    const _id =  req.body.id
    let dev = await Dev.findOne({ _id })

    if(!dev){
      res.json({msg: "Usuário não existe"})
    }else{
      dev = await Dev.deleteOne({ _id }) 
    }

    res.json({msg:"Usuário deletado"})
   
  }

}