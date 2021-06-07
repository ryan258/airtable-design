import Airtable from 'airtable'
// export default "airtable"
// export default 'airtable setup'
// set up the base
// - for Gatsby to be able to see the env variables @ runtime, we need to prefix the variables name w/ GATSBY_
export default new Airtable({ apiKey: process.env.GATSBY_AIRTABLE_API }).base(
  process.env.GATSBY_AIRTABLE_BASE_ID
)
