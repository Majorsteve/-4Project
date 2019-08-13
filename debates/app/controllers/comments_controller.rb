class CommentsController < ApplicationController
  def index
    @topic = Topic.find(params[:topic_id])
    @comments = Comment.where(topic_id: @topic.id)
    render json: @comments, include: {topic: {include: :user}}, status: :ok
  end

  def show
    @topic = topic.find(params[:user_id])
    @comment = comment.find(params[:id])
    render json: @comments, include: {topic: {include: :user}}, status: :ok
  end

  def create
    def create
      @comment = Comment.new(comment_params)
      if @comment.save
        render json: @comment, status: :created
      else
        render json: { errors: @comment.errors }, status: :unprocessable_entity
      end
    end

    def update
      @comment = Comment.find(params[:id])
      if @comment.update(comment_params)
        render json: @comment, status: :ok
      else
        render json: { errors: @comment.errors }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @comment = Comment.find(params[:id])
      @comment.destroy
      head 204
    end
  
    private
  
    def comment_params
      params.require(:Comment).permit(:content, :agree)
    end
  end
end