import { useQuery } from '@tanstack/react-query'
import api from '../api'

function useIssueListQuery() {
  const query = useQuery({
    queryKey: ['issue-list'],
    queryFn: async () => {
      const response = await api.issue.getIssueList()

      return response.issues
    },
  })

  return {
    ...query,
  }
}

export default useIssueListQuery
