import type { Movement, MovementCategory } from '../types/types'

export const movementCategories: MovementCategory[] = ['Rinta', 'Selkä', 'Jalat', 'Olkapäät', 'Kädet']

const movements: Movement[] = [
  { name: 'Chestfly', category: 'Rinta', duration: '', icon: 'dumbbell' },
  { name: 'Dippi', category: 'Kädet', duration: '', icon: 'dumbbell' },
  { name: 'Hauiskääntö', category: 'Kädet', duration: '', icon: 'dumbbell' },
  { name: 'Kyykky', category: 'Jalat', duration: '18 min', icon: 'dumbbell' },
  { name: 'Leuanveto', category: 'Selkä', duration: '', icon: 'dumbbell' },
  { name: 'Maastaveto', category: 'Selkä', duration: '', icon: 'dumbbell' },
  { name: 'Ojentajat taljassa', category: 'Kädet', duration: '', icon: 'dumbbell' },
  { name: 'Penkkipunnerrus', category: 'Rinta', duration: '', icon: 'dumbbell' },
  { name: 'Pystypunnerrus', category: 'Olkapäät', duration: '12 min', icon: 'dumbbell' },
  { name: 'Reiden koukistus', category: 'Jalat', duration: '', icon: 'dumbbell' },
  { name: 'Reiden ojennus', category: 'Jalat', duration: '', icon: 'dumbbell' },
  { name: 'Skullcrusher', category: 'Kädet', duration: '', icon: 'dumbbell' },
  { name: 'Takaolkapäät', category: 'Olkapäät', duration: '', icon: 'dumbbell' },
  { name: 'Vinopenkkipunnerrus', category: 'Rinta', duration: '', icon: 'dumbbell' },
  { name: 'Vipunosto eteen', category: 'Olkapäät', duration: '', icon: 'dumbbell' },
  { name: 'Vipunosto sivulle', category: 'Olkapäät', duration: '', icon: 'dumbbell' },
  { name: 'Ylätaljaveto', category: 'Selkä', duration: '', icon: 'dumbbell' },
]

export default movements