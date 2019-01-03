import { IEXClient } from 'iex-api'
import _fetch from 'isomorphic-fetch'

const iex = new IEXClient(_fetch)
iex.stockCompany('FB')
  .then(company => console.log(company))