// Initialize Algolia & Algolia Search Helper

import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'

export const client = algoliasearch('EZWZX6BO9Y', 'fd8ea1c628a05204d789ebad329ecc9e')
export const index = client.initIndex('merged')
export const helper = algoliasearchHelper(client, 'merged', {
  facets: ['food_type', 'stars_count'],
  disjunctiveFacets: ['payment_options', 'price']
  // aroundLatLngViaIP: true
})
