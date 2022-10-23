import path from 'path'
import { Seeder } from 'mongo-seeding'

import environment from '../config/environment'

const config = {
  database: environment.database.uri,
  dropDatabase: true
}
const seeder = new Seeder(config)

const collections = seeder.readCollectionsFromPath(
  path.resolve(__dirname, './seeders'),
  {
    extensions: ['js', 'json', 'ts'],
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
  }
)

console.log(path.resolve(__dirname, './seeders'))

// collections = [
//   {
//     name: 'users',
//     documents: [
//       {
//         _id: '123ea40720dcfa02e0ae42db',
//         name: 'Ahmed',
//         email: 'ahmed@gmail.com',
//         password:
//           '$2a$10$hjGHbhWOLxmEbt/5WoLdj.om3eoeRoyk1zyhndpnrV0cTvsUjyN1S',
//         slides: []
//       }
//     ]
//   }
// ]

const seed = () => {
  console.log('collections', collections)
  return seeder
    .import(collections)
    .then(() => {
      console.log('Database Seeded Successfully!')
    })
    .catch(err => {
      console.log('Failed to seed the database!', err)
    })
}

export default seed
