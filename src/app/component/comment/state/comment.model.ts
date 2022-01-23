export interface CommentStateModel {
  comments?: Comment[]
  type?: string
}

export interface Comment {
  label?: string
  text?: string
  field?: string
  type?: string
}