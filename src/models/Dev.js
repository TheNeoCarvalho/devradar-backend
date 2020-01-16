import mongoose from 'mongoose'

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String]
})

module.exports = mongoose.model('Dev', DevSchema)