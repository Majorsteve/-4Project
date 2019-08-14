class TopicsController < ApplicationController
  before_action :authorize_request, only: [:create]


  def index
    @topics = Topic.all
    render json: @topics, include: :user, status: :ok
  end
  
  def show
    @user = User.find(params[:user_id])
    @topic = Topic.find(params[:id])
    render json: @topic, include: :user, status: :ok
  end
  
  def create
    @topic = Topic.new(topic_params)
    @topic.user = @current_user;
    if @topic.save
      render json: @topic, status: :created
    else
      render json: { errors: @topic.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    @topic = Topic.find(params[:id])
    if @topic.update(topic_params)
      render json: @json, status: :ok
    else
      render json: { errors: @topic.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @topic = Topic.find(params[:id])
    @topic.destroy
    head 204
  end
  
  private

  def topic_params
    params.require(:topic).permit(:title, :user_id)
  end
end