import React, { useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import { useTaskForm } from '../hooks/useTaskForm'
import { STRINGS } from '../constants/strings'
import { Task } from '../types/Task'
import { InputField, RadioGroup } from '../components'
import {
  FormContainer,
  SaveButton,
  ButtonText,
} from '../components/styles/TaskFormStyles'

type RouteParams = {
  task?: Task
}

export default function TaskForm() {
  const navigation = useNavigation()
  const route = useRoute()
  const { task } = (route.params as RouteParams) || {}
  
  const { form, onSubmit, handleStatusChange, isSubmitting, errors, isEditing } = useTaskForm({
    task,
    onSuccess: () => navigation.goBack()
  })
  
  const currentStatus = form.watch('status')
  
  // Refs para os inputs e scroll
  const scrollViewRef = useRef<ScrollView>(null)
  const titleInputRef = useRef<TextInput>(null)
  const responsibleInputRef = useRef<TextInput>(null)

  const handleInputFocus = () => {
    // Simple scroll to bottom when input is focused
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 300)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <FormContainer>
            <InputField 
              ref={titleInputRef}
              placeholder={STRINGS.FORM.TITLE_PLACEHOLDER}
              value={form.watch('title')}
              onChangeText={(text) => form.setValue('title', text)}
              returnKeyType="next"
              onSubmitEditing={() => responsibleInputRef.current?.focus()}
              onFocus={handleInputFocus}
              error={errors.title?.message}
            />

            <RadioGroup<'pending' | 'completed'>
              options={[
                { label: STRINGS.STATUS.PENDING_LABEL, value: STRINGS.STATUS.PENDING },
                { label: STRINGS.STATUS.COMPLETED_LABEL, value: STRINGS.STATUS.COMPLETED }
              ]}
              selectedValue={currentStatus}
              onValueChange={handleStatusChange}
            />

            <InputField 
              ref={responsibleInputRef}
              placeholder={STRINGS.FORM.RESPONSIBLE_PLACEHOLDER}
              value={form.watch('responsible')}
              onChangeText={(text) => form.setValue('responsible', text)}
              returnKeyType="done"
              onSubmitEditing={onSubmit}
              onFocus={handleInputFocus}
              error={errors.responsible?.message}
            />

            <SaveButton onPress={onSubmit} disabled={isSubmitting}>
              <ButtonText>
                {isSubmitting ? STRINGS.MESSAGES.LOADING : (isEditing ? STRINGS.FORM.UPDATE_BUTTON : STRINGS.FORM.SAVE_BUTTON)}
              </ButtonText>
            </SaveButton>
          </FormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}