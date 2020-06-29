class PlayerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :wins 
end
