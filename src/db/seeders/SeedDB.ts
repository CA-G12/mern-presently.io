import mongoose from 'mongoose'
import { Seeder } from 'mongo-seeding'

import environment from '../../config/environment'

const config = {
  database: environment.database.uri,
  dropDatabase: true
}

const seeder = new Seeder(config)

const collections = [
  {
    name: 'users',
    documents: [
      {
        _id: new mongoose.Types.ObjectId('6357f708ed0c57054008e300'),
        name: 'Ahmed',
        email: 'ahmed@gmail.com',
        password:
          '$2a$10$oOcbaZfhAXJzN5hqdD/tquztLXHwQJPUQqbP6f3Ybx521aJDCLBUu',
        slides: [
          {
            _id: new mongoose.Types.ObjectId('123ea40720dcfa02e0ae42db'),
            title: 'Eslint',
            link: 'https://eslint.org/',
            isPrivate: true,
            isLive: false
          },
          {
            _id: new mongoose.Types.ObjectId('456ea40720dcfa02e0ae42db'),
            title: 'OAUTH',
            link: 'https://oauth.net/',
            isPrivate: true,
            isLive: false
          }
        ]
      },
      {
        _id: new mongoose.Types.ObjectId('8977f708ed0c57054008e400'),
        name: 'Fadi',
        email: 'fadi@gmail.com',
        password:
          '$2a$10$CnZQzaO5CMEW7r4Wdt8uL.d0zefjq26XiTDUbfwsEgqeDVAInf8Si',
        slides: [
          {
            _id: new mongoose.Types.ObjectId('789ea40720dcfa02e0ae42db'),
            title: 'Aligrandpa',
            link: 'https://hackmd.io/j3FxonEgS5GmAukS5gZ1eA',
            isPrivate: true,
            isLive: false
          }
        ]
      },
      {
        _id: new mongoose.Types.ObjectId('2587f708ed0c57054008e500'),
        name: 'Zayan',
        email: 'zayanh@gmail.com',
        password:
          '$2a$10$CnZQzaO5CMEW7r4Wdt8uL.d0zefjq26XiTDUbfwsEgqeDVAInf8Si',
        slides: [
          {
            _id: new mongoose.Types.ObjectId('147ea40720dcfa02e0ae42db'),
            title: 'Typescript',
            link: 'https://www.typescriptlang.org/docs/',
            isPrivate: true,
            isLive: false
          }
        ]
      },
      {
        _id: new mongoose.Types.ObjectId('147ea40720dcfa02e0ae42db'),
        name: 'Nada',
        email: 'nada@gmail.com',
        password:
          '$2a$10$CnZQzaO5CMEW7r4Wdt8uL.d0zefjq26XiTDUbfwsEgqeDVAInf8Si',
        slides: []
      }
    ]
  }
]

const seed = () => {
  return seeder
    .import(collections)
    .then(() => {
      return 'Database Seeded Successfully!'
    })
    .catch(err => {
      return `Failed to seed the database! ${err}`
    })
}

export default seed
