import { useState } from 'react'

type WorkoutSet = {
  weight: number
  reps: number
  completed: boolean
}

type Exercise = {
  name: string
  sets: WorkoutSet[]
}

type ExerciseDetailsProps = {
  exercise: Exercise
}

function ExerciseDetails({ exercise }: ExerciseDetailsProps) {
  const [currentExercise, setCurrentExercise] = useState(exercise)

  function toggleSet(index: number) {
    setCurrentExercise({
      ...currentExercise,
      sets: currentExercise.sets.map((set, setIndex) =>
        setIndex === index
          ? { ...set, completed: !set.completed }
          : set
      ),
    })
  }

  return (
    <section>
      <h2>{currentExercise.name}</h2>
      <ul>
        {currentExercise.sets.map((set, index) => (
          <li key={index}>
            {set.weight} kg × {set.reps} toistoa
            <button onClick={() => toggleSet(index)}>
            {set.completed ? "Tehty" : "Ei tehty"}
            </button>
        </li>
        ))}
      </ul>
    </section>
  )
}

export default ExerciseDetails

