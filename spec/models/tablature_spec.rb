require "rails_helper"

sample1 = %Q(
e|-----------------|----------------|----------------|----------------|
B|-------1---------|------3---------|------1---------|------3---------|
G|---0-------0-----|--0-------0-----|--0-------0-----|--0-------0-----|
D|-----2-------2---|----0-------0---|----2-------2---|----0-------0---|
A|-3-------3-------|2-------2-------|0-------0-------|2-------2-------|
E|-----------------|----------------|----------------|----------------|
)

sample2 = %Q(
e|-------3-------|-------------|-------0-----|-0-----0-----|
B|---0-------0---|-1-----1-----|-3-----------|---1---------|
G|---------------|---0---------|---0---------|-----0-------|
D|---------------|-----2-----2-|-----0-----0-|-----2-----2-|
A|-----2-------2-|-0-------0---|-2-------2---|-0-------0---|
E|-3-------3-----|-------------|-------------|-------------|
)

describe Tablature do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user) }

  let(:landslide_verse) { Tablature.new( content: sample1, user: user1 ) }
  let(:landslide_chorus) { Tablature.new( content: sample2, user: user2 ) }
  let(:tab_initialized_without_arguments) { Tablature.new }

  describe ".new" do
    it "should return a Tablature object" do
      expect(landslide_verse).to be_a(Tablature)
    end

    it "should not raise an error when initialized without any arguments" do
      expect{tab_initialized_without_arguments }.to_not raise_error
    end
  end

  describe "#content" do
    it "should return the content" do
      expect(landslide_verse.content).to eq(sample1)
    end

    it "should return '' for a tablature initialized without arguments" do
      expect(tab_initialized_without_arguments.content).to eq("")
    end
  end

  describe "#user" do
    it "should return the associated user" do
      expect(landslide_verse.user).to eq(user1)
    end

    it "should return nil for a tablature initialized without arguments" do
      expect(tab_initialized_without_arguments.user).to eq(nil)
    end
  end

  describe ".all" do
    it "should return an array of Tablature objects from the database" do
      first_tab_data = [
        sample1,
        user1.id
      ]

      last_tab_data = [
        sample2,
        user2.id
      ]

      Tablature.create(content: first_tab_data.first, user_id: first_tab_data.last)
      Tablature.create(content: last_tab_data.first, user_id: last_tab_data.last)

      tabs = Tablature.all

      first_tab = tabs.first
      first_tab_attributes = [
        first_tab.content,
        first_tab.user_id,
      ]
      last_tab = tabs.last
      last_tab_attributes = [
        last_tab.content,
        last_tab.user_id
      ]

      expect(tabs.length).to eq(2)
      expect(first_tab).to be_a(Tablature)
      expect(last_tab).to be_a(Tablature)
      expect(first_tab_attributes).to eq(first_tab_data)
      expect(last_tab_attributes).to eq(last_tab_data)
    end
  end

  describe "#errors" do
    it "should return an empty array for a newly initialized object" do
      expect(landslide_verse.errors.messages).to eq({})
    end
  end

  describe "#valid?" do
    context "for a valid object" do
      it "should return true" do
        expect(landslide_verse.valid?).to eq(true)
      end

      it "should not add any error messages" do
        landslide_verse.valid?
        expect(landslide_verse.errors.messages).to eq({})
      end
    end

    context "for an invalid object" do
      let(:tab_with_blank_attributes) do
        Tablature.new({ content: "", user: nil })
      end

      let(:blank_content_message) {"Content can't be blank"}
      let(:blank_user_message) {"User can't be blank"}
      let(:missing_user_message) {"User must exist"}
      let(:all_error_messages) {[missing_user_message,blank_user_message,blank_content_message]}

      it "should return false" do
        expect(tab_with_blank_attributes.valid?).to eq(false)
      end

      it "should add an error message if any of the attributes are blank" do
        tab_with_blank_attributes.valid?
        expect(tab_with_blank_attributes.errors.full_messages).to eq(all_error_messages)
      end

      #
      # it "should be able to add multiple error messages" do
      #   cereal_with_invalid_attributes.valid?
      #   expect(cereal_with_invalid_attributes.errors).to include(
      #     missing_fields_message,
      #     description_too_short_message
      #   )
      # end
    end
  end

  describe "#save" do
    context "valid object" do
      it "should return true" do
        expect(landslide_verse.save).to eq(true)
      end

      it "should add the attributes to the database" do
        landslide_verse.save

        tab_attributes = [
          landslide_verse.content,
          landslide_verse.user_id
        ]

        tabs_data = nil

        tabs_data = Tablature.all
        tab_data = tabs_data.last

        expect(tab_attributes[0]).to eq(tab_data["content"])
        expect(tab_attributes[1]).to eq(tab_data["user_id"])
      end
    end

    context "invalid object" do
      let(:tab_with_blank_attributes) do
        Tablature.new({ content: "", user: nil })
      end

      it "should return false" do
        expect(tab_with_blank_attributes.save).to eq(false)
      end

      it "should not add the attributes to the database" do
        tab_with_blank_attributes.save

        tabs_data = nil

        tabs_data = Tablature.all
        expect(tabs_data.count).to eq(0)
      end
    end
  end
end
