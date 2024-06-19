import { useForm } from 'react-hook-form'
import { Issue } from '../entities/issue-entity'
import api from '../api'
import { useQueryClient } from '@tanstack/react-query'

function useCreateIssueForm() {
  const queryClient = useQueryClient()

  const form = useForm<Issue>()

  const submit = form.handleSubmit(async (data) => {
    try {
      const response = await api.issue.createIssue(data)

      queryClient.invalidateQueries({
        queryKey: ['issue-list'],
      })

      return response.issue
    } catch (err) {
      console.error(err)
      throw err
    }
  })

  return {
    ...form,
    submit,
  }
}

export default useCreateIssueForm
