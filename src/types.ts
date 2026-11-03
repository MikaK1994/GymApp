export type Screen = 'home' | 'movements' | 'session' | 'summary'
export type Filter = 'Kaikki' | 'Ylävartalo' | 'Alavartalo'
export type GlyphName = 'home' | 'search' | 'chart' | 'calendar' | 'dumbbell' | 'target' | 'clock' | 'sliders' | 'bell' | 'close' | 'chevron' | 'share'

export type Movement = {
  name: string
  category: Filter | ''
  duration: string
  icon: GlyphName
}

export type CompletedSet = {
  weight: number
  reps: number
}

export type CompletedExercise = {
  name: string
  sets: CompletedSet[]
}

export type WorkoutRecord = {
  id: string
  completedAt: string
  exercises: CompletedExercise[]
}