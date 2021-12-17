class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end

  def create
    post = Post.create(content: params[:content]) #新たに投稿されたメモの内容を変数postに代入
    render json:{ post: post } #変数postの値をpostというキーでJavaScriptに送信
  end
end
