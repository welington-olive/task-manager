import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { CustomModal } from './CustomModal'
import { RadioGroup } from './RadioGroup'
import { InputField } from './InputField'
import { STRINGS } from '../constants/strings'

export interface FilterOptions {
  status: string
  responsible: string
}

interface FilterModalProps {
  visible: boolean
  onClose: () => void
  onApplyFilters: (filters: FilterOptions) => void
  currentFilters: FilterOptions
}

export function FilterModal({ 
  visible, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}: FilterModalProps) {
  const [statusFilter, setStatusFilter] = useState(currentFilters.status)
  const [responsibleFilter, setResponsibleFilter] = useState(currentFilters.responsible)

  const handleApply = () => {
    onApplyFilters({
      status: statusFilter,
      responsible: responsibleFilter
    })
    onClose()
  }

  const handleClear = () => {
    setStatusFilter('all')
    setResponsibleFilter('')
  }

  const handleClose = () => {
    // Reset to current filters when closing without applying
    setStatusFilter(currentFilters.status)
    setResponsibleFilter(currentFilters.responsible)
    onClose()
  }

  return (
    <CustomModal visible={visible} onClose={handleClose}>
      <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 24, textAlign: 'center' }}>
          {STRINGS.FILTERS.FILTERS_TITLE}
        </Text>
        
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 }}>
            {STRINGS.FILTERS.STATUS_TITLE}
          </Text>
          <RadioGroup
            options={[
              { label: STRINGS.FILTERS.ALL, value: 'all' },
              { label: STRINGS.FILTERS.PENDING, value: 'pending' },
              { label: STRINGS.FILTERS.COMPLETED, value: 'completed' }
            ]}
            selectedValue={statusFilter}
            onValueChange={setStatusFilter}
          />
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 }}>
            {STRINGS.FILTERS.RESPONSIBLE_TITLE}
          </Text>
          <InputField
            placeholder={STRINGS.FILTERS.SEARCH_PLACEHOLDER}
            value={responsibleFilter}
            onChangeText={setResponsibleFilter}
            clearButtonMode="while-editing"
            returnKeyType="search"
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
          <TouchableOpacity 
            style={{ flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginRight: 8 }}
            onPress={handleClear}
          >
            <Text style={{ color: '#1E293B', fontSize: 16, fontWeight: 'bold' }}>
              {STRINGS.FILTERS.CLEAR_BUTTON}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ flex: 1, backgroundColor: '#00465c', padding: 16, borderRadius: 12, alignItems: 'center', marginLeft: 8 }}
            onPress={handleApply}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              {STRINGS.FILTERS.APPLY_BUTTON}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  )
} 