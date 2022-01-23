import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as CommentActions from './comment.actions'
import { CommentStateModel, Comment } from './comment.model'

@Injectable()
@State<CommentStateModel>({
  name: 'comment',
  defaults: {
    comments: []
  }
})

export class CommentState {

  @Selector()
  static comments(state: CommentStateModel): Comment[] {
    return state.comments
  }

  @Selector()
  static text(state: Comment): string {
    return state.text
  }

  @Selector()
  static commentsByType(state: CommentStateModel) { 
    return state.comments.filter(c => c.type === state.type)
  }

  @Selector()
  static commentType(state: CommentStateModel) { 
    return state.type
  }

  @Action(CommentActions.SetComments)
  onSetComment(ctx: StateContext<CommentStateModel>, { comments }: CommentActions.SetComments) {
    ctx.patchState({
      comments: comments
    });
  }


  @Action(CommentActions.SetText)
  onSetText(ctx: StateContext<Comment>, { text }: CommentActions.SetText) {
    ctx.patchState({
      text: text
    });
  }

  @Action(CommentActions.SetTypeFilter)
  onSetTypeFilter(ctx: StateContext<CommentStateModel>, { type }: CommentActions.SetTypeFilter) {
    ctx.patchState({
      type: type
    });
  }

  @Action(CommentActions.ResetTypeComments)
  onResetTypeComments(ctx: StateContext<CommentStateModel>, { type }: CommentActions.ResetTypeComments) {
    
    // comments.indexOf(c => c.type === type);
    ctx.patchState({
      type: type
    });
  }

}

