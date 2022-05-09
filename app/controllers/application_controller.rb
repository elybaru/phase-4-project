class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  before_action :authorize

  private

    def render_unprocessable_entity_response(invalid)
      render json: { errors: invalid.record.errors }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { error: "Item not found" }, status: :not_found
    end  

    def authorize
      return render json: { errors: ["Not authorized"] }, status: :unauthorized unless current_user
    end

    # def current_user
    #   @current_user = User.find_by(id: session[:user_id])
    # end

    def current_user
      @current_user ||= session[:user_id] && User.find(session[:user_id])
    end

end
