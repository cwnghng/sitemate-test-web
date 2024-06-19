import { useForm } from 'react-hook-form'
import { Issue } from '../entities/issue-entity'
import api from '../api'
import { useQueryClient } from '@tanstack/react-query'

function useUpdateIssueForm(issue: Issue) {
  const queryClient = useQueryClient()

  const form = useForm<Issue>({
    defaultValues: {
      ...issue,
    },
  })

  const submit = form.handleSubmit(async (data) => {
    try {
      const response = await api.issue.updateIssue(data)

      queryClient.invalidateQueries({
        queryKey: ['issue-list'],
      })

      return response.issue
    } catch (err) {
      console.error(err)
      throw err
    }
  })

  const remove = form.handleSubmit(async () => {
    try {
      await api.issue.deleteIssue({
        id: issue.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['issue-list'],
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  })

  return {
    ...form,
    submit,
    remove,
  }
}

export default useUpdateIssueForm
