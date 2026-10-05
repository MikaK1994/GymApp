import type { Exercise } from './types'

type ExerciseDetailsProps = {
  exercise: Exercise
  onExerciseChange: (updatedExercise: Exercise) => void
}

function ExerciseDetails({exercise, onExerciseChange,}: ExerciseDetailsProps) {

  function toggleSet(index: number) {
    const updatedExercise = {
      ...exercise,
      sets: exercise.sets.map((set, setIndex) =>
        setIndex === index
          ? { ...set, completed: !set.completed }
          : set
      ),
    }
    onExerciseChange(updatedExercise)
  }

  function updateWeight(index: number, weight: number | '') {
    const updatedExercise = {
        ...exercise,
        sets: exercise.sets.map((set, setIndex) =>
        setIndex === index
        ? { ...set, weight: weight }
        : set
       ),
     }
     onExerciseChange(updatedExercise)
   }

  return (
    <section>
      <h2>{exercise.name}</h2>
      <ul>
        {exercise.sets.map((set, index) => (
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

