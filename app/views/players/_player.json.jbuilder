json.extract! player, :id, :name, :wins, :created_at, :updated_at
json.url player_url(player, format: :json)
