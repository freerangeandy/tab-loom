class CreateTablatures < ActiveRecord::Migration[5.2]
  def up
    create_table :tablatures do |t|
      t.text :content, null: false, default: ""
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end

  def down
    drop_table :tablatures
  end
end
