Rails.application.routes.draw do
  resources :players
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  mount_ember_app :frontend, to: "/"
end
