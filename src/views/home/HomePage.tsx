import React, { useCallback, useState } from 'react'
import useCreateIssueForm from '../../hooks/useCreateIssueForm'
import useIssueListQuery from '../../hooks/useIssueListQuery'
import useUpdateIssueForm from '../../hooks/useUpdateIssueForm'
import { Issue } from '../../entities/issue-entity'
import api from '../../api'

function CreateIssueForm() {
  const { register, submit } = useCreateIssueForm()

  return (
    <form className="flex flex-col space-y-2" onSubmit={submit}>
      <label>ID</label>
      <input className="border" {...register('id')} />
      <label>Title</label>
      <input className="border" {...register('title')} />
      <label>Description</label>
      <input className="border" {...register('description')} />
      <button className="border bg-slate-300 py-2 px-4 font-bold" type="submit">
        Submit
      </button>
    </form>
  )
}

function UpdateIssueForm({
  issue,
  onSubmit,
}: {
  issue: Issue
  onSubmit: () => void
}) {
  const { register, submit, remove } = useUpdateIssueForm(issue)

  const handleSubmit = () => {
    submit()
    onSubmit()
  }

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this issue?')) return
    remove()
    onSubmit()
  }

  return (
    <form
      className="flex flex-col space-y-2 border-2 border-slate-300 p-4"
      onSubmit={handleSubmit}
    >
      <label>ID</label>
      <input className="border" {...register('id')} disabled />
      <label>Title</label>
      <input className="border" {...register('title')} />
      <label>Description</label>
      <input className="border" {...register('description')} />
      <button className="border bg-slate-300 py-2 px-4 font-bold" type="submit">
        Submit
      </button>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="border bg-red-500 py-2 px-4 text-white font-bold"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="border py-2 px-4 font-bold" onClick={onSubmit}>
          Close
        </button>
      </div>
    </form>
  )
}

function IssueListItem({ issue }: { issue: Issue }) {
  const [toUpdate, setToUpdate] = useState<boolean>(false)

  if (toUpdate) {
    return <UpdateIssueForm issue={issue} onSubmit={() => setToUpdate(false)} />
  }

  return (
    <div
      className="border-2 border-slate-300 p-4 cursor-pointer"
      onClick={() => setToUpdate(!toUpdate)}
    >
      <p>ID: {issue.id}</p>
      <h2>TITLE: {issue.title}</h2>
      <p>DESCRIPTION: {issue.description}</p>
    </div>
  )
}

function IssueList() {
  const { data } = useIssueListQuery()

  return (
    <div className="space-y-2">
      {data &&
        data.map((issue) => <IssueListItem key={issue.id} issue={issue} />)}
    </div>
  )
}

function IssueSearch() {
  const [id, setId] = useState<string>('')
  const [issue, setIssue] = useState<Issue | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const handleSearch = useCallback(
    async (e: React.FormEvent, id: string) => {
      e.preventDefault()
      if (isFetching) return
      try {
        setIsFetching(true)
        const response = await api.issue.getIssue({ id })
        setIssue(response.issue)
      } catch (err) {
        console.error(err)
      } finally {
        setIsFetching(false)
      }
    },
    [isFetching],
  )

  return (
    <div className="space-y-4">
      <form
        className="flex flex-col space-y-2"
        onSubmit={(e) => handleSearch(e, id)}
      >
        <label>ID</label>
        <input
          className="border"
          value={id}
          onChange={(e) => {
            setId(e.target.value)
          }}
        />
        <button
          className="border bg-slate-300 py-2 px-4 font-bold"
          type="submit"
        >
          Search
        </button>
      </form>
      {issue && <IssueListItem issue={issue} />}
    </div>
  )
}

function HomePage() {
  return (
    <div className="container mx-auto shadow-lg p-4 space-y-4">
      <div className="space-y-4 border-2 border-black p-4">
        <h1 className="font-bold text-3xl">Create Issue</h1>
        <CreateIssueForm />
      </div>
      <div className="space-y-4 border-2 border-black p-4">
        <h1 className="font-bold text-3xl">Find Issue By Id</h1>
        <IssueSearch />
      </div>
      <div className="space-y-4 border-2 border-black p-4">
        <h1 className="font-bold text-3xl">Issue List</h1>
        <IssueList />
      </div>
    </div>
  )
}

export default HomePage
