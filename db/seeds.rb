sample = %Q(
e|-----------------|----------------|----------------|----------------|
B|-------1---------|------3---------|------1---------|------3---------|
G|---0-------0-----|--0-------0-----|--0-------0-----|--0-------0-----|
D|-----2-------2---|----0-------0---|----2-------2---|----0-------0---|
A|-3-------3-------|2-------2-------|0-------0-------|2-------2-------|
E|-----------------|----------------|----------------|----------------|
)

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
basic_user = User.create(username: 'basic', email: 'basic@bort.com', password: 'bortman', password_confirmation: 'bortman')
landslide_verse = Tablature.create(title: "Landslide verse", content: sample, user: basic_user)
