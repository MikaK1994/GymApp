import { useState } from 'react'
import ExerciseDetails from './ExerciseDetails'

type WorkoutSet = {
  weight: number
  reps: number
  completed: boolean
}

type Exercise = {
  name: string
  sets: WorkoutSet[]
}

const exercises: Exercise[] = [
  {
    name: 'Penkkipunnerrus',
    sets: [],
  },
  {
  name: 'Kyykky',
  sets: [
      {
        weight: 100,
        reps: 8,
        completed: false,
      },
      {
        weight: 100,
        reps: 8,
        completed: false,
      },
      {
        weight: 100,
        reps: 8,
        completed: false,
      },
      {
        weight: 90,
        reps: 10,
        completed: false,
      },
    ],
  },

  {
    name: 'Maastaveto',
    sets: [],
  },
  {
    name: 'Kulmasoutu',
    sets: [],
  },
]


function ExerciseList() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  return (
    <section>
      <h2>Harjoitukset</h2>
        <ul>
          {exercises.map((exercise) => (
        <ul key={exercise.name}>
        <button onClick={() => setSelectedExercise(exercise)}>
          {exercise.name}
        </button>
       </ul>
      ))}
       </ul>

      {selectedExercise && (
        <ExerciseDetails exercise={selectedExercise}/>
      )}
    </section>
  )
}

export default ExerciseList
