class RemoveTopicIdFromTopics < ActiveRecord::Migration[5.2]
  def change
    remove_reference :topics, :topic, foreign_key: true
  end
end
