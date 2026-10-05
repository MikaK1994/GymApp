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
      sets: [
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 10,
        completed: false,
      },
    ],
  },
  {
  name: 'Kyykky',
  sets: [
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 10,
        completed: false,
      },
    ],
  },

  {
    name: 'Maastaveto',
      sets: [
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 10,
        completed: false,
      },
    ],
  },
  {
    name: 'Kulmasoutu',
      sets: [
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 8,
        completed: false,
      },
      {
        weight: 0,
        reps: 10,
        completed: false,
      },
    ],
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
