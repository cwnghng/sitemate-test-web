import axios from 'axios'
import { Issue } from '../entities/issue-entity'

export async function getIssue(data: { id: string }) {
  try {
    const response = await axios.get<{ issue: Issue }>(
      'http://localhost:8080/api/issue/get-issue',
      {
        params: {
          id: data.id,
        },
      },
    )

    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function getIssueList() {
  try {
    const response = await axios.get<{ issues: Issue[] }>(
      'http://localhost:8080/api/issue/get-issue-list',
    )

    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function createIssue(issue: Issue) {
  try {
    const response = await axios.post<{ issue: Issue }>(
      'http://localhost:8080/api/issue/create-issue',
      issue,
    )

    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function updateIssue(
  issue: Omit<Partial<Issue>, 'id'> & { id: string },
) {
  try {
    const response = await axios.put<{ issue: Issue }>(
      'http://localhost:8080/api/issue/update-issue',
      issue,
    )

    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function deleteIssue(data: { id: string }) {
  try {
    const response = await axios.delete<{ issue: Issue }>(
      'http://localhost:8080/api/issue/delete-issue',
      {
        params: {
          id: data.id,
        },
      },
    )

    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}
