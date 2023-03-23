# frozen_string_literal: true

class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.bigint :sender_id, null: false
      t.bigint :receiver_id, null: false
      t.boolean :status, default: false, null: false
      t.timestamps
    end
    add_index :friends, :sender_id
    add_index :friends, :receiver_id
  end
end
