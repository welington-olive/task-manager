import React from 'react'
import { View } from 'react-native'
import { RadioButton } from './RadioButton'

export interface RadioOption {
  label: string
  value: string
}

export interface RadioGroupProps<T extends string = string> {
  options: RadioOption[]
  selectedValue: T
  onValueChange: (value: T) => void
}

export const RadioGroup = <T extends string = string>({
  options,
  selectedValue,
  onValueChange,
}: RadioGroupProps<T>) => {
  return (
    <View>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          isSelected={selectedValue === option.value}
          label={option.label}
          value={option.value}
          onPress={() => onValueChange(option.value as T)}
        />
      ))}
    </View>
  )
} 