import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {fetchPeople, useFetchPeople} from "../libs/api-client/people/people.queries";
import {dehydrate} from "react-query";
import {useCallback, useRef} from "react";
import {mutationPeople} from "../libs/api-client/people/people.mutations";

interface IPros {
  [key: string]: any
}


interface IPeople {
  id: number
  name: string
}

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { isLoading, data: people }:IPros = useFetchPeople({
    onSuccess() {
      console.log('success')
    }
  })

  const mutation = mutationPeople()

  const handleSubmit = useCallback(() => {
    const target = inputRef.current
    if(target && target.value) {
      mutation.mutate({name: target.value})
      target.value = ''
      target.focus()
    }
  }, [])

  return (
    <div className={styles.container}>
      <h2>People</h2>
      <div>
        <input type="text" ref={inputRef}/>
        <button type={"button"} onClick={handleSubmit}>Add Person</button>
      </div>
      <p>We have {people.length} people in out API</p>
      <ul>
        {people.map(({id, name}: IPeople) => (
          <li key={id} style={{ margin: '30px 0'}}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  const people = await fetchPeople();

  return {
    props: {
      dehydratedState: dehydrate(people)
    }
  }
}

export default Home
