export type WorkoutSet = {
  weight: number | ''
  reps: number
  completed: boolean
}

export type Exercise = {
  name: string
  sets: WorkoutSet[]
}
