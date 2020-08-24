class SerializablePlayer < JSONAPI::Serializable::Resource
  type 'players'

  attributes :name, :wins
end