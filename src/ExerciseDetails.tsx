import { useState } from 'react'

type Exercise = {
  name: string
  sets: WorkoutSet[]
}

type WorkoutSet = {
  weight: number
  reps: number
  completed: boolean
}

type ExerciseDetailsProps = {
  exercise: Exercise
}

function ExerciseDetails({ exercise }: ExerciseDetailsProps) {
    const [completed, setCompleted] = useState(false)
  return (
    <section>
      <h2>{exercise.name}</h2>
      <ul>
        {exercise.sets.map((set, index) => (
      <li key={index}>
        {set.weight} kg x {set.reps} toistoa

        {index === 0 && (
          <button onClick={() => setCompleted(!completed)}>
          {completed ? 'Tehty' : 'Ei tehty'}
          </button>
        )}
      </li>
    ))}
</ul>

    </section>
  )
}

export default ExerciseDetails
