import 'babel-polyfill'

const main = async () => {
  console.log('coucou')
}

main()
  .then(() => {}, error => { console.log(error) })
  .then(() => process.exit())
