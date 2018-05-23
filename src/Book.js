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
      ` ${this.observation ? `${this.observation} ` : ''}` +
      `${this.tags.filter(tag => tag).map(tag => `+${tag}`).join(' ')}`
  }
}

bookSchema.statics = {
  toText: async function () {
    return (await this.find()).map(book => book.toText()).join('\n')
  }
}

export default mongoose.model('Book', bookSchema)
