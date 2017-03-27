import test from 'ava'
import { promisify } from 'bluebird'
import { readdirSync, readFile } from 'fs'
import path from 'path'
import { transformFile } from 'babel-core'
import plugin from '../src'

const dirnames = readdirSync(path.resolve(__dirname, 'fixtures'))

dirnames.forEach(dirname => {
  test(`fixtures/${dirname}`, async t => {
    const [{ code }, expectedCode] = await Promise.all([
      promisify(transformFile)(
        path.resolve(__dirname, `fixtures/${dirname}/actual.js`),
        {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [plugin]
        }
      ),
      promisify(readFile)(
        path.resolve(__dirname, `fixtures/${dirname}/expected.js`),
        'utf-8'
      )
    ])

    t.is(code, expectedCode)
  })
})
