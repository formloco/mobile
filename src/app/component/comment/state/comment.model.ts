export interface CommentStateModel {
  comments?: Comment[]
  type?: string
  label?: string
}

export interface Comment {
  label?: string
  text?: string
  field?: string
  type?: string
}
