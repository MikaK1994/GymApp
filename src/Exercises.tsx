import { useState } from 'react'
import ExerciseDetails from './ExerciseDetails'


type Exercise = {
  name: string
  sets: number
  weight: number
}

const exercises: Exercise[] = [
  {
    name: 'Penkkipunnerrus',
    sets: 3,
    weight: 60,
  },
  {
    name: 'Kyykky',
    sets: 4,
    weight: 100,
  },
  {
    name: 'Maastaveto',
    sets: 3,
    weight: 120,
  },
  {
    name: 'Kulmasoutu',
    sets: 3,
    weight: 60,
  },
]


function ExerciseList() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  return (
    <section>
      <h2>Harjoitukset</h2>
        <ul>
          {exercises.map((exercise) => (
        <li key={exercise.name}>
        <button onClick={() => setSelectedExercise(exercise)}>
          {exercise.name} — {exercise.weight} kg × {exercise.sets} sarjaa
        </button>
       </li>
    ))}
      </ul>

      {selectedExercise && (
        <ExerciseDetails exercise={selectedExercise}/>
      )}
    </section>
  )
}

export default ExerciseList
