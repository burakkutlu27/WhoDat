import React from 'react'
import { Clapperboard, Dices, Landmark, Palette, Star, Trophy } from 'lucide-react'
import type { FamousPersonCategory } from '@/lib/game/famousPeopleData'

interface CategoryIconProps {
  category?: FamousPersonCategory | string | null
  className?: string
}

export function CategoryIcon({ category = 'all', className = 'h-4 w-4' }: CategoryIconProps) {
  switch (category) {
    case 'all':
      return <Dices className={className} />
    case 'unluler':
      return <Star className={className} />
    case 'tarihi_kisiler':
      return <Landmark className={className} />
    case 'cizgi_karakterler':
      return <Palette className={className} />
    case 'sporcular':
      return <Trophy className={className} />
    case 'dizi_film_karakterleri':
      return <Clapperboard className={className} />
    default:
      return <Dices className={className} />
  }
}
