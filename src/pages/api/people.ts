import {readFileSync, writeFileSync} from "fs";
import {NextApiRequest, NextApiResponse} from "next";

interface IPeople {
  id: number
  name: string
}

const getPeople = async () => {
  const buffer = readFileSync('public/data/people.json')
  const str = buffer.toString()
  if(!str) return []
  return JSON.parse(str)
}

const write = async (people: IPeople[]) => {
  writeFileSync('public/data/people.json', JSON.stringify(people))
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'GET') {
    try {
      const people = await getPeople()
      res.statusCode = 200
      res.send(people)
    } catch (e) {
      res.statusCode = 500
      res.send(e)
    }
  }

  if(req.method === 'POST') {
    const { name } = req.body
    if(!name) {
      res.statusCode = 400
      res.send('필수 데이터가 없습니다.')
    }

    const people = await getPeople()
    let personId: number
    people.length > 0 ? personId = people[people.length - 1].id + 1 : personId = 1

    const newPerson = {
      id: personId,
      name
    }

    await write([...people, newPerson])
    res.statusCode = 200
    res.end()
  }

  res.statusCode = 405
  res.end()
}