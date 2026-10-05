import { useState } from 'react'
import ExerciseDetails from './ExerciseDetails'
import type { Exercise } from './types'


function ExerciseList() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const [exercises, setExecrises] = useState<Exercise[]>([
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
])

  function updateSelectedExercise(updatedExercise: Exercise) {
    setExecrises(
        exercises.map((exercise) =>
            exercise.name === updatedExercise.name ? updatedExercise : exercise
        )
    )
    setSelectedExercise(updatedExercise)
  }

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
        <ExerciseDetails
        exercise={selectedExercise}
        onExerciseChange={updateSelectedExercise}
        />
      )}
    </section>
  )
}

export default ExerciseList
