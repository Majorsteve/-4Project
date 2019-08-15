# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Comment.create(content: "I like stuff a bunch.", agree: true, topic_id: 8, user_id: 1)


# create_table "comments", force: :cascade do |t|
#   t.string "content"
#   t.boolean "agree"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.bigint "topic_id"
#   t.bigint "user_id"
#   t.index ["topic_id"], name: "index_comments_on_topic_id"
#   t.index ["user_id"], name: "index_comments_on_user_id"
# end