import React, { useEffect, useState } from 'react'
import Title from './Title'
import styled from 'styled-components'
import base from './Airtable'
import { FaVoteYea } from 'react-icons/fa'

// ! With this component we're getting data at runtime using React, not using local storage!
// - once the component renders
// - then it will grab the survey counts
// so we'll need the airpackage module and to set up the base
// see: components/Airtable.js
// console.log(base) // if we see a doCall we're good to go!

const Survey = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  // base is going to return a promise
  const getRecords = async () => {
    const records = await base('Survey')
      .select({})
      .firstPage()
      .catch(e => console.log(e))
    // console.log(records)
    const newItems = records.map(record => {
      const { id, fields } = record
      return { id, fields }
    })

    setItems(newItems)
    setLoading(false)
  }

  const giveVote = async id => {
    setLoading(true)
    // iterate over items and update the one w/ the matching id
    const tempItems = [...items].map(item => {
      if (item.id === id) {
        let { id, fields } = item
        // overwrite the data over there
        fields = { ...fields, votes: fields.votes + 1 }
        return { id, fields }
      } else {
        return item
      }
    })

    const records = await base('Survey')
      .update(tempItems)
      .catch(e => console.log(e))

    const newItems = records.map(record => {
      const { id, fields } = record
      return { id, fields }
    })

    setItems(newItems)
    setLoading(false)
  }

  useEffect(() => {
    getRecords()
  }, [])
  // console.log(items)

  return (
    <Wrapper className="section">
      <div className="container">
        <Title title="survey"></Title>
        <h3>Most Important Room in the House?</h3>

        <ul>
          {items.map(item => {
            const {
              id,
              fields: { name, votes },
            } = item
            return (
              <li key={id}>
                <div className="key">{name.toUpperCase().substring(0, 2)}</div>
                <div>
                  <h4>{name}</h4>
                  <p>{votes} votes</p>
                </div>
                <button
                  disabled={loading ? true : false}
                  onClick={() => giveVote(id)}
                >
                  <FaVoteYea />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    width: 90vw;
    max-width: var(--max-width);

    margin: 0 auto;
    h3 {
      text-align: center;
      color: var(--clr-grey-5);
      margin-bottom: 4rem;
    }
    ul {
      margin-top: 2rem;
      display: grid;
      gap: 2rem;
      grid-gap: 2rem;
      @media (min-width: 992px) {
        & {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (min-width: 1200px) {
        & {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
    }
    li {
      background: var(--clr-grey-10);
      border-radius: var(--radius);
      padding: 0.75rem 1rem;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 0 3rem;
      grid-gap: 0 3rem;
      align-items: center;
      .key {
        color: var(--clr-white);
        font-size: 1.5rem;
        background: var(--clr-primary-7);
        padding: 0.5rem 1rem;
        border-radius: var(--radius);
      }
      p {
        margin-bottom: 0;
        color: var(--clr-grey-5);
        letter-spacing: var(--spacing);
      }
      h4 {
        margin-bottom: 0;
      }
      button {
        background: transparent;
        border-color: transparent;
        font-size: 2rem;
        cursor: pointer;
        color: var(--clr-black);
      }
      button:disabled {
        color: var(--clr-grey-6);
        cursor: not-allowed;
      }
    }
  }
`
export default Survey
