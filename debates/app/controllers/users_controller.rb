class UsersController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :authorize_request, only: [:verify]
  
  def index
    @users = User.all
    render json: @users, include: :topics, status: :ok
  end

  def show
    @user = User.find(params[:id])
    render json: @user, include: :topics, status: :ok
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    @users = User.find(params[:id])
    if @user.update(user_params)
      render json: @json, status: :ok
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head 204
  end

  def verify
    @user ={
      id: @current_user[:id],
      username: @current_user[:username],
      email: @current_user[:email]
    }
    render json: @user
  end
  
  private
  def set_user
    @user = User.find(params[:id])
  end
  
  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end