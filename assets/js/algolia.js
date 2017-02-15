import algoliasearch from 'algoliasearch'
import { combinedList } from './sort-array'

export const client = algoliasearch('AGBNR3G2XW', 'a122d4e8b5ee13c7bfdc33ab5d79284c');
export const index = client.initIndex('merged');
