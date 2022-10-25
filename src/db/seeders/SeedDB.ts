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
        _id: '123ea40720dcfa02e0ae42db',
        name: 'Ahmed',
        email: 'ahmed@gmail.com',
        password:
          '$2a$10$oOcbaZfhAXJzN5hqdD/tquztLXHwQJPUQqbP6f3Ybx521aJDCLBUu',
        slides: [
          {
            _id: '123ea40720dcfa02e0ae42db',
            title: 'Eslint',
            link: 'https://eslint.org/',
            isPrivate: true,
            isLive: false
          },
          {
            _id: '456ea40720dcfa02e0ae42db',
            title: 'OAUTH',
            link: 'https://oauth.net/',
            isPrivate: true,
            isLive: false
          }
        ]
      },
      {
        _id: '456ea40720dcfa02e0ae42db',
        name: 'Fadi',
        email: 'fadi@gmail.com',
        password:
          '$2a$10$CnZQzaO5CMEW7r4Wdt8uL.d0zefjq26XiTDUbfwsEgqeDVAInf8Si',
        slides: [
          {
            _id: '789ea40720dcfa02e0ae42db',
            title: 'Aligrandpa',
            link: 'https://hackmd.io/j3FxonEgS5GmAukS5gZ1eA',
            isPrivate: true,
            isLive: false
          }
        ]
      },
      {
        _id: '789ea40720dcfa02e0ae42db',
        name: 'Zayan',
        email: 'zayanh@gmail.com',
        password:
          '$2a$10$CnZQzaO5CMEW7r4Wdt8uL.d0zefjq26XiTDUbfwsEgqeDVAInf8Si',
        slides: [
          {
            _id: '147ea40720dcfa02e0ae42db',
            title: 'Typescript',
            link: 'https://www.typescriptlang.org/docs/',
            isPrivate: true,
            isLive: false
          }
        ]
      },
      {
        _id: '147ea40720dcfa02e0ae42db',
        name: 'Nada',
        email: 'nada@gmail.com',
        password:
          '$2a$10$CnZQzaO5CMEW7r4Wdt8uL.d0zefjq26XiTDUbfwsEgqeDVAInf8Si',
        slides: []
      }
    ]
  },
  {
    name: 'slides',
    documents: [
      {
        _id: '123ea40720dcfa02e0ae42db',
        title: 'Eslint',
        link: 'https://eslint.org/',
        isPrivate: true,
        isLive: false
      },
      {
        _id: '456ea40720dcfa02e0ae42db',
        title: 'OAUTH',
        link: 'https://oauth.net/',
        isPrivate: true,
        isLive: false
      },
      {
        _id: '789ea40720dcfa02e0ae42db',
        title: 'Aligrandpa',
        link: 'https://hackmd.io/j3FxonEgS5GmAukS5gZ1eA',
        isPrivate: true,
        isLive: false
      },
      {
        _id: '147ea40720dcfa02e0ae42db',
        title: 'Typescript',
        link: 'https://www.typescriptlang.org/docs/',
        isPrivate: true,
        isLive: false
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

if (environment.nodeEnv === 'development') {
  seed().then(message => console.log(message))
}

export default seed
