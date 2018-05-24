import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
  title: { type: String, unique: true },
  author: String,
  downloaded: { type: Boolean, default: false },
  stars: { type: Number, min: 0, max: 5 },
  nbReviews: { type: Number, min: 0 },
  priority: String,
  observation: String,
  amazonURL: String,
  tags: [String]
})

bookSchema.methods = {
  toText: function () {
    return `${this.priority ? `(${this.priority}) ` : ''}` +
      `${this.downloaded ? '. ' : ''}${this.title}, by ${this.author}` +
      ` *${this.stars}/${this.nbReviews}` +
      `${this.observation ? ` ${this.observation}` : ''}` +
      `${this.tags.length ? ' ' + this.tags.filter(tag => tag).map(tag => `+${tag}`).join(' ') : ''}`
  }
}

bookSchema.statics = {
  toText: async function () {
    return (await this.find()).map(book => book.toText()).join('\n')
  },
  fromText: function (text) {
    const matches = text.match(/^(?:\((\w)\) )?(?:(\.) )?(.+), by (.+) \*(\d\.?\d?)\/(\d+)(.*?)((?: \+\w+)*)$/)
    try {
      let [priority, downloaded, title, author, stars, nbReviews, observation, tags] = matches.slice(1)
      tags = tags.split(' +').filter(elt => elt)
      const instance = new this({ title, author, stars, nbReviews, tags })
      if (observation) instance.observation = observation.slice(1)
      if (priority) instance.priority = priority
      if (downloaded) instance.downloaded = true
      return instance
    } catch (e) {
      console.log(text)
    }
  }
}

export default mongoose.model('Book', bookSchema)
