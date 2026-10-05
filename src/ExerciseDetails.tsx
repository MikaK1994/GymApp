type Exercise = {
  name: string
  sets: number
  weight: number
}

type ExerciseDetailsProps = {
  exercise: Exercise
}

function ExerciseDetails({ exercise }: ExerciseDetailsProps) {
  return (
    <section>
      <h2>{exercise.name}</h2>

      <p>
        {exercise.sets} sarjaa × {exercise.weight} kg
      </p>
    </section>
  )
}

export default ExerciseDetails
