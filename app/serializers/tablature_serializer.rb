class TablatureSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :user_id, :user_name

  def user_name
    object.user.username
  end
end
