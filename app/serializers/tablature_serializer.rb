class TablatureSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :user_id, :user_name

  def user_name
    object.user.user_name
  end
end
