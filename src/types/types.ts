export type Screen = 'home' | 'movements' | 'session' | 'summary' | 'statistics'
export type MovementCategory = 'Rinta' | 'Selkä' | 'Jalat' | 'Olkapäät' | 'Kädet'
export type Filter = 'Kaikki' | MovementCategory
export type GlyphName = 'home' | 'search' | 'chart' | 'calendar' | 'dumbbell' | 'target' | 'clock' | 'sliders' | 'bell' | 'close' | 'chevron' | 'share' | 'plus' | 'minus' | 'check' | 'trash'

export type Movement = {
  name: string
  category: MovementCategory
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

export type CategoryStat = {
  category: MovementCategory
  count: number
}