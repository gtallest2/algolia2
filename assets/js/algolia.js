import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'

export const client = algoliasearch('AGBNR3G2XW', 'a122d4e8b5ee13c7bfdc33ab5d79284c');
export const index = client.initIndex('merged');
export const helper = algoliasearchHelper(client, 'merged', {
  facets: ['food_type', 'stars_count'],
  disjunctiveFacets: ['payment_options']
});
