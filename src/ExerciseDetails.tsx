import { useState } from 'react'

type WorkoutSet = {
  weight: number | ''
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

  function updateWeight(index: number, weight: number | '') {
    setCurrentExercise({
        ...currentExercise,
        sets: currentExercise.sets.map((set, setIndex) =>
        setIndex === index
        ? { ...set, weight: weight }
        : set
       ),
     })
   }


  return (
    <section>
      <h2>{exercise.name}</h2>
      <ul>
        {currentExercise.sets.map((set, index) => (
          <li key={index}>
            <input type="number" 
            value={set.weight}
            onChange={(event) => updateWeight(index, 
            event.target.value === '' ? '' : Number(event.target.value))}/> 
            kg x {set.reps} toistoa
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

