import { Comment } from './comment.model'

export class SetComments {
  static type = '[CommentStateModel] SetComments'
  constructor(public comments: Comment[]) {}
}

export class SetComment {
  static type = '[CommentStateModel] SetComment'
  constructor(public comment: Comment) {}
}

export class SetText {
  static type = '[CommentStateModel] SetText'
  constructor(public text: string) {}
}

export class SetTypeFilter {
  static type = '[CommentStateModel] SetTypeFilter'
  constructor(public type: string) {}
}

export class ResetTypeComments {
  static type = '[CommentStateModel] ResetTypeComments'
  constructor(public type: string) {}
}

