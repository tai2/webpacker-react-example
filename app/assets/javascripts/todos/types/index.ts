export interface Todo {
  id: number
  content: string
  done: boolean
  dueDate: string
  createdAt: string
  updatedAt: string
}

export class IdentifiableError extends Error {
  constructor(readonly targetId: number, message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = 'IdentifiableError'
  }
}
